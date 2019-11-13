<template>
	<div class="vc-color-picker-alpha">
		<div :style="{ background: background }" class="vc-color-picker-alpha__bar" />
		<div class="vc-color-picker-alpha__thumb"/>
	</div>
</template>

<script>

export default {
	name: 'vc-color-picker-alpha',
	props: {
	},
	data() {
		return {
			background: null,
		};
	},
	computed: {
	},
	mounted() {
		this.update();
	},
	methods: {
		getBackground() {
			let r = 19;
			let g = 206;
			let b = 102;
			return `linear-gradient(to right, rgba(${r}, ${g}, ${b}, 0) 0%, rgba(${r}, ${g}, ${b}, 1) 100%)`;
		},
		update() {
			this.background = this.getBackground();
		}
	},
};
</script>

<style lang="scss">
@import '../style/index.scss';
$block: vc-color-picker-alpha;

@include block($block) {
    position: relative;
    box-sizing: border-box;
    width: 240px;
    height: 12px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==);
    @include element(bar) {
        position: relative;
        height: 100%;
    }
}
</style>
