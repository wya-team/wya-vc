<template>
	<vc-popover 
		v-model="isActive"
		v-bind="$attrs" 
		:arrow="arrow" 
		:trigger="trigger"
		:tag="tag"
		:placement="placement"
		:auto-width="false"
		:disabled="disabled"
		:portal-class-name="['is-padding-none', portalClassName]"
		:class="classes"
		class="vc-picker"
		animation="y"
		@mouseenter.native="isHover = true"
		@mouseleave.native="isHover = false"
		@ready="$emit('ready')"
		@close="handleClose"
		@visible-change="$emit('visible-change', isActive)"
	>
		<slot>
			<vc-input
				ref="input"
				:element-id="elementId"
				:readonly="true"
				:disabled="disabled"
				:value="visibleValue"
				:placeholder="placeholder || '请选择'"
				:allow-dispatch="false"
				class="vc-picker__input"
			>
				<template #append>
					<div :class="{'is-clear': showClear}" class="vc-picker__append">
						<vc-icon
							:type="showClear ? 'clear' : icon"
							@click="handleIconClick"
						/>
					</div>
				</template>
			</vc-input>
		</slot>
		<template #content>
			<!-- 要求value 需转成Date类型，panel内流通的都是Date, panel内的数据都是数组 -->
			<component 
				:is="panel"
				:value="currentValue"
				:type="type"
				:confirm="isConfirm"
				:start-date="startDate"
				:focused-date="focusedDate"
				:split-panels="splitPanels"
				:show-time="showTime"
				:format="format"
				:steps="steps"
				:multiple="multiple"
				v-bind="panelOptions" 
				@pick="handlePick"
				@clear="handleClear"
				@ok="handleOK"
			/>
		</template>
	</vc-popover>
</template>

<script>
import { pick, cloneDeep, debounce, isEqualWith } from 'lodash';
import { getUid, getLabel } from '../utils/index';
import { DEFAULT_FORMATS } from './constants';
import { TYPE_VALUE_RESOLVER_MAP, getDayCountOfMonth, isEmpty, value2Array } from './utils';
import { VcError } from '../vc/index';
import Extends from '../extends';
import Input from '../input/index';
import Popover from '../popover/index';
import Spin from '../spin/index';
import Tag from '../tag/index';
import Icon from '../icon/index';
import InputMixin from '../input/input-mixin';

