<template>
	<vc-dropdown
		v-model="visible"
		trigger="click"
		placement="bottom"
		tag="span"
		portal-class-name="vc-table-extend"
		@visible-change="handleVisibleChange"
	>
		<span>
			<slot />
			<vc-icon :style="{ 'color': !isAllSelected ? '#ccc' : 'blue' }" type="filter" />
		</span>
		<template #list>
			<vc-dropdown-menu>
				<vc-dropdown-item :closable="false">
					<vc-checkbox
						:value="isAllSelected"
						:indeterminate="indeterminate"
						:disabled="required && isAllSelected"
						@change="handleToggleAll"
					>
						全部
					</vc-checkbox>
				</vc-dropdown-item>
				<vc-dropdown-item :closable="false">
					<vc-checkbox-group :value="filters" @change="handleChange">
						<vc-checkbox 
							v-for="item in dataSource"
							:key="item.value"
							:label="item.value"
							:disabled="required && filters.length === 1 && filters.includes(item.value)"
						>
							{{ item.label }}
						</vc-checkbox>
					</vc-checkbox-group>
				</vc-dropdown-item>
				<vc-dropdown-item :closable="false">
					<vc-button @click="visible = false">
						取消
					</vc-button>
					<vc-button
						type="primary"
						@click="handleConfirm"
					>
						确认
					</vc-button>
				</vc-dropdown-item>
			</vc-dropdown-menu>
		</template>
	</vc-dropdown>
</template>

<script>
import Button from '../../../button';
import Dropdown from '../../../dropdown';
import Checkbox from '../../../checkbox';
import Icon from '../../../icon';

export default {
	name: 'vc-table-filter',
	components: {
		'vc-button': Button,
		'vc-dropdown': Dropdown,
		'vc-dropdown-menu': Dropdown.Menu,
		'vc-dropdown-item': Dropdown.Item,
		'vc-checkbox': Checkbox,
		'vc-checkbox-group': Checkbox.Group,
		'vc-icon': Icon,
	},
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		// 初始选中的选项value值数组
		value: {
			type: Array,
			default: () => ([])
		},
		// 所有选项
		dataSource: {
			type: Array,
			default: () => ([])
		},
		// 是否至少选一个
		required: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			visible: false,
			isAllSelected: true,
			filters: [],
		};
	},
	computed: {
		indeterminate() {
			return !this.isAllSelected && !!this.filters.length;
		}
	},
	created() {
		this.checkSelection(this.value);
	},
	methods: {
		handleConfirm() {
			let hasChanged = false;
			if (this.value.length !== this.filters.length) {
				hasChanged = true;
			} else {
				hasChanged = this.value.some((item, index) => {
					return item !== this.filters[index];
				});
			}
			
			hasChanged && this.$emit('change', [...this.filters]);
			this.isAllSelected && this.$emit('select-all', [...this.filters]);
			!this.filters.length && this.$emit('select-none');
			this.visible = false;
		},
		handleChange(list) {
			this.checkSelection(list);
			this.filters = list;
		},
		handleToggleAll(value) {
			if (value === this.isAllSelected) return;
			
			this.filters = value ? this.dataSource.map(item => item.value) : [];
			this.isAllSelected = value;
		},
		checkSelection(list) {
			this.isAllSelected = list.length === this.dataSource.length;
		},
		handleVisibleChange(value) {
			if (value) {
				this.filters = [...this.value];
				this.checkSelection(this.value);
			}
		}
	}
};
</script>

<style lang="scss">
.vc-table-extend {
	min-width: 144px;
	padding-bottom: 0;

	.vc-checkbox-group {
		overflow-y: auto;
		max-height: 160px;
		.vc-dropdown-item {
			height: 32px;
		}
	}
}
</style>
