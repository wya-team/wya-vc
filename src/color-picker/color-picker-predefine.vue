<template>
	<div class="vc-color-picker-predefine">
		<div class="vc-color-picker-predefine__colors">
			<div 
				v-for="(item, index) in rgbaColors"
				:key="index"
				:class="{ 
					'is-selected': item.selected,
					'is-alpha': item._alpha < 100
				}"
				class="vc-color-picker-predefine__colors-selector"
				@click="handleSelect(index)">
				<div :style="{'background-color': item.value}" />
			</div>            
		</div>
	</div>
</template>

<script>
import Color from './color';

export default {
	name: 'vc-color-picker-predefine',
	props: {
		colors: {
		    type: Array,
		},
		color: {
			type: Object,
		    required: true
		}
	},
	data() {
		return {
			rgbaColors: [],
		};
	},
	watch: {
		'color.value': function () {
			this.update();
		},
		'colors': function () {
			this.update();
		}
	},
	created() {
		this.update();
	},
	methods: {
		update() {
			this.rgbaColors = this.formatColors(this.colors, this.color);
		},
		formatColors(colors, color) {
			return colors.map(value => {
				let c = new Color({
					enableAlpha: true,
					format: 'rgba'
				});
				c.fromString(value);
				c.selected = c.value === color.value;
				return c;
			});
		},
		handleSelect(index) {
			this.color.fromString(this.colors[index]);
		}
	},
};
</script>

<style lang="scss">
@import '../style/index.scss';
$block: vc-color-picker-predefine;

@include block($block) {
    display: flex;
    width: 240px;
    margin-top: 8px;
    @include element(colors) {
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        &-selector {
            width: 18px;
            height: 18px;
            margin: 0 0 6px 6px;
            cursor: pointer;
            div {
                height: 100%;
                border-radius: 2px;
            }
			&:nth-child(10n + 1) {
				margin-left: 3px;
			}
        }
		.is-selected {
			box-shadow: 0 0 2px 1px #409EFF;
		}
		.is-alpha {
			background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==);
		}
	}
}
</style>
