<template>
	<span
		:class="classes"
		tabindex="0"
		class="vc-switch"
		@click="handdleToggle"
		@keydown.space="handdleToggle"
	>
		<input :name="name" :value="currentValue" type="hidden">
		<span class="vc-switch__content">
			<slot v-if="currentValue === trueValue" name="open" />
			<slot v-if="currentValue === falseValue" name="close" />
		</span>
		<span class="vc-switch__inner"/>
		<vc-spin 
			v-if="loading" 
			:size="14"
			foreground="#fff"
			class="vc-switch__loading"
		/>
	</span>
</template>
<script>
import Emitter from '../extends/mixins/emitter';
import Spin from '../spin/index';

export default {
	name: 'vc-switch',
	components: {
		'vc-spin': Spin
	},
	mixins: [Emitter],
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		value: {
			type: [String, Number, Boolean],
			default: false
		},
		trueValue: {
			type: [String, Number, Boolean],
			default: true
		},
		falseValue: {
			type: [String, Number, Boolean],
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		name: {
			type: String
		}
	},
	data() {
		return {
			currentValue: '',
			loading: false
		};
	},
	computed: {
		classes() {
			return {
				'is-loading': this.loading,
				'is-checked': this.checked
			};
		},
		checked() {
			return this.currentValue === this.trueValue;
		}
	},
	watch: {
		value: {
			immediate: true,
			handler(v) {
				this.currentValue = v;
			}
		},
		currentValue(v) {
			this.$emit('change', v);
			this.dispatch('vc-form-item', 'form-change', v);
		}
	},
	methods: {
		handdleToggle(e, callback) {
			e.preventDefault();

			if (this.disabled || this.loading) {
				return false;
			}

			let { $listeners: { click } } = this;
			let fn = click && click(e, callback);

			if (fn && fn.then) {
				this.loading = true;
				fn.then((res) => {
					return res;
				}).catch((res) => {
					return Promise.reject(res);
				}).finally(() => {
					this.loading = false;
				});
			}

			const checked = this.currentValue === this.trueValue ? this.falseValue : this.trueValue;
			this.currentValue = checked;
			
		}
	}
};
</script>
<style lang="scss">
@import '../style/index.scss';

@include block(vc-switch) {
	display: inline-block;
	width: 44px;
	height: 22px;
	line-height: 20px;
	border-radius: 22px;
	vertical-align: middle;
	border: 1px solid #ccc;
	background-color: #ccc;
	position: relative;
	cursor: pointer;
	user-select: none;
	transition: all .2s ease-in-out;
	@include element(content) {
		color: #fff;
		font-size: 12px;
		position: absolute;
		left: 23px;
	}
	@include element(inner) {
		content: '';
		width: 18px;
		height: 18px;
		border-radius: 18px;
		background-color: #fff;
		position: absolute;
		left: 1px;
		top: 1px;
		cursor: pointer;
		transition: left .2s ease-in-out,width .2s ease-in-out;
	}
	@include element(loading) {
		width: 14px;
		height: 14px;
		position: absolute;
		left: 3px;
		top: 3px;
		z-index: 1;
		opacity: .4;
	}
	@include when(checked) {
		border-color: #2d8cf0;
		background-color: #2d8cf0;
		@include element(content) {
			left: 7px;
		}
		@include element(inner) {
			left: 23px;
		}
		@include element(loading) {
			left: 25px;
		}
	}

}
</style>