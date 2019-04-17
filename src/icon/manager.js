import { VcError, VcInstance } from '../vc/index';

let svgReg = /.*<svg>(.*)<\/svg>.*/g;
let basicReg = /.*id="icon-([^"]+).*viewBox="([^"]+)(.*)/g;
let symbolReg = /<symbol.*?<\/symbol>/gi;
let pathReg = /<path.*?<\/path>/gi;
let dReg = /.*d="([^"]+).*/g;
let fillReg = /.*fill="([^"]+).*/g;

let basicUrl = '//at.alicdn.com/t/font_1119857_sefkugvmz3o.js';

class Manager {
	constructor(basicUrl) {
		this.icons = {};
		this.injects = [];

		this.readyFn = {};
		/**
		 * 初始化加载
		 */
		this.basicStatus = this.load(basicUrl);
	}

	/**
	 * TODO: 换成@wya/http
	 */
	load(url) {
		return new Promise(async (resolve, reject) => {
			try {
				if (/.js$/.test(url) && !this.injects.includes(url)) { // 避免重复加载
					let res = await fetch(url);
					this.injects.push(url);

					// 等待解析
					let svgStr = await res.text();
					await this.parser(svgStr, url);

					// 执行
					Object.entries(this.readyFn).forEach(([type, fns]) => {
						if (this.icons[type] && fns) {
							fns.forEach(fn => fn());
							this.readyFn[type] = null;
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
			try {
				setTimeout(() => {
					VcInstance.config.debug && console.time(url);
					svgStr.replace(svgReg, '$1').match(symbolReg).forEach( 
						i => i.replace(basicReg, (_, $1, $2, $3) => {
							this.icons[`${$1}`] = {
								viewBox: $2,
								path: $3.match(pathReg).map(j => ({
									d: j.replace(dReg, '$1'),
									fill: fillReg.test($3) ? j.replace(fillReg, '$1') : ''
								}))
							};
						})
					);
					VcInstance.config.debug && console.timeEnd(url);
					resolve();
				}, 0);
			} catch (e) {
				reject();
				throw new VcError('icon', e);
			}
		});
	}

	ready(type, fn) {
		if (typeof type !== 'string') return;

		this.readyFn[type] = this.readyFn[type] || [];

		if (this.readyFn[type].length > 100) {
			this.readyFn[type] = null;
			throw new VcError('icon', `${type}不存在该图标，不要重复注册`);
		}

		this.readyFn[type].push(fn); 
	}
  
}

export default new Manager(basicUrl);
