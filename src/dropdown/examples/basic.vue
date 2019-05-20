<template>
	<div style="margin: 40px">
		<vc-dropdown
			v-model="visible"
			:portal="true"
			:trigger="trigger"
			placement="bottom-left"
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

					<!-- 高级嵌套 -->
					<vc-dropdown 
						tag="li" 
						class="vc-dropdown-item" 
						placement="right" 
						style="display: block"
						@click="handleClick"
						@visible-change="handleChange"
					>
						<span @click.stop>冰糖葫芦</span>
						<template #list>
							<vc-dropdown-menu>
								<vc-dropdown-item name="1">驴打滚</vc-dropdown-item>
								<vc-dropdown-item name="2">炸酱面</vc-dropdown-item>
								<vc-dropdown-item name="3">豆汁儿</vc-dropdown-item>
							</vc-dropdown-menu>
						</template>
					</vc-dropdown>

					<!-- 高级嵌套需要v-model -->
					<vc-popover
						v-model="visiblePopover"
						trigger="hover" 
						tag="li" 
						class="vc-dropdown-item"
						portal-class-name="is-padding-none"
						placement="right"
					>
						<span @click.stop>北京烤鸭</span>
						<template #content>
							<vc-dropdown-item name="1">驴打滚</vc-dropdown-item>
							<vc-dropdown-item name="2">炸酱面</vc-dropdown-item>
							<vc-dropdown-item name="3">豆汁儿</vc-dropdown-item>
							<vc-dropdown-item name="4">冰糖葫芦</vc-dropdown-item>
						</template>
					</vc-popover>
					
				</vc-dropdown-menu>	

				<vc-button 
					style="margin-left: 100px" 
					@click="handleClose"
				>关闭</vc-button>
			</template>
		</vc-dropdown>

		<vc-button style="margin-left: 100px" @click="handleVisible">点我</vc-button>
		<vc-button style="margin-left: 100px" @click="handleTrigger">{{ trigger }}</vc-button>
	</div>
</template>
<script>
import Dropdown from '..';
import Popover from '../../popover';
import Button from '../../button';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-dropdown': Dropdown,
		'vc-dropdown-menu': Dropdown.Menu,
		'vc-dropdown-item': Dropdown.Item,
		'vc-button': Button,
		'vc-popover': Popover,
	},
	data() {
		return {
			visible: false,
			visiblePopover: false,
			trigger: 'click'
		};
	},
	computed: {
		
	},
	methods: {
		handleClick() {
			/**
			 * 两层以上销毁
			 */
			this.visiblePopover = false; // 让popover先消失
			this.visible = false;

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
		},
		handleTrigger() {
			this.trigger = this.trigger === 'click' ? 'hover' : 'click';
		}
	}
};
</script>
