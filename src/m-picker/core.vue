<template>
	<div class="vcm-picker">
		<vcm-popup v-model="isActive" :fixed="true" @close="handleClose">
			<div v-if="showToolbar" class="__header">
				<div v-if="cancelText" class="__item __left" @click="handleClose">{{ cancelText }}</div>
				<div class="__item __title">{{ title }}</div>
				<div v-if="ok" class="__item __right" @click="handleOk">{{ ok }}</div>
			</div>
			<div class="__main">
				<vcm-col
					v-for="(item,index) in cols"
					ref="col"
					:key="index"
					:index="index"
					:data-source="rebuildData[index]"
					:col-value="values[index]"
					:cascade="cascade"
					:item-style="itemStyle"
					@change="handleColChange" />
			</div>
		</vcm-popup>
	</div>
</template>

<script>
import MPopup from '../m-popup/m-popup.vue';
import Col from './col';
import CreatePortal from '../create-portal/index';

const config = {
	name: "vcm-picker-core",
	components: {
		'vcm-popup': MPopup,
		'vcm-col': Col
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
		itemStyle: Object,
		title: {
			type: String,
			default: ''
		},
		cancelText: {
			type: String,
			default: '取消'
		},
		ok: {
			type: String,
			default: '确定'
		},
		showToolbar: {
			type: Boolean,
			default: true
		},
		cascade: {
			type: Boolean,
			default: false
		},
		currentValue: {
			type: Array,
		}
	},
	data() {
		return {
			isActive: true,
			values: [],
			cloneData: [],
			rebuildData: []
		};
	},
	computed: {},
	watch: {
		dataSource(v) {
			this.makeRebuildData();
		},
		currentValue: {
			immediate: true,
			handler(v) {
				if (v.length) {
					this.values = [...v];
				}
			}
		}
	},
	mounted() {},
	created() {
		this.makeRebuildData();
	},
	methods: {
		handleOk() {
			this.$emit('sure', [...this.values]);
			this.$emit('change', false);
		},
		handleClose(v) {
			this.values = [];
			this.rebuildData = [];
			this.makeRebuildData();
			this.$emit('close', []);
			this.$emit('change', false);
		},
		handleColChange(v, index) {
			// index 当前第几列
			// v 当前选种值
			this.values[index] = v.value;
			if (index < this.cols && this.cascade) {
				this.values.splice(index + 1, this.cols - index);
				this.makeRebuildData(index + 1);
			}
			// 主要给v-model
			this.$emit('picker-change', v, index);
			this.$emit('update:values', [...this.values]);
		},
		makeData(data, i) {
			let tag = 0;
			if (this.values[i - 1]) {
				tag = data.findIndex(item => item.value == this.values[i - 1]);
			}
			tag = tag < 0 ? 0 : tag;
			return {
				value: i == 0 ? data[tag].value : data[tag].children[0].value,
				children: i == 0 ? data : data[tag].children
			};
		},
		makeRebuildData(index = 0) {
			if (!this.dataSource.length) return;
			if (this.cascade) {
				for (let i = index; i < this.cols; i++) {
					let { value, children } = this.makeData(i == 0 ? this.dataSource : this.rebuildData[i - 1], i);
					this.rebuildData.splice(i, 1, children);
					if (!this.values[i]) {
						this.values.splice(i, 1, value);
					}
				}
			} else {
				this.rebuildData = this.dataSource;
			}
		}
	},
	destoryed() {}
};


export default config;
export const Picker = CreatePortal({}, config);

</script>

<style scoped lang='scss'>
.vcm-picker {
	.__header {
		position: relative;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #ddd;
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
