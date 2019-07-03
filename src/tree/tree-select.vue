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
		class="vc-tree-select"
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
			class="vc-tree-select__input"
		>
			<template v-if="(currentValue && currentValue.length > 0)" #content>
				<div :class="classes" class="vc-tree-select__tags">
					<vc-tag 
						v-for="(item, index) in currentValue" 
						:key="item" 
						:closable="!disabled"
						@close="handleClose(item, index)"
					>
						{{ currentLabel[index] || extra[index] || '' }}
					</vc-tag>
				</div>
			</template>
			<template #append>
				<!-- down, up, clear -->
				<div class="vc-tree-select__append">
					<vc-icon
						:type="showClear ? 'clear' : icon"
						:class="{ 'is-arrow': !showClear }"
						class="vc-tree-select__icon"
						@click="handleClear"
					/>
				</div>
			</template>
		</vc-input>
		<template #content>
			<div class="vc-tree-select__content">
				<div v-if="search" class="vc-tree-select__search">
					<vc-input-search 
						v-model="searchValue" 
						:placeholder="searchPlaceholder"
						@input="handleSearch" 
					/>
				</div>
				<div v-if="loading" class="vc-tree-select__loading">
					<vc-spin :size="16" />
				</div>
				<div class="vc-tree-select__options">
					<!-- 暂时不支持lazy -->
					<vc-tree
						v-model="currentValue" 
						:data-source="dataSource"
						:check-strictly="checkStrictly"
						:expanded-keys="currentValue"
						:allow-dispatch="false"
						show-checkbox
						@change="handleChange"
					/>
				</div>
				<!-- hack for slot, 异步数据弹层已打开时未刷新 -->
				<span v-show="false" v-text="currentValue" />
			</div>
		</template>
	</vc-popover>
</template>

<script>
import { pick, cloneDeep, debounce, isEqualWith } from 'lodash';
import { getSelectedData, getUid, flattenData, getLabel } from '../utils/index';
import { VcError } from '../vc/index';
import Extends from '../extends';
import Input from '../input/index';
import Popover from '../popover/index';
import Spin from '../spin/index';
import Tag from '../tag/index';
import Icon from '../icon/index';
import InputMixin from '../input/input-mixin';
import Tree from './tree';

export default {
	name: 'vc-tree-select',
	components: {
		'vc-input': Input,
		'vc-input-search': Input.Search,
		'vc-icon': Icon,
		'vc-popover': Popover,
		'vc-tag': Tag,
		'vc-spin': Spin,
		'vc-tree': Tree,
	},
	mixins: [...Extends.mixins(['emitter'])],
	inheritAttrs: false,
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		...pick(Tree.props, [
			'checkStrictly',
			'dataSource'
		]),
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
			type: Array,
			default: () => ([])
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
		}
	},
	data() {
		return {
			isHover: false,
			isActive: false,
			loading: false,
			searchValue: '',
			searchRegex: new RegExp(),
			currentValue: [],
			currentLabel: [],
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
		classes() {
			return {
				'is-disabled': this.disabled
			};
		},
		dataMap() {
			return flattenData(this.dataSource, { parent: true, cascader: false });
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

				this.resetLabel();
			}
		},
		dataSource(v, old) {
			this.resetLabel();
		}
	},
	created() {
		this.treeSelectId = getUid('tree-select');
	},
	beforeUpdate() {
		
	},
	methods: {
		resetLabel() {
			/**
			 * 耗时操作
			 */
			this.currentLabel = this.currentValue.map(v => getLabel(this.dataMap, v));
		},

		handleClear(e) {
			if (!this.showClear) return;
			e.stopPropagation();
			this.$emit('clear');
			this.currentValue = [];
			this.currentLabel = [];
			this.isActive = false;
			this.sync();
		},

		handleClose(v, index) {
			this.currentValue.splice(index, 1);
			this.currentLabel.splice(index, 1);

			this.sync();
		},

		handleSearch(v) {
			this.searchValue = v;
			this.searchRegex = new RegExp(v, 'i');
			this.loadData && this._loadData();
		},

		handleChange(v, data) {
			this.currentValue = v;
			this.currentLabel = data.checkedNodes.map(i => i.label);

			this.sync();
		},
		/**
		 * v-model 同步, 外部的数据改变时不会触发
		 */
		sync() {
			this.$emit('change', this.currentValue);

			// form表单
			this.dispatch('vc-form-item', 'form-change', this.currentValue);
		},
		/**
		 * 默认防抖
		 */
		_loadData: debounce(function () {
			let remote = this.loadData(this.searchValue, this);
			
			if (remote && remote.then) {
				this.loading = true;
				remote.then(() => {

				}).finally(() => {
					this.loading = false;
				});
			} else {
				throw new VcError('tree-select', 'loadData 返回值需要Promise');
			}
		}, 250, { leading: false })
	},
};
</script>

<style lang='scss'>
@import '../style/index.scss';

$block: vc-tree-select;

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
