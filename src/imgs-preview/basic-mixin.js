/**
 * imgs-picker的核心js
 */
import { Device } from '@wya/utils';
import Core, { Func } from './core';
import Customer from '../customer/index';
import Icon from '../icon/index';

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
		itemClassName: String
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
			if (Device.wechat && this.$wx) {
				this.handleWechatPreview(index);
			} else {
				this.handlePSWPPreview(e, index);
			}
		},
		/**
		 * 确保已经注入到Vue.prototype.$wx
		 */
		handleWechatPreview(index) {
			this.$wx.previewImage({
				current: this.images[index].src, // 当前显示图片的http链接
				urls: this.images.map((item) => item.src) // 需要预览的图片http链接列表
			});
		},
		handlePSWPPreview(e, index) {
			const { id, dataSource, opts, events, getInstance } = this;
			let pos = {};
			try {
				const target = e.target; // 先得到pos, 否则getThumbBoundsFn再计划，target已变化
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