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
		itemClass: String
	},
	data() {
		return {
			isWechat: Device.wechat
		};
	},
	methods: {
		handleShow(e, index) {
			if (this.isWechat) {
				this.handleWechatPreview(index);
			} else {
				this.handlePSWPPreview(e, index);
			}
		},
		handleWechatPreview() {
			this.$wx && this.$wx.previewImage({
				current: this.dataSource[index], // 当前显示图片的http链接
				urls: this.dataSource // 需要预览的图片http链接列表
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