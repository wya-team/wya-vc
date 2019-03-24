class Basic {
	/**
	 * 清理Portals类型组件
	 * @param  {str | array} cName 清理的组件名
	 * @param  {str | array} force 是否强制清理, cName 存在会变为true
	 */
	clean(cName, force = false) {
		try {
			// 清理对象 
			let target = [];
			if (cName) {
				if (typeof cName === 'string') {
					target = [cName];
				} else if (cName instanceof Array && cName.length > 0) {
					target = cName;
				}
				target = target.reduce((pre, cur) => { pre[cur] = ''; return pre; }, {});

				// 清理
				force = true;
			} else {
				target = this.APIS;
			}
			for (let i in target) {
				if (this.APIS[i] && (force === true || this.APIS[i].__AUTO_DESTORY__ === true)) {
					this.APIS[i].$emit('destory');
					delete this.APIS[i];
				}
			}
		} catch (e) {
			console.log(`[vc-instance]: ${e}`);
		}
		return this;
	}

	/**
	 * 清理全部
	 */
	cleanAll() {
		try {
			for (let i in this.APIS) {
				if (this.APIS[i]) {
					this.APIS[i].$emit('destory');
					delete this.APIS[i];
				}
			}
		} catch (e) {
			console.log(`[vc-instance]: ${e}`);
		}
		return this;
	}
}

/**
 * 仅用户共享属性
 */
Basic.prototype.APIS = {};

export default Basic;