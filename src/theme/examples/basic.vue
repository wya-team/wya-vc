<!-- 仅展示最基本的用法 -->
<template>
	<div style="padding: 20px">
		<vc-button 
			@click="handleChange"
		>
			当前主题：{{ current }}
		</vc-button>

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
			background-color="background" 
			border-color="border"
			before="before"
			class="v-theme__block"
		>
			<vc-theme-text color="color">
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
    --color: #000;
    --border: red;
    --background: white;
    --before: green;
}

[data-theme="dark"] {
    --color: #fff;
    --border: blue;
    --background: #000;
    --before: yellow;
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
