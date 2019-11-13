<template>
	<div class="vc-color-picker-hue-slider">
		<div class="vc-color-picker-hue-slider__bar" />
		<div class="vc-color-picker-hue-slider__thumb"/>
	</div>
</template>

<script>

export default {
	name: 'vc-color-picker-panel',
	props: {
	},
	data() {
		return {
			
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
$block: vc-color-picker-hue-slider;

@include block($block) {
    width: 100%;
    height: 10px;
    margin-top: 8px;
    position: relative;
    @include element(bar) {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border-radius: 2px;
        background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
    }
    @include element(thumb) {
        position: absolute;
        top: 0;
        left: 100px;
        cursor: pointer;
        box-sizing: border-box;
        width: 4px;
        height: 100%;
        border-radius: 1px;
        background: #fff;
        border: 1px solid #f0f0f0;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
        z-index: 1;
    }
}
</style>
