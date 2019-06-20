<template>
	<vc-popover 
		v-bind="$attrs"
		v-model="visible" 
		:arrow="arrow" 
		:trigger="trigger"
		:tag="tag"
		:placement="placement"
		:disabled="disabled"
		:portal-class-name="['is-padding-none', portalClassName]"
		animation="y"
		class="vc-cascader"
		@mouseenter.native="isHover = true"
		@mouseleave.native="isHover = false"
		@ready="handleReady"
		@close="handleClose"
		@destory="handleDestory"
		@visible-change="$emit('visible-change', visible)"
	>
		<vc-input
			ref="input"
			:element-id="elementId"
			:readonly="true"
			:disabled="disabled"
			:value="formatLabel"
			:placeholder="placeholder || '请选择'"
			:allow-dispatch="false"
			class="vc-cascader__input"
		>
			<template #append>
				<!-- down, up, clear -->
				<div class="vc-cascader__append">
					<vc-icon
						:type="showClear ? 'clear' : icon"
						:class="{ 'is-arrow': !showClear }"
						class="vc-cascader__icon"
						@click="handleClear"
					/>
				</div>
			</template>
		</vc-input>
		<template #content>
			<div class="vc-cascader__content">
				<vc-cascader-col
					v-for="(item, index) in cols"
					v-if="rebuildData[index] && rebuildData[index].length"
					ref="col"
					:value="currentValue[index]"
					:key="index"
					:index="index"
					:data-source="rebuildData[index]"
					@change="handleCellChange"
					@click="handleCellClick"
				/>
			</div>
		</template>
	</vc-popover>
</template>

<script>
import { pick, cloneDeep, isEqualWith } from 'lodash';
import { getSelectedData } from '../utils/index';
import { VcError } from '../vc/index';
import Extends from '../extends';
import Input from '../input/index';
import Popover from '../popover/index';
import Icon from '../icon/index';
import InputMixin from '../input/input-mixin';
import Col from './col';
	
