<template>
	<div class="vcp-files-picker">
		<vc-upload 
			v-show="!disabled && (currentValue.length < max || max === 0)"
			v-bind="upload"
			mode="files"
			@file-start="handleFileStart"
			@file-progress="handleFileProgress"
			@file-success="handleFileSuccess"
			@file-error="handleFileError"
			@error="$emit('error', arguments[0])"
		>
			<slot name="trigger" />
		</vc-upload>
		<template v-if="!$scopedSlots.default">
			<div 
				v-for="(item, index) in currentValue" 
				:key="index"
				:class="item.retcode == 0 && item.percent == 100 || item.error_time ? '__error' : ''"
				class="__item"
			>
				<span :title="item.title">{{ item.title }}</span>
				<template v-if="item.error_time || item.retcode == 0">
					<div>上传失败</div>
				</template>
				<template v-else>
					<div v-if="item.percent != 100" style="flex: 1; display: flex; align-items: center">
						<div class="__pcontainer">
							<div :style="{width: item.percent + '%'}" class="__progress" />
						</div>
						<span style="margin-left: 10px">{{ item.percent }}%</span>
					</div>
					<div v-else-if="!item.url">文件上传完毕，请等待...</div>
					<div v-else>上传成功</div>
				</template>
				<span 
					v-if="item.url || (item.retcode == 0 && item.percent == 100) || item.error_time" 
					class="__close" 
					@click="handleDel(item)"
				>
					x
				</span>
			</div>
		</template>
		<slot :files="currentValue" />
	</div>
</template>

<script>
import emitter from '../extends/mixins/emitter'; // 表单验证
import Upload from '../upload/index';

export default {
	name: "vc-files-picker",
	components: {
		'vc-upload': Upload
	},
	mixins: [emitter],
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		value: {
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
		accept: String
	},
	data() {
		return {
			currentValue: this.value,
		};
	},
	computed: {
		
	},
	watch: {
		value(val) {
			this.setCurrentValue(val);
		}
	},
	methods: {
		setCurrentValue(value) {
			if (value === this.currentValue) return;
			
			this.currentValue = value;
			this.dispatch('FormItem', 'on-form-change', value);
		},
		handleFileStart(res) {
			console.log('ddd');
			res.title = res.name;
			this.currentValue = [...this.currentValue, res];
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
			console.log('file-success');
			let { max, currentValue, getParse } = this;
			// let value = [...currentValue, getParse ? getParse(res) : res.data];
			let value;
			value = currentValue.map((item) => {
				if (item.uid === file.uid) {
					return {
						...item,
						...res.data
					};
				}
				return item;
			});
			this.$emit('change', value);
			this.setCurrentValue(value);
		},
		handleFileError(res, file) {
			console.log(res, 'error');
			let { max, currentValue, getParse } = this;
			// let value = [...currentValue, getParse ? getParse(res) : res.data];
			let value;
			value = currentValue.map((item) => {
				if (item.uid === file.uid) {
					return {
						...item,
						...res,
						error_time: new Date().getTime()
					};
				}
				return item;
			});
			this.$emit('change', value);
			this.$emit('error', res);
			this.setCurrentValue(value);
		},
		handleFileComplete(res) {
			console.log(res, 'compelte');
		},
		handleDel(item) {
			let { currentValue, max, getParse } = this;
			if (max !== 0 && currentValue.length > max) {
				this.$emit('error', {
					status: 0,
					msg: '超出上传限制'
				});
				return;
			}
			let value = currentValue.filter(_item => {
				return _item.uid !== item.uid || _item.error_time != item.error_time;
			});
			this.$emit('change', value);
			this.setCurrentValue(value);
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
		border: 1px solid #e61212 !important;
		color: #e61212 !important
	}
	.__item {
		position: relative;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		margin-right: 8px;
		margin-bottom: 8px;
		border: 1px solid #d9d9d9;
		padding: 8px;
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
			right: 10px;
			cursor: pointer;
		}
		.__pcontainer {
			flex: 1;
			background-color: #9c9c9c;
			height: 4px;
			border-radius: 2px;
			overflow: hidden;
			margin-left: 20px;
			.__progress {
				display: block;
				margin: 0;
				background-color: #0085ff;
				height: 4px;
				border-radius: 2px;
			}
		}
	}
}
</style>