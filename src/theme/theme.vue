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
import { kebabCase } from 'lodash';
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

		/**
		 * 伪类、伪元素
		 * {
		 * 	':hover div': {
		 * 		color: 'main'
		 * 	}
		 * }
		 */
		pseudo: {
			type: [String, Object]
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
			const { pseudo } = this;

			if (!pseudo) return;

			let content = '';
			if (typeof pseudo === 'string') {
				content = pseudo;
			} else {
				Object.entries(pseudo).forEach(([key, val]) => {
					content += `.${this.themeId}${/^:/.test(key) ? '' : ':'}${key} { ${this.setCss(val)} }`;
				});
			}

			content && Load.cssCode(content, { id: this.themeId });
		},

		setCss(attrs) {
			if (!attrs || typeof attrs === 'string') return attrs;

			// 伪类、元素需要添加!important;
			let content = '';
			Object.entries(attrs).forEach(([key, val]) => {
				content += `${kebabCase(key)}: ${this.setVar(val)} !important;`;
			});

			return content;
		},

		setVar(name) {
			let its = VcInstance.config.Theme || {};
			return (its[name] || COLORS[name] || `var(--${name})`);
		}
	}
};
</script>