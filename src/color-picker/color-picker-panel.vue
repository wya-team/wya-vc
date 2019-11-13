<template>
	<div :style="{ background: background }" class="vc-color-picker-panel">
		<div class="vc-color-picker-panel__white"/>
		<div class="vc-color-picker-panel__black"/>
		<div class="vc-color-picker-panel__cursor">
			<div/>
		</div>
	</div>
</template>

<script>

export default {
	name: 'vc-color-picker-panel',
	props: {
	},
	data() {
		return {
			background: 'rgb(19, 206, 102)',
		};
	},
	computed: {
	},
	methods: {
	},
};
</script>

<style lang="scss">
@import '../style/index.scss';
$block: vc-color-picker-panel;

@include block($block) {
    width: 240px;
    height: 180px;
    margin: 0 auto;
    box-sizing: initial;
    position: relative;
    &__white, &__black {
       cursor: pointer;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    &__white {
        background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0));
    }
    &__black {
        background: linear-gradient(to top, #000, rgba(0, 0, 0, 0));
    }
}
</style>
