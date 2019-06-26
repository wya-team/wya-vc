import { getRowIdentity } from '../utils';

export default {
	data() {
		return {
			states: {
				current: null
			}
		};
	},

	methods: {
		setCurrentRowKey(key) {
			this.assertRowKey();

			const { data = [], rowKey } = this.states;
			const currentRow = data.find(item => getRowIdentity(item, rowKey) === key);
			this.states.currentRow = currentRow || null;
		},

		updateCurrentRow() {
			const { rowKey, data = [], currentRow } = this.states;
			const oldCurrentRow = currentRow;

			// 当 currentRow 不在 data 中时尝试更新数据
			if (oldCurrentRow && !data.includes(oldCurrentRow)) {
				let newCurrentRow = null;
				if (rowKey) {
					newCurrentRow = data.find(item => {
						return getRowIdentity(item, rowKey) === getRowIdentity(oldCurrentRow, rowKey);
					});
				}
				this.states.currentRow = newCurrentRow;
				if (newCurrentRow !== oldCurrentRow) {
					this.table.$emit('current-change', null, oldCurrentRow);
				}
			}
		}
	}
};
