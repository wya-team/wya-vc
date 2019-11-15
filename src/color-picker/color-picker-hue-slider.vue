<template>
	<div class="vc-color-picker-hue-slider">
		<div 
			ref="bar" 
			class="vc-color-picker-hue-slider__bar"
			@click="handleClick" />
		<div
			ref="thumb"
			:style="{
				top: 0,
				left: `${thumbLeft}px`
			}" 
			class="vc-color-picker-hue-slider__thumb"/>
	</div>
</template>

<script>
import draggable from './draggable';

export default {
	name: 'vc-color-picker-panel',
	props: {
		color: {
			required: true,
			type: Object
		}
	},
	data() {
		return {
			thumbLeft: 0,
		};
	},
	computed: {
		hueValue() {
			return this.color.get('hue');
		}
	},
	watch: {
		hueValue() {
			this.update();
		}
	},
	mounted() {
		const { bar, thumb } = this.$refs;
		const dragConfig = {
			drag: event => {
				this.handleDrag(event);
			},
			end: event => {
				this.handleDrag(event);
			}
		};

		draggable(bar, dragConfig);
		draggable(thumb, dragConfig);
		this.update();
	},
	methods: {
		update() {
			const hue = this.color.get('hue');
			this.thumbLeft = Math.round(hue * (this.$el.offsetWidth - this.$refs.thumb.offsetWidth / 2) / 360);
		},
		handleClick(event) {
				
			const thumb = this.$refs.thumb;
			const target = event.target;

			if (target !== thumb) {
				this.handleDrag(event);
			}
		},
		handleDrag(event) {
			const { thumb } = this.$refs;
			const rect = this.$el.getBoundingClientRect();
			let left = event.clientX - rect.left;
			let hue;

			left = Math.min(left, rect.width - thumb.offsetWidth / 2);
			left = Math.max(thumb.offsetWidth / 2, left);
			hue = Math.round((left - thumb.offsetWidth / 2) / (rect.width - thumb.offsetWidth) * 360);

			this.color.set('hue', hue);
		}
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
	cursor: pointer;
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
