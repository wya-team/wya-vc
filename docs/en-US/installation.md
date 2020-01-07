## Alert

> en-US

### Basic

:::demo
```html
<template>
	<div class="v-installation-1">
		<div @click="handleClick">Test 1</div>
	</div>
</template>

<script>
export default {
	mounted() {
		console.log('mounted');
	},
	methods: {
		handleClick() {
			alert('click');
		}
	}
};
</script>
<style>
.v-installation-1 div {
	color: red;
};
</style>
```
:::

### Portal

:::demo
```html
<template>
	<div class="v-installation-2">
		<div @click="handleClick">Test 2</div>
	</div>
</template>

<script>
import { Portal } from '@wya/vc';

const wrapperComponent = {
	name: 'v-portal',
	mounted() {
		console.log('mounted');
	},
	methods: {
		handleClick() {
			alert('click');
		}
	}
};

export default wrapperComponent;
export const Editor = new Portal(wrapperComponent); 
</script>

<style>
.v-installation-2 div {
	color: yellow;
};
</style>
```
:::

##

header 1 | header 2
---|---
row 1 col 1 | row 1 col 2
row 2 col 1 | row 2 col 2

