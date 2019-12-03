<template>
	<div class="vc-color-picker-alpha">
		<div 
			ref="bar"
			:style="{ background: background }" 
			class="vc-color-picker-alpha__bar" />
		<div 
			ref="thumb" 
			:style="{
				top: 0,
				left: `${thumbLeft}px`
			}"
			class="vc-color-picker-alpha__thumb"/>
	</div>
</template>

<script>
import draggable from './draggable';

export default {
	name: 'vc-color-picker-alpha',
	props: {
		color: {
			required: true,
			type: Object
		},
	},
	data() {
		return {
			background: null,
			thumbLeft: 0,
		};
	},
	watch: {
		'color._alpha': function () {
			this.update();
		},
		'color.value': function () {
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
		handleDrag(event) {
			const rect = this.$el.getBoundingClientRect();
			const { thumb } = this.$refs;
			let left = event.clientX - rect.left;
			
			left = Math.min(left, rect.width);
			left = Math.max(left, 0);
			const alpha = Math.round((left) / (rect.width) * 100);

			this.color.set('alpha', alpha);
		},
		getBackground() {
			const { r, g, b } = this.color.toRgb();
			return `linear-gradient(to right, rgba(${r}, ${g}, ${b}, 0) 0%, rgba(${r}, ${g}, ${b}, 1) 100%)`;
		},
		update() {
			if (!this.$el) return;

			const alpha = this.color.get('alpha');
			this.thumbLeft = Math.round((alpha / 100) * (this.$el.offsetWidth - this.$refs.thumb.offsetWidth));
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
    height: 10px;
	margin-top: 8px;
	cursor: pointer;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==);
    @include element(bar) {
        position: relative;
        height: 100%;
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
