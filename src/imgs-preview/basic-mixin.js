/**
 * imgs-picker的核心js
 */
import { Device } from '@wya/utils';
import Core, { Func } from './core';
import Customer from '../customer/index';
import Icon from '../icon/index';
import { VcInstance } from '../vc/index';

export default {
	components: {
		'vc-customer': Customer,
		'vc-icon': Icon
	},
	filters: {
		getImage(item) {
			return typeof item === 'object' 
				? (item.thumbnail || item.msrc || item.src || item)
				: item;
		}
	},
	props: {
		...Core.props,
		itemClassName: String,
		enhancer: Function
	},
	data() {
		return {
		};
	},
	computed: {
		images() {
			return this.dataSource.map((item, index) => {
				if (typeof item === 'object') {
					return {
						...item
					};
				} else {
					return {
						src: item,
						thumbnail: item,
						title: `IMG_${index + 1}`
					};
				}
			});
		}
	},
	methods: {
		handleShow(e, index) {
			let { enhancer } = VcInstance.config.ImgsPreview || {};

			enhancer = this.enhancer || enhancer || (() => false);
			enhancer(index, this) || this.previewByPS(e, index);
		},
		previewByPS(e, index) {
			const { id, dataSource, opts, events, getInstance } = this;
			let pos = {};
			try {
				const target = e.target; // 先得到pos, 否则getThumbBoundsFn再计划，target已变化（比如弹窗transition的影响）
				const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
				const rect = target.getBoundingClientRect();

				pos = { x: rect.left, y: rect.top + pageYScroll, w: rect.width };

			} catch (e) {
				console.log(e);
			}

			this.$emit('open');
			Func.popup({
				id,
				dataSource,
				events,
				getInstance,
				opts: {
					...opts,
					index,
					history: false,
					getThumbBoundsFn: (index) => pos,
				},
				onSure: () => this.$emit('close'),
				onClose: () => this.$emit('close'),
			});
		}
	}
};