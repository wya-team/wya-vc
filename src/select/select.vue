<template>
	<vc-popover 
		v-bind="$attrs"
		v-model="isActive" 
		:arrow="arrow" 
		:trigger="trigger"
		:tag="tag"
		:placement="placement"
		:auto-width="autoWidth"
		:disabled="disabled"
		:portal-class-name="['is-padding-none', portalClassName]"
		:class="classes"
		class="vc-select"
		animation="y"
		@mouseenter.native="isHover = true"
		@mouseleave.native="isHover = false"
		@ready="$emit('ready')"
		@close="$emit('close')"
		@visible-change="$emit('visible-change', isActive)"
	>
		<vc-input
			ref="input"
			:element-id="elementId"
			:readonly="true"
			:disabled="disabled"
			:value="currentLabel"
			:placeholder="placeholder || '请选择'"
			:allow-dispatch="false"
			class="vc-select__input"
		>
			<template v-if="multiple && (currentValue && currentValue.length > 0)" #content>
				<div :class="classes" class="vc-select__tags">
					<vc-tag 
						v-for="(item, index) in currentValue" 
						:key="item" 
						:closable="!disabled"
						@close="handleClose(item)"
					>
						{{ currentLabel[index] || '' }}
					</vc-tag>
				</div>
			</template>
			<template #append>
				<!-- down, up, clear -->
				<div class="vc-select__append">
					<vc-icon
						:type="showClear ? 'clear' : icon"
						:class="{ 'is-arrow': !showClear }"
						class="vc-select__icon"
						@click="handleClear"
					/>
				</div>
			</template>
		</vc-input>
		<template #content>
			<div class="vc-select__content">
				<div v-if="searchable" class="vc-select__search">
					<vc-input-search 
						v-model="searchValue" 
						:placeholder="searchPlaceholder"
						@input="handleSearch" 
					/>
				</div>
				<div v-if="isLoading" class="vc-select__loading">
					<vc-spin :size="16" />
				</div>
				<div class="vc-select__options">
					<slot />
				</div>
				<!-- hack for slot, 异步数据弹层已打开时未刷新 -->
				<span v-show="false" v-text="currentLabel" />
			</div>
		</template>
	</vc-popover>
</template>

<script>
import { pick, cloneDeep, debounce, isEqualWith } from 'lodash';
import { getSelectedData, getUid, getLabel } from '../utils/index';
import { VcError } from '../vc/index';
import Extends from '../extends';
import Input from '../input/index';
import Popover from '../popover/index';
import Spin from '../spin/index';
import Tag from '../tag/index';
import Icon from '../icon/index';
import InputMixin from '../input/input-mixin';

export default {
	name: 'vc-select',
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
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		...pick(Popover.props, [
			'portalClassName'
		]),
		...pick(InputMixin.props, [
			'elementId', 
			'readonly', 
			'disabled', 
			'value', 
			'size', 
			'placeholder',
			'clearable'
		]),
		searchPlaceholder: {
			type: String,
			default: ''
		},
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
		autoWidth: {
			type: Boolean,
			default: true
		},
		extra: {
			type: String | Array
		},
		max: {
			type: Number,
			default: 1,
			validator: v => v >= 1,
		},
		searchable: {
			type: Boolean,
			default: false
		},
		loadData: {
			type: Function,
		}
	},
	data() {
		return {
			isHover: false,
			isActive: false,
			isLoading: false,
			searchValue: '',
			searchRegex: new RegExp(),
			currentValue: this.max > 1 ? [] : '',
			currentLabel: this.max > 1 ? [] : '',
			rebuildData: []
		};
	},
	computed: {
		icon() {
			return this.isActive ? 'up' : 'down';
		},
		showClear() {
			let value = !this.multiple ? this.currentValue : this.currentValue.length > 0;
			let basic = this.clearable && !this.disabled && this.isHover;
			return value && basic;
		},
		multiple() {
			return this.max > 1;
		},
		classes() {
			return {
				'is-disabled': this.disabled
			};
		},
	},
	watch: {
		value: {
			immediate: true,
			handler(v) {
				if (isEqualWith(v, this.currentValue)) {
					return;
				}
				this.currentValue = v;

				this.update(true);
			}
		},
		currentValue(v, old) {
			// ..
		}
	},
	created() {
		this.selectId = getUid('select');

		this.hasInit = !(this.currentValue || this.currentValue.length > 0);

		this.dataSource = []; 
		this.update();
	},
	beforeUpdate() {
		/**
		 * 容易造成内存溢出
		 */
		this.update();
	},
	methods: {
		handleClear(e) {
			if (!this.showClear) return;
			e.stopPropagation();

			this.$emit('clear');

			this.currentValue = this.multiple ? [] : '';
			this.currentLabel = this.multiple ? [] : '';
			this.isActive = false;

			this.sync();
		},

		handleClose(v) {
			this.remove(v);
		},

		handleSearch(v) {
			this.searchValue = v;
			this.searchRegex = new RegExp(v, 'i');
			this.loadData && this._loadData();
		},

		add(v, label) {
			if (!this.multiple) {
				this.currentValue = v;
				this.currentLabel = label;
				this.isActive = false;
			} else {
				this.currentValue.push(v); 
				this.currentLabel.push(label);
			}

			this.sync();
		},

		remove(v, label) {
			let index = this.currentValue.findIndex(i => i == v);

			this.currentValue.splice(index, 1);
			this.currentLabel.splice(index, 1);

			this.sync();
		},

		close() {
			this.isActive = false;
		},

		update(force = false) {
			if (force === false && (this.hasInit || this.extra)) return;
			if (!this.$slots.default) return;
			/**
			 * 可能存在耗时操作
			 */
			this.$nextTick(() => {
				let vnodes = [];
				this.$slots.default.forEach((vnode) => {
					if (!vnode.tag) return;
					if (vnode && /option-group$/.test(vnode.tag)) {
						let child = vnode.componentOptions.children.filter(i => i.tag);
						vnodes.push(...child);
					} else {
						vnodes.push(vnode);
					}
				});

				let data = [];
				vnodes.forEach((vnode) => {
					let { value, label = '', disabled } = vnode.componentOptions.propsData;

					label = String(
						(vnode.componentOptions.children && vnode.componentOptions.children[0].text) 
						|| label 
						|| value
					);
					data.push({
						disabled,
						value,
						label: label.trim()
					});
				});
				if (!force && isEqualWith(this.dataSource, data)) return;

				this.currentLabel = this.multiple 
					? this.currentValue.map(getLabel.bind(null, data))
					: getLabel(data, this.currentValue);

				this.hasInit = true;
				this.dataSource = data;
			});
		},

		/**
		 * v-model 同步, 外部的数据改变时不会触发
		 */
		sync() {
			this.$emit('change', this.currentValue, this.currentLabel);

			// form表单
			this.dispatch('vc-form-item', 'form-change', this.currentValue);
		},
		/**
		 * 默认防抖
		 */
		_loadData: debounce(function () {
			let remote = this.loadData(this.searchValue, this);
			
			if (remote && remote.then) {
				this.isLoading = true;
				remote.then(() => {

				}).finally(() => {
					this.isLoading = false;
				});
			} else {
				throw new VcError('select', 'loadData 返回值需要Promise');
			}
		}, 250, { leading: false })
	},
};
</script>

<style lang='scss'>
@import '../style/index.scss';

$block: vc-select;

@include block($block) {
	display: inline-block;
	position: relative;
	width: 100%;
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
		font-size: 12px;
		white-space: nowrap;
	}
	@include element(icon) {
		@include when(arrow) {
			transform: scale(0.8);
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
