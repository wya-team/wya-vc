<template>
	<div class="vc-files-picker">
		<vc-upload 
			v-show="!disabled && (currentValue.length < max || max === 0)"
			v-bind="currentUploadOpts"
			mode="files"
			@file-start="handleFileStart"
			@file-progress="handleFileProgress"
			@file-success="handleFileSuccess"
			@file-error="handleFileError"
			@error="handleError"
			@complete="handleFileComplete"
		>
			<slot name="upload" />
		</vc-upload>
		<slot :it="currentValue" name="file">
			<div 
				v-for="(item, index) in currentValue" 
				:key="index"
				:class="{ 'is-error': item.retcode == 0 && item.percent == 100 || item.errorFlag }"
				class="vc-files-picker__item"
			>
				<vc-icon type="link" class="vc-files-picker__download" />
				<div :title="item.title" class="vc-files-picker__title">
					{{ item.title }}
				</div>
				<div style="flex: 1; display: flex; align-items: center">
					<div class="vc-files-picker__pcontainer">
						<div :style="{width: item.percent + '%'}" class="vc-files-picker__progress" />
					</div>
				</div>
				<span 
					v-if="item[urlKey] || (item.retcode == 0 && item.percent == 100) || item.errorFlag" 
					class="vc-files-picker__close" 
					@click="handleDel(item, index)"
				>
					<vc-icon type="close" />
				</span>
			</div>
		</slot>
	</div>
</template>

<script>
import Vue from 'vue';
import { Device } from '@wya/utils';
import Extends from '../extends';
import Message from '../message/index';
import Toast from '../toast/index';
import Upload from '../upload/index';
import Icon from '../icon';

export default {
	name: "vc-files-picker",
	components: {
		'vc-upload': Upload,
		'vc-icon': Icon
	},
	mixins: [...Extends.mixins(['emitter'])],
	model: {
		prop: 'dataSource',
		event: 'change'
	},
	props: {
		dataSource: {
			type: Array,
			default() {
				return [];
			},
		},
		max: {
			type: Number,
			default: 0
		},
		disabled: {
			type: Boolean,
			default: false
		},
		uploadOpts: {
			type: Object,
			default() {
				return {};
			}
		},
		accept: String,
		urlKey: { // 后台返回的文件地址 key值
			type: String,
			default: 'url'
		},
		formatter: Function
	},
	data() {
		return {
			currentValue: this.dataSource,
			currentUploadOpts: { 
				...this.uploadOpts,
				multiple: this.max > 1,
				max: this.max
			}
		};
	},
	watch: {
		dataSource: {
			immediate: true,
			handler(newVal) {
				let arr = this.currentValue.length === 0 ? newVal : this.currentValue;
				this.currentValue = arr.map((it) => {
					for (let i = 0; i < newVal.length; i++) {
						if (typeof newVal[i].uid !== 'undefined' 
						&& typeof it.uid !== 'undefined'
						&& newVal[i].uid === it.uid) {
							return newVal[i];
						}
					}
					return it;
				});
				if (this.uploadOpts.multiple) {
					let max = this.max || 1;
					let canSelectNum = max - this.currentValue.length;
					if (this.currentUploadOpts.max != canSelectNum) {
						this.currentUploadOpts.max = canSelectNum;
					}
				}
			}
		}
	},
	mounted() {
		if (Vue.config.devtools) {
			console.warn('[@wya/vc]: files-picker -> upload-picker，api需要变更');
		}
	},
	methods: {
		handleFileStart(res) {
			res.title = res.name;
			this.currentValue = [...this.currentValue, res];
			// 开始上传时，最大值 -1
			if (this.currentUploadOpts.multiple) {
				let max = this.currentUploadOpts.max - 1;
				this.currentUploadOpts.max = max >= 0 ? max : 0;
			}
		},
		handleFileProgress(e, file) {
			if (parseInt(e.percent, 10) <= 100) {
				this.currentValue = this.currentValue.map((item) => {
					if (file.uid === item.uid) {
						return {
							...item,
							percent: e.percent
						};
					}
					return item;
				});
			}
		},
		handleFileSuccess(res, file) {
			let dataSource;
			this.currentValue = this.currentValue.map((item) => {
				if (item.uid === file.uid) {
					let result = { ...item, ...res.data };
					return this.getPrase ? this.getPrase(result) : result;
				}
				return item;
			});
			// 将已经上传成功的文件传递给外部
			dataSource = this.currentValue.filter((it) => !it.errorFlag && it[this.urlKey]);
			this.$emit('change', dataSource);
			this.dispatch('vc-form-item', 'form-change', dataSource);
		},
		handleFileError(res, file) {
			// 内部保存上传失败的文件，不传递给外层
			this.currentValue = this.currentValue.map((item) => {
				if (item.uid === file.uid) {
					return {
						...item,
						...res,
						errorFlag: new Date().getTime()
					};
				}
				return item;
			});
			this.handleError(res);
		},
		handleError(err) {
			console.log(err);
			let { $listeners: { error } } = this;
			!error && (Device.touch ? Toast.info(err.msg, 2) : Message.error(err.msg, 2));
			this.$emit('error', err);
		},
		handleFileComplete(res) {
			this.$emit('complete', res);
		},
		handleDel(item, index) {
			// 删除时，最大值加1
			if (this.currentUploadOpts.multiple) {
				this.currentUploadOpts.max = this.currentUploadOpts.max + 1;
			}
			if (item.errorFlag) {
				this.currentValue = this.currentValue.filter(_item => _item.uid != item.uid);
				return;
			}
			this.currentValue.splice(index, 1);
			let dataSource = this.currentValue.filter(it => !it.errorFlag);
			this.$emit('change', dataSource);
			this.dispatch('vc-form-item', 'form-change', dataSource);
		}
	}
};
</script>

<style lang="scss">
@import '../style/vars.scss';

@include block(vc-files-picker) {
	box-sizing: border-box;
	margin: 20px;
	@include element(item) {
		position: relative;
		align-items: center;
		box-sizing: border-box;
		margin-top: 16px;
		padding-left: 20px;
		@include element(title) {
			font-size: 12px;
			color: #676767;
		}
		@include element(download) {
			position: absolute;
			left: 0px;
			top: 10px;
		}
		@include when(error) {
			@include element(title) {
				color: #E74854 !important;
			}
			@include element(progress) {
				background-color: #E74854 !important;
			}
		}
		span:first-child {
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
			min-width: 100px;
			max-width: 100px;
		}
		@include element(close) {
			position: absolute;
			top: 4px;
			right: 0px;
			cursor: pointer;
		}
		@include element(pcontainer) {
			flex: 1;
			background-color: #e8e8e8;
			height: 4px;
			border-radius: 2px;
			overflow: hidden;
			margin-top: 6px;
		}
		@include element(progress) {
			display: block;
			margin: 0;
			background-color: #5495F6;
			height: 4px;
			border-radius: 2px;
		}
	}
}
</style>