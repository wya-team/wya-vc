<template>
	<div class="vcm-picker-view">
		<vcm-picker-col
			v-for="(item, index) in cols"
			ref="col"
			:key="index"
			:index="index"
			:data-source="rebuildData[index]"
			:value="currentValue[index]"
			:cascade="cascade"
			:item-style="itemStyle"
			@change="handleColChange(arguments[0], index)" 
		/>
	</div>
</template>

<script>
import { isEqualWith } from 'lodash';
import Col from './col';
import { getSelectedData } from '../../utils/index';
import Extends from '../../extends';

export default {
	name: "vcm-picker-view",
	components: {
		'vcm-picker-col': Col
	},
	mixins: [...Extends.mixins(['emitter'])],
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		value: {
			type: Array,
		},
		dataSource: Array,
		cols: {
			type: Number,
			default: 1
		},
		itemStyle: Object,
		cascade: {
			type: Boolean,
			default: true
		},
		allowDispatch: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			currentValue: [],
			rebuildData: []
		};
	},
	computed: {},
	watch: {
		dataSource: {
			immediate: false,
			handler() {
				this.rebuildData = this.makeRebuildData();

				this.resetDefault();
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

				this.resetDefault();
			}
		},
		currentValue(v) {
			// ..
		}
	},
	methods: {
		/**
		 * @param  {[Number, String]} v 当前选种值
		 * @param  {[Number]} index 当前第几列
		 */
		handleColChange(v, index) {
			this.currentValue.splice(index, 1, v.value);

			if (this.cascade && index < this.cols) {
				this.currentValue.splice(index + 1, this.cols - index); // 需要清理，用于resetDefault
				this.rebuildData.splice(index + 1, this.cols - index, ...this.makeRebuildData(index + 1));
				this.resetDefault(index + 1);
			}

			// 普通组件
			this.$emit('picker-change', v, index);

			this.sync();
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
		 * index 之后的数据
		 */
		makeRebuildData(colIndex = 0) {
			if (!this.dataSource.length) return [];
			if (!this.cascade || this.cols === 1) return this.dataSource;

			let temp = this.dataSource;
			let data = Array.from({ length: this.cols }).reduce((pre, cur, index) => {
				pre[index] = this.makeData(temp) || [];
				temp = ((temp && temp.find(i => i.value == this.currentValue[index])) || temp[0] || {}).children;
				return pre; 
			}, []);

			return data.slice(colIndex);
		},

		resetDefault(colIndex = 0) {
			this.rebuildData.slice(0).forEach((item, index) => {
				if (index >= colIndex) {
					this.currentValue.splice(index, 1, this.currentValue[index] || item[0].value);
				}
			});
		},

		/**
		 * v-model 同步, 外部的数据改变时不会触发
		 */
		sync() {
			const { label, data } = getSelectedData(this.currentValue, this.dataSource);
			this.$emit('change', this.currentValue, label, data);

			this.allowDispatch && this.dispatch('vc-form-item', 'form-change', this.currentValue);
		}
		
	}
};

</script>

<style lang='scss'>
@import '../../style/vars.scss';

@include block(vcm-picker-view) {
	display: flex;
	align-items: center;
	flex-direction: row;
	align-items: center;
	flex: 1;
	box-sizing: border-box;
	overflow: hidden;
	background-color: #fff;
}
</style>
