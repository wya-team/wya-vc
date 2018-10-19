<template>
	<div>
		<vc-fragment>
			<div @click="handleClick">点我</div>
			<div>2</div>
			<div>3</div>
			<div>4</div>
			<div>5</div>
		</vc-fragment>
	</div>
</template>
<script>
import Fragment from '../fragment';

export default {
	name: 'vc-fragment-basic',
	components: {
		'vc-fragment': Fragment
	},
	methods: {
		handleClick() {
			alert('你点击了我');
		}
	}
};
</script>
