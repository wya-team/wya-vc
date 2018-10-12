<template>
	<div class="vcp-imgs-picker">
		<div 
			v-for="(item) in currentValue" 
			:key="item"
			class="__item __normal"
		>
			<div
				:style="{backgroundImage: `url(${item})`}"
				class="__img"
			>
				<div class="__mask g-relative">
					<span @click="handleDel(item)">x</span>
				</div>
			</div>
		</div>
		<vc-upload 
			v-if="!disabled && (currentValue.length < max || max === 0)"
			v-bind="upload"
			class="__upload __normal"
			@file-success="handleFileSuccess"
			@file-error="handleFileError"
		/>
	</div>
</template>

<script>
import Emitter from 'iview/src/mixins/emitter'; // 表单验证
import Upload from '../upload/index';

export default {
	name: "vc-tpl",
	components: {
		'vc-upload': Upload
	},
	mixins: [Emitter],
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
		// getParse: {
		// 	type: Function,
		// 	default() {
				
		// 	}
		// }
	},
	data() {
		return {
			currentValue: this.value
		};
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
		handleFileSuccess(res) {
			let { max, currentValue, getParse } = this;
			let value = [...currentValue, getParse ? getParse(res) : res.data.url];
			this.$emit('change', value);
			this.setCurrentValue(value);
		},
		handleFileError(res) {
			console.log(res);
			this.$emit('error', res);
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
			let value = currentValue.filter(_item => _item != item);
			this.$emit('change', value);
			this.setCurrentValue(value);
		}
	}
};
</script>

<style lang="scss" scoped>
.vcp-imgs-picker {
	display: flex;
	box-sizing: border-box;
	flex-wrap: wrap;
	.__normal {
		width: 104px;
		height: 104px;
		border-radius: 4px;
		background-color: #fafafa;
		.__img {
			width: 88px;
			height: 88px;
		}
	}
	.__img {
		background-size: cover;
		position: relative;
	}
	.__item {
		box-sizing: border-box;
		margin-right: 8px;
		margin-bottom: 8px;
		cursor: pointer;
		border: 1px solid #d9d9d9;
		padding: 8px;
	}
	.__item:hover .__mask {
		transition: opacity 0.5s;
		opacity: 1;
	}
	.__mask {
		opacity: 0;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.4);
		color: #fff;
		display: flex;
		justify-content: space-around;
		align-items: center;
		box-sizing: border-box;
		& > span {
			cursor: pointer;
			font-size: 18px;
		}
	}
	.__upload {
		display: flex;
		box-sizing: border-box;
		justify-content: center;
		align-items: center;
		position: relative;
		border: 1px dashed #d9d9d9;
		background-color: #fafafa;
		margin-right: 8px;
		margin-bottom: 8px;
		&:hover {
			border-color: #1890ff;
		}
		&:after,
		&:before {
			content: " ";
			position: absolute;
			top: 50%;
			left: 50%;
			-webkit-transform: translate(-50%, -50%);
			transform: translate(-50%, -50%);
			background-color: #999;
			border-radius: 2px;
		}

		&:before {
			width: 2px;
			height: 28px;
		}

		&:after {
			width: 28px;
			height: 2px;
		}
	}
}
</style>