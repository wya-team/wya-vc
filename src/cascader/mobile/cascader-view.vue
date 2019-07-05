<template>
	<div class="vcm-cascader-view">
		<div class="vcm-cascader-view__wrapper">
			<div
				v-for="(item, index) in currentValue"
				:key="item"
				:class="{ 'is-active': currentIndex === index }"
				class="vcm-cascader-view__label"
				@click="currentIndex = index"
			>
				{{ label[index] }}
			</div>
			<div 
				v-if="hasChildren" 
				:class="{ 'is-active': currentIndex === currentValue.length }"
				class="vcm-cascader-view__label"
			>
				请选择
			</div>
		</div>
		<vcm-cascader-col
			:value="colValue"
			:data-source="colData"
			:index="currentIndex"
			@change="handleChange"
		/>
	</div>
</template>

<script>
import { pick, cloneDeep, isEqualWith } from 'lodash';
import Col from './col';
import { getSelectedData } from '../../utils/index';

export default {
	name: 'vcm-cascader-view',
	components: {
		'vcm-cascader-col': Col
	},
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		value: {
			type: Array,
			default: () => []
		},
		dataSource: {
			type: Array,
			default: () => ([])
		},
		loadData: Function
	},
	data() {
		return {
			currentIndex: 0,
			currentValue: [],
			rebuildData: [],
			hasChildren: false
		};
	},
	computed: {
		colValue() {
			return this.currentValue[this.currentIndex];
		},
		colData() {
			return this.rebuildData[this.currentIndex];
		},
		/**
		 * TODO: 初始化时，存在查找耗时
		 */
		label() {
			const { label = [] } = this.getInfo(this.currentValue);
			return label.filter(i => i);
		},
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
				// 数组情况下同值会重新set
				if ((v && v.length !== 0) && isEqualWith(v, this.currentValue)) {
					return;
				}
				
				this.currentValue = v;
				this.rebuildData = this.makeRebuildData();
				// this.currentValue.forEach((item) => {
				// 	// todo
				// });
			}
		}
	},

	methods: {
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

		/**
		 * 改变后的回调
		 * @param  {String} value    改变后的值
		 * @param  {Number} rowIndex 索引
		 * @param  {Number} colIndex 列
		 * @param  {Number} isHover 是否是xx
		 */
		async handleChange({ value, rowIndex, colIndex }) {
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
				
				if ((!children || children.length === 0) && colIndex < this.rebuildData.length) {
					this.currentValue.splice(colIndex + 1, len);
					this.rebuildData.splice(colIndex + 1, len);

					this.hasChildren = false;
				} else {
					this.hasChildren = true;
					this.currentIndex = this.currentValue.length;
				}
			} catch (e) {
				throw new VcError('vc-cascader', e);
			} finally {
				this.rebuildData[colIndex][rowIndex].loading && (
					this.rebuildData[colIndex][rowIndex].loading = false
				);
			}
		},
		getInfo(v) {
			console.log(this.currentValue);
			return getSelectedData(v, this.dataSource) || {};
		},
	}
};
</script>

<style lang="scss">
@import '../../style/index.scss';

@include block(vcm-cascader-view) {
	overflow: hidden;
	display: flex;
	flex-direction: column;
	height: 65vh;
	font-size: 14px;
	color: #000;
	@include element(wrapper) {
		margin-top: 30px;
		padding: 0 12px;
		border-bottom: 1px solid #eee;
	}
	@include element(label) {
		display: inline-block;
		padding-bottom: 12px;
		font-size: 14px;
		color: #000;
		
		&:not(:first-child) {
			margin-left: 30px;
		}
		@include when(active) {
			color: #5495f6;
			border-bottom: 2px solid #5495f6;
		}
	}
}
</style>
