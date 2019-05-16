<template>
	<vc-dropdown 
		:portal="false"
		placement="bottom"
		trigger="click"
		@click="handleClick"
		@visible-change="handleChange"
	>
		<div>
			菜单(右)∨
		</div>
		<template #list>
			<vc-dropdown-menu>
				<vc-dropdown-item name="1">驴打滚</vc-dropdown-item>
				<vc-dropdown-item name="2">炸酱面</vc-dropdown-item>
				<vc-dropdown-item name="3">豆汁儿</vc-dropdown-item>
				<vc-dropdown-item name="4">冰糖葫芦</vc-dropdown-item>
				<vc-dropdown-item name="5">北京烤鸭</vc-dropdown-item>
			</vc-dropdown-menu>
		</template>
	</vc-dropdown>
</template>
<script>
import Dropdown from '..';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-dropdown': Dropdown,
		'vc-dropdown-menu': Dropdown.Menu,
		'vc-dropdown-item': Dropdown.Item,
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	methods: {
		handleClick() {
			console.log('click', arguments[0]);
		},

		handleChange() {
			console.log('visible-change', arguments[0]);
		}
	}
};
</script>
