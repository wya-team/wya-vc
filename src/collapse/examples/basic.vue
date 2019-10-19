<template>
	<vc-collapse class="v-collapse" value="1" accordion>
		<vc-collapse-item name="1" class="item">
			<div class="_title">
				title
			</div>
			<span slot="icon" slot-scope="it" class="_icon">
				{{ it.isExpend }}
			</span>
			<div slot="content" class="_content">
				content
			</div>
		</vc-collapse-item>
		<vc-collapse-item name="2" class="item">
			<div class="_title">
				title
			</div>
			<div slot="content" class="_content">
				content
			</div>
		</vc-collapse-item>
	</vc-collapse>
</template>

<script>
import Collapse from '../collapse';
import CollapseItem from '../collapse-item';

export default {
	name: "vc-collapse-basic",
	components: {
		"vc-collapse": Collapse,
		"vc-collapse-item": CollapseItem
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	methods: {
		handleShow() {

		}
	}
};
</script>

<style lang="scss">
.v-collapse {
	.item {
		._title {
			height: 36px; 
			line-height: 36px; 
			background: #e4e4e4;
			font-size: 18px;
			padding: 0 10px
		}
		._icon {
			position: absolute;
			right: 10px;
			top: 0;
			bottom: 0;
			margin: auto 0;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		._content {
			height: 100px;
			padding: 20px;
			background: #e98252
		} 
	}
}
</style>

