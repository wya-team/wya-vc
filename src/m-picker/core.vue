<template>
	<div v-if="show" class="vcm-picker-core">
		<vcm-popup v-model="isActive" :fixed="true" @close="handleClose">
			<div v-if="showToolbar" class="__header">
				<div v-if="cancelText" class="__item __left" @click.stop="handleCancel">{{ cancelText }}</div>
				<div class="__item __title">{{ title }}</div>
				<div v-if="okText" class="__item __right" @click.stop="handleOk">{{ okText }}</div>
			</div>
			<div class="__main">
				<vcm-picker-col
					v-for="(item,index) in cols"
					ref="col"
					:key="index"
					:index="index"
					:data-source="rebuildData[index]"
					:value="values[index]"
					:cascade="cascade"
					:item-style="itemStyle"
					@change="handleColChange(arguments[0], index)" 
				/>
			</div>
		</vcm-popup>
	</div>
</template>

<script>
import MPopup from '../m-popup/m-popup.vue';
import Col from './col';
import CreatePortal from '../create-portal/index';
import { getSelectedData } from '../utils/index';

const config = {
	name: "vcm-picker-core",
	components: {
		'vcm-popup': MPopup,
		'vcm-picker-col': Col
	},
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		dataSource: Array,
		cols: {
			type: Number,
			default: 1
		},
		show: { // sync
			type: Boolean,
			default: true
		},
		itemStyle: Object,
		title: {
			type: String,
			default: ''
		},
		cancelText: {
			type: String,
			default: '取消'
		},
		okText: {
			type: String,
			default: '确定'
		},
		showToolbar: {
			type: Boolean,
			default: true
		},
		cascade: {
			type: Boolean,
			default: true
		},
		value: {
			type: Array,
		}
	},
	data() {
		return {
			isActive: false,
			values: [],
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
				if (v && v.length) {
					this.values = [...v];
				}
			}
		}
	},
	mounted() {
		this.isActive = true;
	},
	created() {
		this.makeRebuildData();
	},
	methods: {
		handleClose() {
			// 普通组件
			this.$emit('update:show', false);
			this.$emit('show-change', false);

			// CreatePortal事件或模拟其事件
			this.$emit('destroy');
		},
		handleOk() {
			let selectedData = getSelectedData(this.values, this.dataSource);

			// CreatePortal事件或模拟其事件
			this.$emit('sure', selectedData);

			// 普通组件
			this.$emit('change', [...this.values], selectedData);

			this.isActive = false;
		},
		handleCancel(v) {
			this.values = [];
			this.rebuildData = [];
			this.makeRebuildData();

			// CreatePortal事件或模拟其事件
			this.$emit('close', []);

			this.isActive = false;
		},
		/**
		 * @param  {[Number, String]} v 当前选种值
		 * @param  {[Number]} index 当前第几列
		 */
		handleColChange(v, index) {
			this.values.splice(index, 1, v.value);
			if (index < this.cols && this.cascade) {
				this.values.splice(index + 1, this.cols - index);
				this.makeRebuildData(index + 1);
			}

			// 普通组件
			this.$emit('picker-change', v, index);
		},
		makeData(data, i) {
			let tag = 0;
			if (this.values[i - 1]) {
				tag = data.findIndex(item => item.value == this.values[i - 1]);
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
					if (!this.values[i]) {
						this.values.splice(i, 1, value);
					}
				}
			} else if (this.dataSource.length !== 0) {
				this.rebuildData = this.dataSource;

				// 默认选择
				for (let i = index; i < this.cols; i++) {
					if (!this.values[i] && this.rebuildData[i]) {
						this.values.splice(i, 1, this.rebuildData[i][0].value);
					}
				}
			}
		}
	}
};


export default config;
export const Func = CreatePortal({}, config);

</script>

<style scoped lang='scss'>
.vcm-picker-core {
	.__header {
		position: relative;
		display: flex;
		align-items: center;
		background-color: #fff;
		background-image: linear-gradient(180deg, #e7e7e7, #e7e7e7, transparent, transparent);
		background-position: bottom;
		background-size: 100% 1px;
		background-repeat: no-repeat;

	}

	.__item {
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		padding: 9px 15px;
		height: 42px;
		color: #108ee9;
		font-size: 17px;
	}

	.__main {
		display: flex;
		align-items: center;
		flex-direction: row;
		align-items: center;
		flex: 1;
		box-sizing: border-box;
		overflow: hidden;
		background-color: #fff;
	}

	.__title {
		flex: 1;
		text-align: center;
		color: #000;
	}
}

</style>
