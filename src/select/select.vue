<template>
	<div 
		class="vc-select"
		@mouseenter="isHover = true"
		@mouseleave="isHover = false"
	>
		<vc-popover 
			v-model="visible" 
			:arrow="false" 
			:auto-width="autoWidth"
			:trigger="trigger"
			placement="bottom-left"
			transfer-class-name="is-padding-none"
			@ready="handleReady"
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
				@click="visible = true"
			>
				<template v-if="multiple && (currentValue && currentValue.length > 0)" #content>
					<div class="vc-select__tags">
						<vc-tag 
							v-for="(item, index) in currentValue" 
							:key="item" 
							closable 
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
					<div v-if="search" class="vc-select__search">
						<vc-input-search v-model="searchValue" @input="handleSearch" />
					</div>
					<div class="vc-select__options">
						<slot />
					</div>
					<!-- hack for slot, 异步数据弹层已打开时未刷新 -->
					<span v-show="false" v-text="currentLabel" />
				</div>
			</template>
		</vc-popover>
	</div>
</template>

<script>
import { pick, cloneDeep, isEqualWith } from 'lodash';
import { getSelectedData, getUid } from '../utils/index';
import emitter from '../extends/mixins/emitter'; // 表单验证
import Input from '../input/index';
import Popover from '../popover/index';
import Tag from '../tag/index';
import Icon from '../icon/index';
import InputMixin from '../input/input-mixin';

const getLabel = (data, v) => {
	let { label = '' } = data.find(i => i.value == v) || {};

	return label;
};

export default {
	name: 'vc-select',
	components: {
		'vc-input': Input,
		'vc-input-search': Input.Search,
		'vc-icon': Icon,
		'vc-popover': Popover,
		'vc-tag': Tag,
	},
	mixins: [emitter],
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		...pick(InputMixin.props, [
			'elementId', 
			'readonly', 
			'disabled', 
			'value', 
			'size', 
			'placeholder',
			'clearable'
		]),
		trigger: {
			type: String,
			default: 'click'
		},
		extra: {
			type: String | Array
		},
		max: {
			type: Number,
			default: 1,
			validator: v => v >= 1,
		},
		search: {
			type: Boolean,
			default: false
		},
		loadData: {
			type: Function,
		},
		autoWidth: {
			type: Boolean,
			default: true
		},
	},
	data() {
		return {
			isHover: false,
			visible: false,
			loading: false,
			searchValue: '',
			searchRegex: new RegExp(),
			currentValue: this.max > 1 ? [] : '',
			currentLabel: this.max > 1 ? [] : '',
			rebuildData: []
		};
	},
	computed: {
		icon() {
			return this.visible ? 'up' : 'down';
		},
		showClear() {
			let value = !this.multiple ? this.currentValue : this.currentValue.length > 0;
			let basic = this.clearable && !this.disabled && this.isHover;
			return value && basic;
		},
		multiple() {
			return this.max > 1;
		}
	},
	watch: {
		value: {
			immediate: true,
			handler(v) {
				if (isEqualWith(v, this.currentValue)) {
					return;
				}
				this.currentValue = v;
				/**
				 * 强制更新
				 * 外部连续刷新时，需要用户自行处理updateLabel
				 */
				if (
					(!this.currentLabel || (this.currentLabel && !this.currentLabel.length))
				) {
					this.update(true);
				}
			}
		},
		currentValue(v, old) {
			this.$emit('change', v, this.currentLabel);

			// form表单
			this.dispatch('vc-form-item', 'form-change', v);
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
		/**
		 * 初始化完成后格式化数据
		 */
		handleReady() {

		},
		handleClear(e) {
			if (!this.showClear) return;
			e.stopPropagation();

			this.$emit('clear');

			this.currentValue = this.multiple ? [] : '';
			this.currentLabel = this.multiple ? [] : '';
		},

		handleClose(v) {
			this.remove(v);
		},

		handleSearch(v) {
			this.searchValue = v;
			this.searchRegex = new RegExp(v, 'i');

			let remote = this.loadData && this.loadData(v, this);
			
			if (remote && remote.then) {
				this.loading = true;
				remote.then({

				}).finally(() => {
					this.loading = false;
				});
			}
		},

		add(v, label) {
			if (!this.multiple) {
				this.currentValue = v;
				this.currentLabel = label;
				this.visible = false;
			} else {
				this.currentValue.push(v); 
				this.currentLabel.push(label);
			}
		},
		remove(v, label) {
			let index = this.currentValue.findIndex(i => i == v);

			this.currentValue.splice(index, 1);
			this.currentLabel.splice(index, 1);
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
						vnodes.push(...vnode.componentOptions.children);
					} else {
						vnodes.push(vnode);
					}
				});

				let data = [];
				vnodes.forEach((vnode) => {
					let { value, label, disabled } = vnode.componentOptions.propsData;
					label = String(label || vnode.componentOptions.children[0].text || value);
					data.push({
						disabled,
						value,
						label: label.trim()
					});
				});
				if (isEqualWith(this.dataSource, data)) return;

				this.currentLabel = this.multiple 
					? this.currentValue.map(getLabel.bind(null, data))
					: getLabel(data, this.currentValue);

				this.hasInit = true;
				this.dataSource = data;
			});
		},
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
	cursor: text;
	@include element(input) {
		.vc-input__append {
			z-index: 0;
		}
	}
	@include element(append) {
		cursor: pointer;
		color: #808695;
		padding: 0 10px;
		background: white !important;
		position: relative;
		text-align: center;
		line-height: 26px;
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
		padding: 10px;
	}
	@include element(options) {
		max-height: 220px;
		overflow: auto;
	}
}

</style>
