<!-- <template>
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

<script>
export default {
	name: '',
	components: {

	},
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		value: {
			type: Array,
		},
		dataSource: {
			type: Array,
			default: () => ([])
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
			currentValue: [],
			rebuildData: []
		};
	},
	computed: {
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
			}
		}
	},
	created() {
		
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

			} catch (e) {
				throw new VcError('vc-cascader', e);
			} finally {
				this.rebuildData[colIndex][rowIndex].loading && (
					this.rebuildData[colIndex][rowIndex].loading = false
				);
			}
		},
		/**
		 * v-model 同步, 外部的数据改变时不会触发
		 */
		sync(force) {
			(this.changeOnSelect) && this.$emit('change', this.currentValue, this.label);

			// 最后一项，自动关闭
			let lastData = this.rebuildData[this.currentValue.length];

			let isLast = !lastData || lastData.length === 0;

			(isLast || this.changeOnSelect) && (this.isActive = false);

			// 该模式下，label会变为上一个值，这里重新获取一次
			if ((force || isLast) && !this.changeOnSelect) {
				const { label } = this.getInfo(this.currentValue);
				this.$emit('change', this.currentValue, label);
			}

			this.dispatch && this.dispatch('vc-form-item', 'form-change', this.currentValue);
		},
		getInfo(v) {
			return getSelectedData(v, this.dataSource) || {};
		},

	},
};
</script>

<style lang="scss">
</style>
 -->