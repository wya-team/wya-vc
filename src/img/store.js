import { Storage } from '@wya/utils';

class IMGStore {
	constructor() {
		this.map = Storage.get('@wya/vc-img:', { session: true }) || {};
	}

	add(src, opts = {}) {
		const { originW, originH } = opts;

		if (this.map[src] && originW && originH) return;

		this.map[src] = {
			originW,
			originH,
		};

		Storage.set('@wya/vc-img:', this.map, { session: true });
	}

	getSize(src, opts = {}) {
		const { clientW, clientH, style, wrapperW } = opts;

		/**
		 * 1. 不存在
		 * 2. 外部传入了宽高（做了特殊处理，促使高宽至少1）
		 */
		if (!this.map[src]) return {};

		const { originW, originH } = this.map[src];

		let scale;
		// 优先计算W
		if (style.width && clientW > 1) { // el只有width， 通常是纵向滚动
			return {
				w: clientW,
				h: clientW / originW * originH
			};
		} else if (style.height && clientH > 1) { // el只有height， 通常是横向滚动
			return {
				w: clientH / originH * originW,
				h: clientH,
			};
		} else if (wrapperW && !style.height && !style.width) { // el没有width和height， TODO: wrapperH的情况
			if (originW <= wrapperW) {
				return {
					w: originW,
					h: originH,
				};
			} else {
				return {
					w: wrapperW / originW * originW,
					h: wrapperW / originW * originH,
				};
			}
		}
	}
}

export default new IMGStore();