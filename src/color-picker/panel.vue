<template>
	<div :style="{ background: background }" class="vc-color-picker-panel">
		<div class="vc-color-picker-panel__white"/>
		<div class="vc-color-picker-panel__black"/>
		<div
			:style="{
				top: `${cursorTop}px`,
				left: `${cursorLeft}px`
			}" 
			class="vc-color-picker-panel__cursor">
			<div/>
		</div>
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
			background: 'hsl(0, 100%, 50%)',
			cursorTop: 0,
			cursorLeft: 0,
		};
	},
	computed: {
		colorValue() {
			const hue = this.color.get('hue');
			const value = this.color.get('value');
			return { hue, value };
		}
	},
	watch: {
		colorValue() {
			this.update();
		}
	},
	mounted() {
		draggable(this.$el, {
			drag: event => {
				this.handleDrag(event);
			},
			end: event => {
				this.handleDrag(event);
			}
		});
		this.update();
	},
	methods: {
		update() {
			const saturation = this.color.get('saturation');
			const value = this.color.get('value');
			let { clientWidth, clientHeight } = this.$el;

			this.cursorLeft = saturation * clientWidth / 100;
			this.cursorTop = (100 - value) * clientHeight / 100;
			this.background = 'hsl(' + this.color.get('hue') + ', 100%, 50%)';
		},
		handleDrag(event) {
			const rect = this.$el.getBoundingClientRect();
			let left = event.clientX - rect.left;
			let top = event.clientY - rect.top;

			left = Math.max(0, left);
			left = Math.min(left, rect.width);
			top = Math.max(0, top);
			top = Math.min(top, rect.height);

			this.cursorLeft = left;
			this.cursorTop = top;
			this.color.set({
				saturation: left / rect.width * 100,
				value: 100 - top / rect.height * 100
			});
		}
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
	cursor: pointer;
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
	@include element(cursor) {
		position: absolute;
		div {
			width: 4px;
			height: 4px;
			box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0, 0, 0, 0.3), 0 0 1px 2px rgba(0, 0, 0, 0.4);
			border-radius: 50%;
			transform: translate(-2px, -2px);
		}
	}
}
</style>