export default {
	name: 'vc-picker',
	components: {
		'vc-input': Input,
		'vc-input-search': Input.Search,
		'vc-icon': Icon,
		'vc-popover': Popover,
		'vc-tag': Tag,
		'vc-spin': Spin,
	},
	mixins: [...Extends.mixins(['emitter'])],
	inheritAttrs: false,
	props: {
		...pick(Popover.props, [
			'portalClassName'
		]),
		...pick(InputMixin.props, [
			'elementId', 
			'disabled', 
			'size', 
			'placeholder'
		]),
		clearable: {
			type: Boolean,
			default: true
		},
		value: [Date, Array, String],
		multiple: Boolean,
		open: Boolean,
		trigger: {
			type: String,
			default: 'click'
		},
		tag: {
			type: String,
			default: 'div'
		},
		placement: {
			type: String,
			default: 'bottom-left'
		},
		arrow: {
			type: Boolean,
			default: false
		},
		confirm: {
			type: Boolean,
			default: false
		},
		format: String,
		separator: {
			type: String,
			default: ' - '
		},
		startDate: {
			type: Date
		},
		splitPanels: {
			type: Boolean,
			default: true
		},
		steps: {
			type: Array,
			default: () => ([])
		},
		// 选择即触发change
		changeOnSelect: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			isHover: false,
			isActive: this.open,
			currentValue: '',
			focusedDate: null
		};
	},
	computed: {
		showClear() {
			let value = !this.multiple ? !isEmpty(this.currentValue) : this.currentValue.length > 0;
			let basic = this.clearable && !this.disabled && this.isHover;
			return value && basic;
		},
		classes() {
			return {
				'is-disabled': this.disabled
			};
		},
		isConfirm() {
			return this.confirm || this.type === 'datetime' || this.type === 'datetimerange' || this.multiple;
		},
		// 展示的value
		visibleValue() {
			return this.formatDateText(this.currentValue);
		},
		showTime() {
			return ['datetime', 'datetimerange'].includes(this.type);
		},
		isRange() {
			return this.type.includes('range');
		},
		isQuarter() {
			return ['quarter'].includes(this.type);
		},
		isTime() {
			return ['time', 'timerange'].includes(this.type);
		},
	},
	watch: {
		value: {
			immediate: true,
			handler(val) {
				val = this.parseValue(val);
				this.focusedDate = val[0] || this.startDate || new Date();
				this.currentValue = value2Array(val);
			}
		},
		open: {
			immediate: true,
			handler(val) {
				this.isActive = val;
			}
		}
	},
	methods: {
		handlePick(value, prevDate) {
			// 在panel上点击时，同步focusedDate
			this.focusedDate = value[0] || prevDate || new Date();

			if (!this.isConfirm && !this.isTime || this.changeOnSelect) { 
				setTimeout(() => { this.isActive = false; }, 100); // 添加延迟，可以让使用者看到选中效果后再关闭弹层
			}
			
			this.currentValue = value;
			(!this.isConfirm || this.changeOnSelect) && this.sync('change', value);
		},
		handleIconClick(e) {
			if (!this.showClear) return;
			e.stopPropagation();
			this.handleClear();
		},
		handleClear() {
			const clear = () => {
				const date = this.isRange ? [] : '';
				this.isActive = false;
				this.currentValue = date;
				this.sync('change', date);
				this.$emit('clear', date);
			};
			const { 'before-clear': beforeClear } = this.$listeners; 
			this.executePromise(beforeClear, clear);
		},
		handleOK(value) {
			const ok = () => {
				this.isActive = false;
				this.sync(['change', 'ok'], value);
			};
			const { 'before-ok': beforeOk } = this.$listeners; 
			this.executePromise(beforeOk, ok, value);
		},
		executePromise(promiseFn, cb, param) {
			try {
				const promise = promiseFn && promiseFn(param);
				if (promise && promise.then()) {
					promise.then(() => {
						cb();
					}).catch(() => {
						return;
					});
				} else {
					cb();
				}
			} catch (error) {
				this.$emit('error', error);
			}
		},
		handleClose() {
			let val = this.parseValue(this.value);
			// 是否有传value值，如果没传currentValue不回滚
			let isSetValueProp = this.$options.propsData.hasOwnProperty('value'); /* eslint-disable-line */
			if (!isEqualWith(this.currentValue, val) && isSetValueProp) {
				this.currentValue = value2Array(val);
			}
			this.$emit('close');
		},
		formatDateText(value) {
			const format = DEFAULT_FORMATS[this.type];
			if (this.multiple) {
				const formatterText = TYPE_VALUE_RESOLVER_MAP.multiple.formatterText;
				return formatterText(value, this.format || format, this.separator);
			} else {
				const { formatter, formatterText } = (TYPE_VALUE_RESOLVER_MAP[this.type] || TYPE_VALUE_RESOLVER_MAP.default);
				let fn = formatterText || formatter;
				return fn(value, this.format || format, this.separator);
			}
		},
		formatDate(value) {
			const format = DEFAULT_FORMATS[this.type];
			if (this.multiple) {
				const formatter = TYPE_VALUE_RESOLVER_MAP.multiple.formatter;
				return formatter(value, this.format || format, this.separator);
			} else {
				const { formatter } = (TYPE_VALUE_RESOLVER_MAP[this.type] || TYPE_VALUE_RESOLVER_MAP.default);
				return formatter(value, this.format || format, this.separator);
			}
		},
		parserDate(value) {
			const format = DEFAULT_FORMATS[this.type];
			if (this.multiple) {
				const parser = TYPE_VALUE_RESOLVER_MAP.multiple.parser;
				return parser(value, this.format || format, this.separator);
			} else {
				const { parser } = (TYPE_VALUE_RESOLVER_MAP[this.type] || TYPE_VALUE_RESOLVER_MAP.default);
				return parser(value, this.format || format, this.separator);
			}
		},
		parseValue(val) {
			if (isEmpty(val)) {
				return this.isRange ? [null, null] : [];
			}
			return this.parserDate(val);
		},
		sync(eventName, value) {
			const date = this.isRange || this.isQuarter ? value : value[0];
			const dateString = this.formatDate(value);

			this.$emit('input', date);
			eventName = typeof eventName === 'string' ? [eventName] : eventName;
			eventName.forEach(name => {
				this.$emit(name, dateString, this.rest);
			});
			this.dispatch('vc-form-item', 'form-change', date);
		},
		rest(date) {
			this.currentValue = date;
		}
	}
};
</script>

<style lang='scss'>
@import '../style/vars.scss';

$block: vc-picker;

@include block($block) {
	display: inline-block;
	position: relative;
	width: auto;
	line-height: 1;
	@include element(input) {
		cursor: pointer;
		input {
			cursor: pointer;
		}
		.vc-input__append {
			z-index: 0;
		}
	}
	@include element(append) {
		color: #808695;
		padding: 0 10px 0 2px;
		position: relative;
		text-align: center;
		line-height: 28px;
		font-size: 16px;
		font-weight: 400;
		white-space: nowrap;
		cursor: default;
		@include when(clear) {
			font-size: 14px;
			cursor: pointer;
		}
		.vc-icon {
			vertical-align: unset;
		}

	}
	@include element(tags) {
		padding-left: 4px;
		.vc-tag {
			margin: 3px 4px 3px 0;
		}
	}

	@include element(search) {
		padding: 12px 8px;
	}
	@include element(options) {
		max-height: 220px;
		overflow: auto;
	}
	@include element(loading) {
		text-align: center;
		padding-bottom: 8px;
	}
}

</style>
