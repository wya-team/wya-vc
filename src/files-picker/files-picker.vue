<template>
	<div class="vcp-files-picker">
		<vc-upload 
			v-show="!disabled && (data.length < max || max === 0)"
			v-bind="uploadOpts"
			mode="files"
			@file-start="handleFileStart"
			@file-progress="handleFileProgress"
			@file-success="handleFileSuccess"
			@file-error="handleFileError"
			@error="$emit('error', arguments[0])"
			@complete="handleFileComplete"
		>
			<slot name="trigger" />
		</vc-upload>
		<template v-if="!$scopedSlots.default">
			<div 
				v-for="(item, index) in data" 
				:key="index"
				:class="item.retcode == 0 && item.percent == 100 || item.errorFlag ? '__error' : ''"
				class="__item"
			>
				<vc-icon type="error" class="__download" />
				<div :title="item.title" class="__title">{{ item.title }}</div>
				<!-- <template v-if="item.errorFlag || item.retcode == 0">
					<div>上传失败</div>
				</template> -->
				<!-- <template v-else> -->
				<template>
					<!-- <div v-if="item.percent != 100 && !item[urlKey]" style="flex: 1; display: flex; align-items: center"> -->
					<div style="flex: 1; display: flex; align-items: center">
						<div class="__pcontainer">
							<div :style="{width: item.percent + '%'}" class="__progress" />
						</div>
						<!-- <span style="margin-left: 10px">{{ item.percent }}%</span> -->
					</div>
					<!-- <div v-else-if="!item[urlKey]">文件上传完毕，请等待...</div>
					<div v-else>上传成功</div> -->
				</template>
				<span 
					v-if="item[urlKey] || (item.retcode == 0 && item.percent == 100) || item.errorFlag" 
					class="__close" 
					@click="handleDel(item, index)"
				>
					<vc-icon type="close" />
				</span>
			</div>
		</template>
		<slot :files="data" />
	</div>
</template>

<script>
import emitter from '../extends/mixins/emitter'; // 表单验证
import Upload from '../upload/index';
import Icon from '../icon';

export default {
	name: "vc-files-picker",
	components: {
		'vc-upload': Upload,
		'vc-icon': Icon
	},
	mixins: [emitter],
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
		upload: {
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
		format: Function
	},
	data() {
		return {
			data: this.dataSource,
			uploadOpts: { ...this.upload }
		};
	},
	watch: {
		dataSource: {
			immediate: true,
			handler(newVal) {
				let arr = this.data.length === 0 ? newVal : this.data;
				this.data = arr.map((it) => {
					for (let i = 0; i < newVal.length; i++) {
						if (typeof newVal[i].uid !== 'undefined' 
						&& typeof it.uid !== 'undefined'
						&& newVal[i].uid === it.uid) {
							return newVal[i];
						}
					}
					return it;
				});
				if (this.upload.multiple) {
					let max = this.upload.max || 1;
					let canSelectNum = max - this.data.length;
					if (this.uploadOpts.max != canSelectNum) {
						this.uploadOpts.max = canSelectNum;
					}
				}
			}
		}
	},
	methods: {
		handleFileStart(res) {
			res.title = res.name;
			this.data = [...this.data, res];
			// 开始上传时，最大值 -1
			if (this.uploadOpts.multiple) {
				let max = this.uploadOpts.max - 1;
				this.uploadOpts.max = max >= 0 ? max : 0;
			}
		},
		handleFileProgress(e, file) {
			if (parseInt(e.percent, 10) <= 100) {
				this.data = this.data.map((item) => {
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
			this.data = this.data.map((item) => {
				if (item.uid === file.uid) {
					let result = { ...item, ...res.data };
					return this.getPrase ? this.getPrase(result) : result;
				}
				return item;
			});
			// 将已经上传成功的文件传递给外部
			dataSource = this.data.filter((it) => !it.errorFlag && it[this.urlKey]);
			this.$emit('change', dataSource);
			this.dispatch('vc-form-item', 'form-change', dataSource);
		},
		handleFileError(res, file) {
			// 内部保存上传失败的文件，不传递给外层
			this.data = this.data.map((item) => {
				if (item.uid === file.uid) {
					return {
						...item,
						...res,
						errorFlag: new Date().getTime()
					};
				}
				return item;
			});
			this.$emit('error', res);
		},
		handleFileComplete(res) {
			this.$emit('complete', res);
		},
		handleDel(item, index) {
			// 删除时，最大值加1
			if (this.uploadOpts.multiple) {
				this.uploadOpts.max = this.uploadOpts.max + 1;
			}
			if (item.errorFlag) {
				this.data = this.data.filter(_item => _item.uid != item.uid);
				return;
			}
			this.data.splice(index, 1);
			let dataSource = this.data.filter(it => !it.errorFlag);
			this.$emit('change', dataSource);
			this.dispatch('vc-form-item', 'form-change', dataSource);
		}
	}
};
</script>

<style lang="scss" scoped>
.vcp-files-picker {
	// display: flex;
	box-sizing: border-box;
	// flex-wrap: wrap;
	margin: 20px;
	.__error {
		// border: 1px solid #e61212 !important;
		.__title {
			color: #E74854 !important;
		}
		.__progress {
			background-color: #E74854 !important;
		}
	}
	.__item {
		position: relative;
		// display: flex;
		align-items: center;
		box-sizing: border-box;
		// margin-right: 8px;
		// margin-bottom: 8px;
		// border: 1px solid #d9d9d9;
		margin-top: 16px;
		padding-left: 20px;
		.__title {
			font-size: 12px;
			color: #676767;
		}
		.__download {
			position: absolute;
			left: 2px;
			top: 0px;
		}
		span:first-child {
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
			min-width: 100px;
			max-width: 100px;
		}
		.__close {
			position: absolute;
			top: 4px;
			right: 0px;
			cursor: pointer;
		}
		.__pcontainer {
			flex: 1;
			background-color: #e8e8e8;
			height: 4px;
			border-radius: 2px;
			overflow: hidden;
			margin-top: 6px;
			// margin-left: 20px;
			.__progress {
				display: block;
				margin: 0;
				background-color: #5495F6;
				height: 4px;
				border-radius: 2px;
			}
		}
	}
}
</style>