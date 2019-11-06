<!-- 开发使用的版本，如各种操作改变属性值 -->
<template>
	<div style="padding: 20px; display: flex; flex-direction: column-reverse;">
		<!-- 组件展示 -->
		<vc-tpl v-bind="attrs" v-on="hooks"/>
		<br>
		<!-- 控制区域 -->
		<div>
			<vc-button>test</vc-button>
			<br>
			<br>
		</div>
	</div>
</template>
<script>
import Tpl from '..';
import Button from '../../button';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-tpl': Tpl,
		'vc-button': Button
	},
	data() {
		return {
			attrs: {

			},
			hooks: {

			}
		};
	},
	computed: {
		
	},
	methods: {
	}
};
</script>
