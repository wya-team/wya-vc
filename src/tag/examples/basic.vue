<template>
	<div>
		<vc-tag color="default">default</vc-tag>
		<vc-tag color="primary">primary</vc-tag>
		<vc-tag color="success">success</vc-tag>
		<vc-tag color="error">error</vc-tag>
		<vc-tag color="warning">warning</vc-tag>
		<vc-tag color="magenta">magenta</vc-tag>
		<vc-tag color="red">red</vc-tag>
		<vc-tag color="volcano">volcano</vc-tag>
		<vc-tag color="orange">orange</vc-tag>
		<vc-tag color="gold">gold</vc-tag>
		<vc-tag color="yellow">yellow</vc-tag>
		<vc-tag color="lime">lime</vc-tag>
		<vc-tag color="green">green</vc-tag>
		<vc-tag color="cyan">cyan</vc-tag>
		<vc-tag color="blue">blue</vc-tag>
		<vc-tag color="geekblue">geekblue</vc-tag>
		<vc-tag color="purple">purple</vc-tag>
		<vc-tag color="#FFA2D3">Custom Color</vc-tag>
		<br><br>
		<vc-tag type="border" closable color="primary">标签一</vc-tag>
		<vc-tag type="border" closable color="success">标签二</vc-tag>
		<vc-tag type="border" closable color="error">标签三</vc-tag>
		<vc-tag type="border" closable color="warning">标签四</vc-tag>
		<br><br>
		<vc-tag type="dot" closable color="primary">标签一</vc-tag>
		<vc-tag type="dot" closable color="success">标签二</vc-tag>
		<vc-tag type="dot" closable color="error">标签三</vc-tag>
		<vc-tag type="dot" closable color="warning">标签四</vc-tag>
		<br><br>
		<vc-tag checkable color="primary">标签一</vc-tag>
		<vc-tag checkable color="success">标签二</vc-tag>
		<vc-tag checkable color="error">标签三</vc-tag>
		<vc-tag checkable color="warning">标签四</vc-tag>
		<br><br>
		<vc-tag 
			v-for="item in count" 
			:key="item" 
			:name="item" 
			closable 
			@close="handleClose">标签{{ item + 1 }}</vc-tag>
		<button @click="handleAdd">添加标签</button>
	</div>
</template>
<script>
import Tag from '..';

export default {
	name: "vc-tag-basic",
	components: {
		'vc-tag': Tag
	},
	data() {
		return {
			count: [0, 1, 2]
		};
	},
	computed: {
		
	},
	methods: {
		handleAdd() {
			if (this.count.length) {
				this.count.push(this.count[this.count.length - 1] + 1);
			} else {
				this.count.push(0);
			}
		},
		handleClose(event, name) {
			const index = this.count.indexOf(name);
			this.count.splice(index, 1);
		}
	}
};
</script>