export default {
	name: 'vc-cascader',
	components: {
		'vc-input': Input,
		'vc-icon': Icon,
		'vc-popover': Popover,
		'vc-cascader-col': Col,
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
		dataSource: {
			type: Array,
			default: () => ([])
		},
		extra: {
			type: String,
			default: ''
		},
		formatter: {
			type: Function,
			default: v => (v && v.join(' / '))
		},
		loadData: {
			type: Function,
		},
		changeOnSelect: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			isHover: false,
			visible: false,
			currentValue: [],
			currentLabel: [],
			rebuildData: []
		};
	},
	computed: {
		icon() {
			return this.visible ? 'up' : 'down';
		},
		showClear() {
			return this.currentValue && this.currentValue.length && this.clearable && !this.disabled && this.isHover;
		},
		cols() {
			return this.currentValue.length + 1;
		},
		/**
		 * TODO: 初始化时，存在查找耗时
		 */
		label() {
			const { label = [] } = this.getInfo(this.changeOnSelect ? this.currentValue : this.value);
			return label.filter(i => i);
		},
		formatLabel() {
			return this.formatter(this.label) || this.extra;
		}

	},
	watch: {
		dataSource: {
			immediate: false,
			handler() {
				this.rebuildData = this.makeRebuildData();
			}
		},
		value: {
			immediate: true,
			handler(v) {
				/**
				 * 不使用this.currentValue = v; 避免同步修改源数据，这里有取消操作
				 * @type {[type]}
				 */
				this.currentValue = v && v.length > 0 ? [...v] : [];
			}
		},
		// currentValue() {}
	},
	methods: {
		/**
		 * 初始化完成后格式化数据
		 */
		handleReady() {
			this.rebuildData = this.makeRebuildData();

			this.$emit('ready');
		},
		handleClear(e) {
			if (!this.showClear) return;
			e.stopPropagation();

			this.currentValue.splice(0, this.currentValue.length);

			this.sync(true);
		},

		/**
		 * 单列数据
		 * @param  {Array} source 数据源
		 */
		makeData(source) {
			let data = source && source.map(i => ({
				value: i.value,
				label: i.label,
				hasChildren: !!(i.children && (i.children.length > 0 || this.loadData)),
				loading: false
			}));
			return data;
		},

		/**
		 * 调整数据
		 * @return {Array} 每列的数据
		 */
		makeRebuildData() {
			if (!this.dataSource.length) return [];
			let temp = this.dataSource;
			let data = this.currentValue.slice(0).reduce((pre, cur, index) => {
				pre[index] = this.makeData(temp);
				temp = ((temp && temp.find(i => i.value == cur)) || {}).children;
				return pre; 
			}, []);

			temp && data.push(this.makeData(temp));

			return data;
		},

		getInfo(v) {
			return getSelectedData(v, this.dataSource) || {};
		},
		/**
		 * 改变后的回调
		 * @param  {String} value    改变后的值
		 * @param  {Number} rowIndex 索引
		 * @param  {Number} colIndex 列
		 * @param  {Number} isHover 是否是xx
		 */
		async handleCellChange({ value, rowIndex, colIndex }) {
			this.isLast = false;

			try {
				const len = this.currentValue.slice(colIndex).length;
				this.currentValue.splice(colIndex, len, value);

				/**
				 * TODO: 提前缓存index
				 */
				let children = this.currentValue.reduce((pre, cur) => {
					let target = pre.find(i => i.value == cur) || {};

					return target.children ? target.children : undefined;
				}, this.dataSource);

				/**
				 * 异步加载数据
				 */
				if (this.loadData && children && children.length === 0) {

					this.rebuildData[colIndex][rowIndex].loading = true;

					let res = await this.loadData();
					/**
					 * TODO: 优化，dataSource -> cloneData?
					 */
					children.splice(0, 0, ...res);
				}

				children && this.rebuildData.splice(colIndex + 1, len, this.makeData(children));
			} catch (e) {
				throw new VcError('vc-cascader', e);
			} finally {
				this.rebuildData[colIndex][rowIndex].loading && (
					this.rebuildData[colIndex][rowIndex].loading = false
				);
			}
			
		},

		handleCellClick() {
			this.sync();
		},

		handleClose() {
			if (!isEqualWith(this.currentValue, this.value)) {
				// 暂时不用this.rebuildData, ready时会再次触发
				this.currentValue = this.value;
			}
			
			this.$emit('close');
		},

		// 可能存在强制关闭的情况
		handleDestory() {
			this.visible && (this.visible = false);
		},
		/**
		 * v-model 同步, 外部的数据改变时不会触发
		 */
		sync(force) {
			(this.changeOnSelect) && this.$emit('change', this.currentValue, this.label);

			// 最后一项，自动关闭
			let lastData = this.rebuildData[this.currentValue.length];

			let isLast = !lastData || lastData.length === 0;

			(isLast || this.changeOnSelect) && (this.visible = false);

			// 该模式下，label会变为上一个值，这里重新获取一次
			if ((force || isLast) && !this.changeOnSelect) {
				const { label } = this.getInfo(this.currentValue);
				this.$emit('change', this.currentValue, label);
			}

			this.dispatch && this.dispatch('vc-form-item', 'form-change', this.currentValue);
		}
	},
};
</script>

<style lang='scss'>
@import '../style/index.scss';

$block: vc-cascader;

@include block($block) {
	display: inline-block;
	position: relative;
	width: 100%;
	cursor: text;
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
		cursor: pointer;
		color: #808695;
		padding: 0 10px 0 2px;
		background: white !important;
		position: relative;
		text-align: center;
		line-height: 26px;
		font-size: 12px;
		white-space: nowrap;
	}
	@include element(icon) {
		@include when(arrow) {
			transform: scale(0.7);
		}
	}
	// 默认不换行
	@include element(content) {
		display: flex;
		flex-wrap: nowrap;
	}
}

</style>
