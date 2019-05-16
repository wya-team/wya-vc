<template>
	<div style="margin: 40px">
		<vc-dropdown
			v-model="visible"
			:portal="true"
			placement="bottom-left"
			trigger="hover"
			@click="handleClick"
			@visible-change="handleChange"
			@close="handleCloseCb"
		>
			<div>菜单(右){{ visible }}</div>
			<template #list>
				<vc-dropdown-menu>
					<vc-dropdown-item name="1">驴打滚</vc-dropdown-item>
					<vc-dropdown-item name="2">炸酱面</vc-dropdown-item>
					<vc-dropdown-item name="3">豆汁儿</vc-dropdown-item>
					<vc-dropdown-item name="4">冰糖葫芦</vc-dropdown-item>
					<vc-dropdown-item name="5">北京烤鸭</vc-dropdown-item>
				</vc-dropdown-menu>

				<vc-button 
					style="margin-left: 100px" 
					@click="handleClose"
				>关闭</vc-button>
			</template>
		</vc-dropdown>

		<vc-button style="margin-left: 100px" @click="handleVisible">点我</vc-button>
	</div>
</template>
<script>
import Dropdown from '..';
import Button from '../../button';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-dropdown': Dropdown,
		'vc-dropdown-menu': Dropdown.Menu,
		'vc-dropdown-item': Dropdown.Item,
		'vc-button': Button,
	},
	data() {
		return {
			visible: false
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
		},

		handleVisible() {
			this.visible = !this.visible;
		},

		handleClose() {
			this.visible = false;
			console.log(this.visible);
		},

		handleCloseCb() {
			console.log('cb');
		}
	}
};
</script>
