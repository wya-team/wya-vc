<template>
	<div style="padding: 100px">
		<h3 v-if="!isGroup" @click="handleClick"> 点击触发: {{ visible }} </h3>
		<template v-else-if="isGroup">
			<h3 @click="handleAdd"> 添加: {{ colors.length }} </h3>
			<h3 @click="handleDel"> 删除: {{ colors.length }} </h3>
		</template>
		

		<h3 @click="handleGroup"> 切换为组合: {{ isGroup }} </h3>
		<div style="display: flex; align-items: center">
			<select v-model="transitionName">
				<option 
					v-for="item in transitionOptions" 
					:key="item" 
					v-text="item" 
				/>
			</select>
			<select v-if="transitionName === 'slide'" v-model="slideDirectionName">
				<option 
					v-for="item in slideDirectionOptions" 
					:key="item" 
					v-text="item" 
				/>
			</select>
			<select v-if="transitionName === 'zoom'" v-model="zoomDirectionName">
				<option 
					v-for="item in zoomDirectionOptions" 
					:key="item" 
					v-text="item" 
				/>
			</select>
		</div>
		<div v-if="!isGroup">
			<component 
				:is="`vc-transition-${transitionName}`" 
				:direction="direction"
			>
				<div v-show="visible" style="background: #f5f6f7">
					<p>test</p>
					<p>test</p>
					<p>test</p>
					<p>test</p>
					<p>test</p>
					<p>test</p>
					<p>test</p>
					<p>test</p>
					<p>test</p>
				</div>
			</component>
		</div>
		<div v-else>
			<component 
				:is="`vc-transition-${transitionName}`" 
				:direction="direction" 
				group 
				tag="div"
				style="display: flex; flex-wrap: wrap"
			>
				<div 
					v-for="(item, index) in colors" 
					:key="item.id" 
					:style="{ background: `#ff33${item.id}${item.id}` }"
					style="width: 48px; line-height: 4; color: #e6e6e6; margin: 10px"
				>
					{{ index }}: {{ item.id }}
				</div>
			</component>
		</div>
	</div>
</template>
<script>
import Transtion from '..';

let count = 0;
export default {
	name: "vc-transtion-basic",
	components: {
		'vc-transition-fade': Transtion.Fade,
		'vc-transition-scale': Transtion.Scale,
		'vc-transition-slide': Transtion.Slide,
		'vc-transition-zoom': Transtion.Zoom,
		'vc-transition-collapse': Transtion.Collapse
	},
	data() {
		return {
			visible: true,
			isGroup: false,
			transitionName: 'collapse',
			transitionOptions: [
				'fade',
				'scale',
				'slide',
				'zoom',
				'collapse'
			],
			slideDirectionName: 'left',
			slideDirectionOptions: ['left', 'right', 'down', 'up'],
			zoomDirectionName: 'x',
			zoomDirectionOptions: ['x', 'y', 'center'],

			colors: Array.from({ length: 5 }, () => ({ id: count++ }))
		};
	},
	computed: {
		direction() {
			return this.transitionName === 'zoom' 
				? this.zoomDirectionName 
				: this.slideDirectionName;
		}
	},
	methods: {
		handleClick() {
			this.visible = !this.visible;
		},
		handleGroup() {
			this.isGroup = !this.isGroup;
		},
		handleAdd() {
			this.colors.push({ id: count++ });
		},
		handleDel() {
			this.colors.splice(Math.floor(Math.random() * this.colors.length), 1);
		}
	}
};
</script>
