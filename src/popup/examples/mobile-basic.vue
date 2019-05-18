<template>
	<div>
		<vcm-popup 
			v-for="(item, index) in placements" 
			v-model="visibles[index]" 
			:placement="item"
			:key="`popup__${item}`"
		>
			{{ item }}
		</vcm-popup>
		
		<vcm-button 
			v-for="(item, index) in placements" 
			:placement="item"
			:key="`button__${item}`"
			@click="handleNormal(item, index)"
		>
			normal: {{ item }} {{ visibles[index] }}
		</vcm-button>
		
		<vcm-button 	
			v-for="(item, index) in placements" 
			:placement="item"
			:key="`portal__${item}`"
			@click="handlePortal(item, index)"
		>
			portal: {{ item }}
		</vcm-button>
	</div>
</template>
<script>
import { Tip } from './tip/tip.vue';
import MPopup from '../index.m';
import MButton from '../../button/index.m';

export default {
	name: "vcm-popup-basic",
	components: {
		'vcm-popup': MPopup,
		'vcm-button': MButton
	},
	data() {
		return {
			placements: ['top', 'bottom', 'center', 'left', 'right'],
			visibles: [false, false, false, false, false]
		};
	},
	computed: {

	},
	mounted() {
		this.visible = true;
	},
	methods: {
		handleNormal(placement, index) {
			this.visibles.splice(index, 0, !this.visibles[index]);
		},
		handlePortal(placement, index) {
			Tip.popup({
				param: {
					placement
				}
			}).then(() => {
				console.log('success');
			}).catch(() => {
				console.log('error');
			});
		},
	}
};

</script>
