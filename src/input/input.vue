<template>
	<div class="vc-input">
		<template v-if="type !== 'textarea'">
			<vc-icon 
				v-if="clearable && value" 
				type="error" 
				class="__clear"
				@click="handleClear"
			/>
			<input
				ref="input"
				:id="id"
				:name="name"
				:type="type"
				:placeholder="placeholder"
				:value="value"
				:disabled="disabled"
				:class="inputClass"
				:readonly="readonly"
				:maxlength="maxlength"
				:autofocus="autofocus"
				:spellcheck="spellcheck"
				class="__input"
				@input="handleInput"
				@change="handleChange"
				@focus="handleFocus"
				@blur="handleBlur"
				@keyup.enter="handleEnter"
			>
			<vc-icon 
				v-if="clearable && value" 
				type="search" 
				class="__clear"
			/>
			<span class="suffix-icon"><slot name="suffix"/></span>
		</template>
		<textarea 
			v-else 
			ref="textarea"
			:id="id"
			:wrap="wrap"
			:name="name"
			:placeholder="placeholder"
			:disabled="disabled"
			:class="inputClass"
			:rows="rows"
			:readonly="readonly" 
			:maxlength="maxlength"
			:autofocus="autofocus"
			:autosize="autosize"
			:spellcheck="spellcheck"
			:style="textareaStyle"
			class="__input"
			@input="handleInput"
			@change="handleChange"
			@focus="handleFocus"
			@blur="handleBlur"
			@keyup.enter="handleEnter"
		/>
	</div>
</template>
<script>
import Icon from '../icon';
import calcTextareaHeight from './calcTextareaHeight';

export default {
	name: "vc-input",
	components: {
		'vc-icon': Icon
	},
	props: {
		id: String,
		name: String,
		wrap: {
			validator: (val) => ['hard', 'soft'].includes(val),
			default: 'soft'
		},
		type: {
			type: String,
			default: 'text'
		},
		clearable: {
			type: Boolean,
			default: false
		},
		value: [String, Number],
		placeholder: String,
		disabled: {
			type: Boolean,
			default: false,
		},
		rows: {
			type: Number,
			default: 1
		},
		readonly: {
			type: Boolean,
			default: false
		},
		maxlength: Number,
		autofocus: {
			type: Boolean,
			default: false
		},
		spellcheck: {
			type: Boolean,
			default: false
		},
		autosize: {
			type: [Boolean, Object],
			default: false
		}
	},
	data() {
		return {
			textareaStyle: {},
		};
	},
	computed: {
		inputClass() {
			return {
				'__disable': this.disabled,
				'__suffix': this.$slots.suffix !== undefined
			};
		}
	},
	watch: {
		value(e) {
			this.resizeTextarea();
		}
	},
	methods: {
		handleInput(e) {
			let value = e.target.value;
			this.$emit('input', value);
			this.$emit('change', e);
		},
		handleClear() {
			this.$emit('input', '');
		},
		handleChange(e) {
		},
		handleFocus(e) {
			this.$emit('focus', e);
		},
		handleBlur(e) {
			this.$emit('blur', e);
		},
		handleEnter(e) {
			this.$emit('enter', e);
		},
		resizeTextarea() {
			const autosize = this.autosize;
			if (!autosize || this.type !== 'textarea') {
				return false;
			}
			const minRows = autosize.minRows;
			const maxRows = autosize.maxRows;
			this.textareaStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows);
		}
	}
};
</script>
<style lang="less" scoped>
.vc-input{
	position: relative;
	&:hover{
		.__clear{
			display: block;
		}
	}
	.__input{
		position: relative;
		display: inline-block;
		width: 100%;
		min-height: 32px;
		line-height: 1.5;
		padding: 4px 7px;
		font-size: 12px;
		border-radius: 4px;
		border: 1px solid #dcdee2;
		color: #515a6e;
		background-color: #fff;
		background-image: none;
		position: relative;
		cursor: text;
		transition: border .2s;
		&.__disable{
			background-color: #f3f3f3;
			opacity: 1;
			cursor: not-allowed;
			color: #ccc;
		}
		&.__suffix{
			padding-right: 30px; 
		}
	}
	input::placeholder, 
	textarea::placeholder{
		color: #dcdee2;
	}
	.suffix-icon{
		position: absolute;
		right: 10px;
		z-index: 3;
		top: 50%;
		transform: translateY(-50%);
	}
	.__clear{
		position: absolute;
		right: 10px;
		z-index: 3;
		top: 50%;
		transform: translateY(-50%);
		display: none;
	}
}
</style>