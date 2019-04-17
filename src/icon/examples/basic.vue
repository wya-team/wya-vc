<template>
	<div>
		<h1>点击复制</h1>
		<h2 @click="handleClick">点我切换 prefix: {{ mobile ? 'vcm-' : 'vc-' }}</h2>
		<div class="vc-icon-basic">
			<span v-for="item in items" :key="item" >
				<vc-icon :type="item"/>
				<vc-copy 
					:value="`<vc${m}-icon type=&quot;${item}&quot; />`"
				>{{ item }}</vc-copy>
			</span>
		</div>
	</div>
</template>
<script>
import Icon from '..';
import { Storage } from '@wya/utils';
import Copy from '../../copy';
import IconManager from '../manager';

let mobile = !!(Storage.get('@wya/vc/demo/icon') || {}).status;

export default {
	name: "vc-icon-basic",
	components: {
		'vc-icon': Icon,
		'vc-copy': Copy
	},
	data() {
		return {
			items: [],
			path: '',
			svgString: '',
			mobile,
		};
	},
	computed: {
		m() {
			return this.mobile ? 'm' : '';
		}
	},
	mounted() {
		IconManager.ready(() => {
			this.items = Object.keys(IconManager.icons);
		});
		Promise.all([
			IconManager.load('//at.alicdn.com/t/font_1096960_wt7ajzwziwm.js'),
			IconManager.load('//at.alicdn.com/t/font_1096957_ljld7iua9l.js')
		]).then(() => {
			this.items = Object.keys(IconManager.icons);
		}).catch((e) => {
			console.log(e);
		});

	},
	methods: {
		handleClick() {
			this.mobile = !this.mobile;
			Storage.set('@wya/vc/demo/icon', { status: this.mobile });
		}
	}
};
</script>
<style>
input {
	border: 1px solid #666
}
.vc-icon-basic {
	display: flex;
	flex-wrap: wrap;
	span {
		width: 200px;
		padding: 20px;
		text-align: center;
	}
	i {
		font-size: 30px
	}
	svg {
		width: 1em;
		height: 1em;
		fill: currentColor;
		overflow: hidden;
	}
}
</style>
