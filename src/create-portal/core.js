import Vue from 'vue';
import { cloneDeep, getUid, eleInRegExp } from '../utils/index';
import { VcBasic, VcError } from '../vc/index';
import defaultOptions from './default-options';

class PortalCore extends VcBasic {
	constructor(registerOptions = {}, wrapper) {
		super();

		let { cName, ...globalOptions } = registerOptions;


		if (!wrapper) {
			throw new VcError('create-portal', '目标组件必传');
		}
		if (!cName && !wrapper.name) {
			throw new VcError('create-portal', 'cName 必传');
		}

		cName = cName || wrapper.name;

		this.waiting = false;

		this.wrapper = wrapper;

		// 与全局配置, 重新生成默认配置
		globalOptions.cName = cName;
		this.globalOptions = globalOptions;

		this.popup = ::this.popup;
	}

	_getDefaultOptions() {
		return {
			...defaultOptions, 
			store: this.config.store,
			router: this.config.router,
			...this.config.CreatePortal, 
			...this.globalOptions,
		};
	}

	/**
	 * 弹出项目，验证数据结构是否合法
	 * userOptions {
	 * 	store,
	 * 	router,
	 * 	getInstance,
	 * 	param: {
	 * 	}
	 * }
	 */
	popup(userOptions = {}) {
		if (typeof userOptions !== 'object') {
			userOptions = {};
		}
		return this._init({ 
			...this._getDefaultOptions(),
			...userOptions 
		});
	}

	_init(options) {
		const { onBefore, onSure, onClose, promise, ...rest } = options;

		return promise 
			? new Promise(async (resolve, reject) => {
				if (onBefore && !this.waiting) {
					try {
						this.waiting = true;
						let response = await onBefore({ ...options });
						this._render({ 
							options, 
							response,
							onSure: resolve,
							onClose: reject,
						});
					} catch (res) {
						this.waiting = false;
						reject(res);
					}
					
				} else {
					this._render({ 
						options, 
						onSure: resolve,
						onClose: reject,
					});
				}
			})
			: this._render({ 
				options, 
				onSure, 
				onClose 
			});
	}

	_createCallback(vm, options, callback) {

		const { leaveDelay } = options;

		return (res, opts = {}) => {
			
			setTimeout(() => vm && vm.$emit('destroy'), leaveDelay * 1000);

			callback && callback(res);
		};
	}

	_render({ options, response = {}, onSure, onClose }) {
		let { 
			el, 
			tag, 
			alive, // 再次调用，实例不销毁
			aliveRegExp, // 实例以外且该数组内的, 点击不销毁
			aliveKey,
			cName,
			leaveDelay,
			autoDestroy,
			getInstance, 
			onBefore, 
			store,
			router,
			parent,
			data,
			components,
			multiple,
			slots,
			...rest
		} = options;

		cName = multiple ? `${cName}__${getUid()}` : cName;

		let container = document.createElement(tag);
		let target = typeof el === 'string' ? document.querySelector(el || 'body') : el;
		
		// destory
		!alive && this.APIS[cName] && this.APIS[cName].$emit('destroy');

		let propsData = {
			...rest,
			data: response.data || data
		};

		// vm
		let vm;
		if (alive && this.APIS[cName]) {

			vm = this.APIS[cName];
			vm.$off(['destroy', 'close', 'sure']);

			for (let key in propsData) {
				vm[key] = propsData[key];
			}

			// update
			let fn = vm.update || vm.loadData;
			fn && fn(options);
			
		} else {
			const wrapper = cloneDeep(this.wrapper);
			const VueComponent = Vue.extend(wrapper);
			
			vm = new VueComponent({
				el: container,
				store, // vuex,
				router, // vue-router
				propsData,
				components: { 
					...wrapper.components, 
					...components 
				},
				...parent,
				mounted() {
					alive && document.addEventListener('click', this.handleExtra, true);
				},
				destroyed() {
					alive && document.removeEventListener('click', this.handleExtra, true);
				},
				methods: {
					handleExtra(e) {
						// close默认不传，用户可传递参数判断输入自己的触发的close
						try {
							let path = e.path || (e.composedPath && e.composedPath()) || [];
							if (
								!this.$el.contains(e.target) 
								&& !path.some(item => eleInRegExp(item, aliveRegExp))
							) {
								if (this.$children[0] && this.$children[0][aliveKey]) {
									this.$children[0][aliveKey] = false;
									setTimeout(() => this.$emit('close'), leaveDelay * 1000);
								} else {
									this.$emit('close');
								}
							}
						} catch (e) {
							throw new VcError('create-portal', e);
						}
						
					}
				}
			});
		}

		// slots 2.6.0+ 的slotx写法会同步更新
		vm.$slots = slots;

		// tag
		vm.__AUTO_DESTROY__ = autoDestroy;

		vm.$on('destroy', (res) => {
			vm.$destroy();
			// 主动卸载节点
			target.removeChild(vm.$el);
			delete this.APIS[cName];

			vm = null;
		});

		vm.$on('close', this._createCallback(vm, options, onClose));

		vm.$on('sure', this._createCallback(vm, options, onSure));

		// 回调vm实例
		getInstance && getInstance(vm);

		// 标记
		this.APIS[cName] = vm;

		// 插入	
		vm.$el.parentElement === null && target.appendChild(vm.$el);

		this.waiting = false;

		return vm;
	}
	
	destroy(target) {
		const { multiple, cName } = this._getDefaultOptions();
		target = target || cName;
		const instance = typeof target === 'object' 
			? target 
			: this.APIS[target];

		if (instance) {
			instance.$emit('destroy');
		} else if (multiple) {
			Object.keys(this.APIS).forEach(item => {
				if (item.includes(cName)) {
					this.APIS[item] && this.APIS[item].$emit('destroy');
				}
			});
		}
	}
}

export default PortalCore;