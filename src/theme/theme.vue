<template>
	<component 
		:is="tag"  
		:style="styles"
		:class="classes"
		v-bind="attrs"
		class="vc-theme"
	>
		<slot />
	</component>
</template>

<script>
import { Load, RegEx } from '@wya/utils';
import { getUid, isDataURL } from '../utils';
import { VcInstance } from '../vc/index';
import { COLORS } from './constant';

export default {
	name: 'vc-theme',
	props: {
		tag: {
			type: String,
			default: 'span'
		},
		color: {
			type: String,
		},
		borderColor: {
			type: String,
		},
		backgroundColor: {
			type: String,
		},
		backgroundSize: {
			type: String,
			default: 'cover'
		},
		backgroundImage: {
			type: String,
		},
		src: {
			type: String
		},

		// 目前只考虑作用background, 仅创建伪类，可以自行创建取代
		before: {
			type: [String, Object],
		},
		after: {
			type: [String, Object],
		}
	},
	computed: {
		styles() {
			const results = [
				'color', 
				'backgroundColor', 
				'borderColor'
			].reduce((pre, key) => {
				pre[key] = this[key] && (this.setVar(this[key]));
				return pre;
			}, {});

			const { backgroundImage } = this;

			if (backgroundImage) {
				results.backgroundImage = RegEx.URLScheme.test(backgroundImage) || isDataURL(backgroundImage)
					? `url(${this.backgroundImage})`
					: `url(${this.setVar(this.backgroundImage)})`;

				results.backgroundSize = this.backgroundSize;
			}

			return results;

		},
		classes() {
			return {
				[`${this.themeId}`]: true,
				'is-image': this.tag === 'img',
				'is-background-image': !!this.backgroundImage,
			};
		},
		attrs() {
			let its = VcInstance.config.Theme || {};
			if (this.tag === 'img' && this.src) {
				return {
					src: RegEx.URLScheme.test(this.src) || isDataURL(this.src)
						? this.src
						: its[this.src] || this.src
				};
			}
			return {};
		}
	},
	watch: {
		before: 'resetPseudo',
		after: 'resetPseudo',
	},
	beforeCreate() {
		this.themeId = getUid('theme');
	},
	mounted() {
		this.resetPseudo();
	},
	destroyed() {
		Load.removeCSSCode(this.themeId);
	},
	methods: {
		resetPseudo() {
			const { before, after } = this;
			let content = '';

			if (before) {
				content += `.${this.themeId}:before { background-color: ${this.setVar(before)} }`;
			}

			if (after) {
				content += `.${this.themeId}:after { background-color: ${this.setVar(after)} }`;
			}

			content && Load.cssCode(content, { id: this.themeId });
		},

		setVar(name) {
			let its = VcInstance.config.Theme || {};
			return (its[name] || COLORS[name] || `var(--${name})`);
		}
	}
};
</script>