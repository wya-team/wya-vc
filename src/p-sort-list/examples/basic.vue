<template>
	<div class="v-p-sort-list-demo">
		<vc-p-sort-list />
		<vc-p-sort-list 
			:render-row="renderRow" 
			:mask="false" 
			display="block" 
			@move="handleMove" 
			@remove="handleRemove" />
		
		
	</div>

</template>
<script>
import PSortList from '../p-sort-list';


export default {
	name: "vc-p-sort-list-basic",
	components: {
		"vc-p-sort-list": PSortList
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	methods: {
		renderRow(h, { data }) {
			return <div class="__border" style={{ borderColor: data.color, }}>{data.color}</div>;
		},
		handleMove(index1, index2) {
			console.log(index1 + "被拖到了" + index2 + "上");
		},
		handleRemove(index) {
			console.log(index + "被删除");
		}
	}
};
</script>
<style lang="scss" >
.v-p-sort-list-demo{
	.__border{
		border: 2px red solid;
		padding: 3em;
		margin: 5px;
		&:hover{
			background-color: rgba(100,100,100,0.5)
		}
		transition:  background-color 0.3s ease;
		

	}
	
}

</style>

