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
import emitter from '../../extends/mixins/emitter'; // 表单验证

export default {
	name: "vcm-picker-view",
	components: {
		'vcm-picker-col': Col
	},
	mixins: [emitter],
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
		dataSource(v) {
			this.makeRebuildData();
		},
		value: {
			immediate: true,
			handler(v) {
				// 数组情况下同值会重新set
				if (isEqualWith(v, this.currentValue)) {
					/**
					 * 空数组的情况需要重新rebuildData
					 */
					v.length === 0 && this.makeRebuildData();
				}
				
				this.currentValue = v;
				this.makeRebuildData();
			}
		},
		currentValue(v) {
			this.$emit('change', v);

			this.allowDispatch && this.dispatch('vc-form-item', 'form-change', v);
		}
	},
	methods: {
		/**
		 * @param  {[Number, String]} v 当前选种值
		 * @param  {[Number]} index 当前第几列
		 */
		handleColChange(v, index) {
			this.currentValue.splice(index, 1, v.value);
			if (index < this.cols && this.cascade) {
				this.currentValue.splice(index + 1, this.cols - index);
				this.makeRebuildData(index + 1);
			}

			// 普通组件
			this.$emit('picker-change', v, index);
		},
		makeData(data, i) {
			let tag = 0;
			if (this.currentValue[i - 1]) {
				tag = data.findIndex(item => item.value == this.currentValue[i - 1]);
				tag = tag < 0 ? 0 : tag;
			}
			return {
				value: i == 0 ? data[tag].value : data[tag].children[0].value,
				children: i == 0 ? data : data[tag].children
			};
		},
		/**
		 * todo, 存在副作用，使用函数式编程
		 */
		makeRebuildData(index = 0) {
			if (!this.dataSource.length) return;
			if (this.cascade && this.dataSource.some(item => !!item.children)) {
				
				// 默认选择
				for (let i = index; i < this.cols; i++) {
					let { value, children } = this.makeData(this.rebuildData[i - 1] || this.dataSource, i);
					this.rebuildData.splice(i, 1, children);
					if (!this.currentValue[i]) {
						this.currentValue.splice(i, 1, value);
					}
				}
			} else if (this.dataSource.length !== 0) {
				this.rebuildData = this.dataSource;

				// 默认选择
				for (let i = index; i < this.cols; i++) {
					if (!this.currentValue[i] && this.rebuildData[i]) {
						this.currentValue.splice(i, 1, this.rebuildData[i][0].value);
					}
				}
			}
		},
		/**
		 * 外部调取
		 */
		getValue() {
			return getSelectedData(this.currentValue, this.dataSource);
		}
		
	}
};

</script>

<style lang='scss'>
@import '../../style/index.scss';

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
