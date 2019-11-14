<template>
	<div class="vc-color-picker-predefine">
		<div class="vc-color-picker-predefine__colors">
			<div 
				v-for="(item, index) in rgbaColors"
				:key="colors[index]"
				:class="{ 'is-selected': item.selected }"
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
		    required: true
		},
		color: {
			type: Object,
		    required: true
		}
	},
	data() {
		return {
			rgbaColors: this.parseColors(this.colors, this.color)
		};
	},
	methods: {
		parseColors(colors, color) {
			console.log(colors.map(value => {
				const c = new Color();
				c.enableAlpha = true;
				c.format = 'rgba';
				c.fromString(value);
				c.selected = c.value === color.value;
				return c;
			}));
			return colors.map(value => {
				const c = new Color();
				c.enableAlpha = true;
				c.format = 'rgba';
				c.fromString(value);
				c.selected = c.value === color.value;
				return c;
			});
		},
		handleSelect() {
    
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
	}
}
</style>
