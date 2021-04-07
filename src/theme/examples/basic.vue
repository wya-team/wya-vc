<!-- 仅展示最基本的用法 -->
<template>
	<div style="padding: 20px">
		<vc-button 
			@click="handleChange"
		>
			当前主题：{{ current }}
		</vc-button>
		<vc-theme-image src="image-festival-primary" />
		<vc-theme>
			<vc-theme>
				文字颜色：不设置
			</vc-theme>
		</vc-theme>
		
		<vc-theme-view>
			<vc-theme-text>
				文字颜色：不设置
			</vc-theme-text>
		</vc-theme-view>

		<vc-theme-view 
			:pseudo="{
				before: {
					background: 'color-before',
				},
				':hover > span': {
					color: 'color-hover',
				}
			}"
			background-color="color-background" 
			border-color="color-border"
			class="v-theme__block"
		>
			<vc-theme-text color="color-primary">
				文字颜色：跟随主题
			</vc-theme-text>
		</vc-theme-view>
	</div>
</template>
<script>
import Theme from '..';
import Button from '../../button';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-theme': Theme,
		'vc-theme-view': Theme.View,
		'vc-theme-text': Theme.Text,
		'vc-theme-image': Theme.Image,
		'vc-button': Button,
	},

	data() {
		return {
			current: 'light',
		};
	},

	methods: {
		handleChange() {
			this.current = this.current === 'dark' 
				? "light"
				: "dark";

			document.body.setAttribute("data-theme", this.current);
		}
	}
};
</script>

<style lang="scss">
:root {
	--color-primary: #000;
	--color-border: red;
	--color-background: white;
	--color-before: green;
	--color-hover: pink;
}

[data-theme="dark"] {
	--color-primary: #fff;
	--color-border: blue;
	--color-background: #000;
	--color-before: yellow;
	--color-hover: orange;
}

.v-theme__block {
	display: inline-block; 
	padding: 10px 5px; 
	border-width: 2px; 
	border-style: solid;
	&:before {
		width: 100%;
		height: 5px;
		content: ' ';
		display: block;
	}
}
</style>
