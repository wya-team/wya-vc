<template>

	<div class="vc-p-sort-list">
		
		<transition-group >
			<div 
				v-for="(item, index) in list " 
				:key="item[keyName]"
				:style="'display:'+display"
				draggable 
				class="__item"

				@dragstart="dragstart($event,index,item)" 
				@dragend="dragend($event,index,item)" 
				@drag="drag($event,index,item)" 
				@dragenter="dragenter($event,index,item)"
				@dragover="dragover($event,index,item)"
				@dragleave="dragleave($event,index,item)"
				@drop="drop"
			>
				<div v-if="mask" class="__mask" >
					<span :style="index==0?'opacity: 0;cursor: default':''" @click="handleLeft(index)" >&#10094;</span>
					<span @click="handleRemove(index)"> &#10006;</span>
					<span :style="index==list.length-1?'opacity: 0;cursor: default':''" @click="handleRight(index)">&#10095;</span>

				</div>
				<item :data="item" :index="index" :render="renderRow" />
				
				
			</div>
				
		</transition-group>
		
	</div>
</template>
<script>
import CreateCustomer from "../create-customer/index";

const Item = CreateCustomer({
	data: Object,
	index: Number
});
const emptyFunc = function () { };
const defaultRenderRow = function (h, { data, index }) {
	return (
		 <div key={data.key} style={'background:' + data.color + ';width:100px;height:100px;margin:10px'}/>
	);
};

export default {
	name: "vc-p-sort-list",
	components: {
		item: Item
	},
	props: {
		renderRow: {
			type: Function,
			default: defaultRenderRow
		},
		dataSource: {
			type: Array,
			default: () => [
				{ color: "red", key: "1" },
				{ color: "blue", key: "2" },
				{ color: "yellow", key: "3" },
				{ color: "black", key: "4" }
			]
		},
		display: {
			type: String,
			default: 'inline-block'
		},
		mask: {
			type: Boolean,
			default: true
		},
		keyName: {
			type: [String, Number],
			default: 'key'
		}
	},
	data() {
		return {
			list: this.dataSource,
			draggingIndex: -1,
			overIndex: -1,
		};
	},
	computed: {

	},
	methods: {
		dragstart(event, index, item) {
			this.draggingIndex = index;
		},
		dragend(event, index, item) {
			if (this.draggingIndex >= 0 && this.overIndex >= 0 && this.draggingIndex !== this.overIndex) {
				this.$emit("move", this.draggingIndex, this.overIndex);
				const tempItem = this.list[this.draggingIndex];
				this.list.splice(this.draggingIndex, 1);
				this.list.splice(this.overIndex, 0, tempItem);
			}
			this.draggingIndex = -1;
			this.overIndex = -1;
		},
		drag(event, index, item) {

		},
		dragenter(event, index, item) {
			event.preventDefault();
			this.overIndex = index;
		},
		dragover(event, index, item) {
			event.preventDefault();
			this.overIndex = index;
		},
		dragleave(event, index, item) {
			event.preventDefault();
			event.stopPropagation();
			this.overIndex = -1;
		},
		drop(event, index, item) {
			event.preventDefault();
		},
		handleLeft(index) {
			if (index === 0) return;
			this.$emit("move", index, index - 1);
			const _list = [...this.list];
			const temp = _list[index];
			_list[index] = _list[index - 1];
			_list[index - 1] = temp;
			this.list = _list;
		},
		handleRight(index) {
			index++;
			if (index === this.list.length) return;
			this.$emit("move", index - 1, index);
			const _list = [...this.list];
			const temp = _list[index];
			_list[index] = _list[index - 1];
			_list[index - 1] = temp;
			this.list = _list;
		},
		handleRemove(index) {
			this.$emit("remove", index);
			this.list.splice(index, 1);
		}
	}
};
</script>
<style lang="scss" scoped>
.vc-p-sort-list{
	.__item{
		transition: transform 0.5s;
		position: relative;
	}
	.__mask{
		
			background: rgba(100,100,100,0.5);
			width: 100%;
			height: 100%;
			position: absolute;
			display: flex;
			justify-content: space-around;
			align-items: center;
			> span{
				cursor: pointer;
				font-size: 18px;
				color: white
			}
			&:hover{
				opacity: 1;
			}
			opacity: 0;
			transition: opacity 0.3s ease;
		
	}
}
</style>
