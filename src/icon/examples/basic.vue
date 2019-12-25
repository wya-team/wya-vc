<template>
	<div>
		<h1>点击图标复制</h1>
		<h1 @click="handleShuffle">
			乱序测试: <vc-icon :type="items[0]" />
		</h1>
		<h2 @click="handleClick">
			点我切换 prefix: {{ mobile ? 'vcm-' : 'vc-' }}
		</h2>
		<div class="vc-icon-basic">
			<!-- index 仅用于乱序测试 -->
			<vc-clipboard v-for="(item, index) in items" :key="index" :value="`<vc${m}-icon type=&quot;${item}&quot; />`">
				<vc-icon :type="item" inherit />
				<p>{{ item }}</p>
			</vc-clipboard>
		</div>
	</div>
</template>
<script>
import { shuffle } from 'lodash';
import { Storage } from '@wya/utils';
import Icon from '..';
import Clipboard from '../../clipboard';
import IconManager from '../manager';

window.IconManager = IconManager;
let mobile = !!(Storage.get('@wya/vc/demo/icon') || {}).status;

export default {
	name: "vc-icon-basic",
	components: {
		'vc-icon': Icon,
		'vc-clipboard': Clipboard
	},
	data() {
		return {
			items: [],
			path: '',
			mobile,
		};
	},
	computed: {
		m() {
			return this.mobile ? 'm' : '';
		}
	},
	mounted() {
		Promise.all([
			IconManager.basicStatus,
			IconManager.load('//at.alicdn.com/t/font_1169912_ith92i2hims.js'),
			IconManager.load('//at.alicdn.com/t/font_1096960_8zo6tsnmj3p.js'),
			IconManager.load('//at.alicdn.com/t/font_1096957_cypkws8poed.js')
		]).then(() => {
			this.items = Object.keys(IconManager.icons);
			console.log(1);
		}).catch((e) => {
			console.log(e);
		});
	},
	methods: {
		handleClick() {
			this.mobile = !this.mobile;
			Storage.set('@wya/vc/demo/icon', { status: this.mobile });
		},
		handleShuffle() {
			this.items = shuffle(this.items);
		}
	}
};
</script>
<style>
.vc-icon-basic {
	display: flex;
	flex-wrap: wrap;
	div {
		width: 200px;
		padding: 20px;
		text-align: center;
		cursor: pointer;
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
