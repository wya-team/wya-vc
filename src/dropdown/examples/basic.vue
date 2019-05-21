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
						:portal="false"
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
						:portal="false"
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
				
				<!-- indeterminate 测试slot同步 -->
				<div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
					<vc-checkbox
						:indeterminate="indeterminate"
						:value="checkAll"
						@click.prevent.native="handleCheckAll"
					>全选</vc-checkbox>
				</div>
				<vc-checkbox-group v-model="checkAllGroup" @change="handleCheckChange">
					<vc-checkbox label="香蕉"/>
					<vc-checkbox label="苹果"/>
					<vc-checkbox label="西瓜"/>
				</vc-checkbox-group>
				<vc-button 
					style="margin-left: 100px" 
					@click="handleClose"
				>关闭</vc-button>
			</template>
		</vc-dropdown>

		<vc-button style="margin-left: 100px" @click="handleVisible">visible: {{ visible }}</vc-button>
		<vc-button style="margin-left: 100px" @click="handleTrigger">trigger {{ trigger }}</vc-button>
	</div>
</template>
<script>
import Dropdown from '..';
import Popover from '../../popover';
import Button from '../../button';
import Checkbox from '../../checkbox';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-dropdown': Dropdown,
		'vc-dropdown-menu': Dropdown.Menu,
		'vc-dropdown-item': Dropdown.Item,
		'vc-button': Button,
		'vc-popover': Popover,
		'vc-checkbox': Checkbox,
		'vc-checkbox-group': Checkbox.Group,
	},
	data() {
		return {
			visible: false,
			visiblePopover: false,
			trigger: 'hover',

			indeterminate: true,
			checkAll: false,
			checkAllGroup: ['香蕉', '西瓜']
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

		/**
		 * 事件冒泡上来了
		 */
		handleVisible() {
			/**
			 * click模式下，this.visible会一直拿到false
			 */
			if (!this.wait) {
				this.visible = !this.visible;
			}
		},

		handleClose() {
			this.visible = false;
		},

		handleCloseCb() {
			console.log('cb');
			this.wait = 1;
			this.timer = setTimeout(() => {
				this.wait = 0;
			}, 200);
		},
		handleTrigger() {
			this.trigger = this.trigger === 'click' ? 'hover' : 'click';
		},

		handleCheckAll() {
			if (this.indeterminate) {
				this.checkAll = false;
			} else {
				this.checkAll = !this.checkAll;
			}
			this.indeterminate = false;

			if (this.checkAll) {
				this.checkAllGroup = ['香蕉', '苹果', '西瓜'];
			} else {
				this.checkAllGroup = [];
			}
		},
		handleCheckChange(data) {
			if (data.length === 3) {
				this.indeterminate = false;
				this.checkAll = true;
			} else if (data.length > 0) {
				this.indeterminate = true;
				this.checkAll = false;
			} else {
				this.indeterminate = false;
				this.checkAll = false;
			}
		}
	}
};
</script>
