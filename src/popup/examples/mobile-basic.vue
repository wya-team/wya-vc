<template>
	<div>
		<vcm-popup 
			v-for="(item, index) in placements" 
			v-model="visibles[index]" 
			:placement="item"
			:key="`popup__${item}`"
		>
			<vcm-form>
				<vcm-form-item>
					<vcm-input v-model="value" type="text" clearable />
				</vcm-form-item>
				<vcm-form-item>
					<vcm-input v-model="value" type="text" clearable />
				</vcm-form-item>
				<vcm-form-item>
					<vcm-input v-model="value" type="text" clearable />
				</vcm-form-item>
				<vcm-form-item>
					<vcm-input v-model="value" type="text" clearable />
				</vcm-form-item>
			</vcm-form>
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
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<div>2222</div>
	</div>
</template>
<script>
import { Device } from '@wya/utils';
import { Tip } from './tip/tip.vue';
import MPopup from '../index.m';
import MButton from '../../button/index.m';
import MInput from '../../input/index.m';
import MForm from '../../form/index.m';

export default {
	name: "vcm-popup-basic",
	components: {
		'vcm-popup': MPopup,
		'vcm-button': MButton,
		'vcm-input': MInput,
		'vcm-form': MForm,
		'vcm-form-item': MForm.Item,
	},
	data() {
		return {
			value: '',
			placements: ['top', 'bottom', 'center', 'left', 'right'],
			visibles: [false, false, false, false, false]
		};
	},
	computed: {

	},
	mounted() {
		this.visible = true;

		// hack for wechat, 测试碳层下输入框
		if (!Device.ios 
			|| !Device.wechat 
			|| !Device.wechatVersion >= '6.7.4'
		) return;

		let handleFn = (e) => {
			document.body.scrollTop = document.body.scrollTop + 0; // eslint-disable-line
			e.target.removeEventListener('blur', handleFn);
		};

		document.addEventListener('click', (e) => {
			let tag = e.target.nodeName.toLowerCase();
			if (!/^(input|textarea)$/.test(tag)) return;
			e.target.addEventListener('blur', handleFn);
		}, true);
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
