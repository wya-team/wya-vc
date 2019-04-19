import { Storage } from '@wya/utils';
import { VcError, VcInstance } from '../vc/index';

let svgReg = /.*<svg>(.*)<\/svg>.*/g;
let basicReg = /.*id="icon-([^"]+).*viewBox="([^"]+)(.*)/g;
let symbolReg = /<symbol.*?<\/symbol>/gi;
let pathReg = /<path.*?<\/path>/gi;
let dReg = /.*d="([^"]+).*/g;
let fillReg = /.*fill="([^"]+).*/g;

let basicUrl = '//at.alicdn.com/t/font_1119857_sefkugvmz3o.js';
let prefix = '@wya/vc-icon:';

class Manager {
	constructor(basicUrl) {
		this.icons = {};
		this.injects = [];

		this.events = {};
		/**
		 * 初始化加载
		 */
		this.basicStatus = this.load(basicUrl);
	}

	/**
	 * TODO1: 换成@wya/http
	 * TODO2: 删除老的缓存
	 */
	load(url) {
		return new Promise(async (resolve, reject) => {
			try {
				if (/.js$/.test(url) && !this.injects.includes(url)) { // 避免重复加载
					let icons = Storage.get(`${prefix}${url}`);
					
					if (!icons) {
						let res = await fetch(url);
						this.injects.push(url);

						// 等待解析
						let svgStr = await res.text();
						icons = await this.parser(svgStr, url);
						Storage.set(`${prefix}${url}`, icons);
					}
					// 重构图标
					this.icons = {
						...this.icons,
						...icons,
					};
					// 执行
					Object.entries(this.events).forEach(([type, fns]) => {
						if (this.icons[type] && fns) {
							fns.forEach(fn => fn());
							this.events[type] = null;
						}
					});

					// 结束
					resolve();
				}
			} catch (e) {
				reject();
				throw new VcError('icon', e);
			}
		});
	}

	/**
	 * TODO: 启用webwork处理 or fiber处理
	 */
	parser(svgStr, url) {
		return new Promise((resolve, reject) => {
			let icons = {};
			try {
				setTimeout(() => {
					VcInstance.config.debug && console.time(url);
					svgStr.replace(svgReg, '$1').match(symbolReg).forEach( 
						i => i.replace(basicReg, (_, $1, $2, $3) => {
							icons[`${$1}`] = {
								viewBox: $2,
								path: $3.match(pathReg).map(j => ({
									d: j.replace(dReg, '$1'),
									fill: fillReg.test($3) ? j.replace(fillReg, '$1') : ''
								}))
							};
						})
					);
					VcInstance.config.debug && console.timeEnd(url);
					resolve(icons);
				}, 0);
			} catch (e) {
				reject();
				throw new VcError('icon', e);
			}
		});
	}

	on(type, fn) {
		if (typeof type !== 'string') return this;

		this.events[type] = this.events[type] || [];

		if (this.events[type].length > 100) {
			this.events[type] = null;
			throw new VcError('icon', `${type}不存在该图标，不要重复注册`);
		}

		this.events[type].push(fn); 

		return this;
	}

	/**
	 * 必传
	 */
	off(type, fn) {
		if (typeof type !== 'string' || typeof fn !== 'function') return this;

		this.events[type] = this.events[type].filter((i) => i != fn);

		return this;
	}
  
}

export default new Manager(basicUrl);
