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
			<select v-if="transitionName === 'slide'" v-model="slideModeName">
				<option 
					v-for="item in slideModeOptions" 
					:key="item" 
					v-text="item" 
				/>
			</select>
			<select v-if="transitionName === 'scale'" v-model="scaleModeName">
				<option 
					v-for="item in scaleModeOptions" 
					:key="item" 
					v-text="item" 
				/>
			</select>
			<select v-if="transitionName === 'zoom'" v-model="zoomModeName">
				<option 
					v-for="item in zoomModeOptions" 
					:key="item" 
					v-text="item" 
				/>
			</select>
		</div>
		<div v-if="!isGroup">
			<component 
				:is="`vc-transition-${transitionName}`" 
				:mode="mode"
				:appear="true"
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
				:mode="mode"
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
			transitionName: 'slide',
			transitionOptions: [
				'fade',
				'scale',
				'slide',
				'zoom',
				'collapse'
			],
			slideModeName: 'left',
			slideModeOptions: ['left', 'right', 'down', 'up'],
			zoomModeName: 'x',
			zoomModeOptions: ['x', 'y', 'center'],

			scaleModeName: 'both',
			scaleModeOptions: ['both', 'part'],

			colors: Array.from({ length: 5 }, () => ({ id: count++ }))
		};
	},
	computed: {
		
		mode() {
			switch (this.transitionName) {
				case 'scale':
					return this.scaleModeName;
				case 'slide':
					return this.slideModeName;
				case 'zoom':
					return this.zoomModeName;
				default:
					return '';
			}
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
