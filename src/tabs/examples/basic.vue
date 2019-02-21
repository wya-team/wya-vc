<template>
	<vc-tabs 
		type="card" 
		closable 
		@click="handleClick"
		@tab-remove="handleRemove"
	>
		<vc-tabs-pane label="标签一">标签一的内容</vc-tabs-pane>
		<vc-tabs-pane label="标签二">标签二的内容</vc-tabs-pane>
		<vc-tabs-pane label="标签三">标签三的内容</vc-tabs-pane>
	</vc-tabs>
</template>
<script>
import Tabs from '..';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-tabs': Tabs,
		'vc-tabs-pane': Tabs.Pane,
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	methods: {
		handleClick() {
			console.log('click');
		},
		handleRemove() {
			console.log('remove');
		}
	}
};
</script>
