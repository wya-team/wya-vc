import { cloneDeep } from 'lodash';

class SourceManager {
	/**
	 * 级联数据管理
	 * @param {*} baseData 初始级联数据
	 * @param {*} values 初始选中的values
	 */
	constructor(baseData = [], values = [], opts = {}) {
		
		this.defaultOpts = {
			nextKey: 'children',
			hasNextKey: 'hasChildren'
		};
		this.opts = {
			...this.defaultOpts,
			...opts
		};

		this.source = baseData;

		// 真正给外界的数据，如果没有调用updateReal，操作和更新的都是temp里的数据
		this.realvalues = values;
		this.selectedData = {};
		
		// 保存临时操作的数据
		this.temp = {
			values: [...values],
			selectedData: {}
		};
		
		this.readyFns = [];

		const {
			/**
			 * 下级数据加载function
			 */
			loadNext, 
			/**
			 * Function
			 * 判断是否还有下级
			 * return true | false
			 */
			hasNext,
			/**
			 * 自定义的标识是否还有下级数组的key名
			 */
			hasNextKey,
			/**
			 * 下级数据的key名
			 */
			nextKey
		} = this.opts;

		this.loading = false;

		this.loadNext = loadNext;
		this.hasNext = hasNext;
		this.hasNextKey = hasNextKey;
		this.nextKey = nextKey;

		this.init();

	}

	/**
	 * 初始化
	 */
	async init() {
		
		const listToLoad = this.filterValues(this.temp.values, this.source);

		listToLoad.length && await this.loadSource(listToLoad, this.temp.values);

		this.selectedData = this.getSelectedData(this.temp.values, this.source);
		this.temp.selectedData = cloneDeep(this.selectedData);
		
		this.isReady = true;
		this.readyFns.length && this.readyFns.forEach(it => it());

	}

	ready(cb) {
		this.readyFns.push(cb);
	}

	/**
	 * 只是根据选中的数据处理source，并没有更新真实数据
	 * @param {Array} values 选中的数据
	 */
	async updateTemp(values) {
		this.temp.values = [...values];
		this.temp.selectedData = this.getSelectedData(this.temp.values, this.source);

		const listToLoad = this.filterValues(this.temp.values, this.source);
		listToLoad.length && await this.loadSource(listToLoad, [...values]);

		this.temp.selectedData = this.getSelectedData(this.temp.values, this.source);

		return Promise.resolve();
	}

	/**
	 * 调用该方法更新真实数据
	 */
	updateReal() {
		this.realvalues = [...this.temp.values];

		this.selectedData = cloneDeep(this.temp.selectedData);
	}

	/**
	 * 把dataSource中没有对应数据的values过滤出来，去加载
	 * @param {Array} values 
	 * @param {*} dataSource 
	 */
	filterValues(values, dataSource) {
		const list = [];

		values.reduce((pre, cur, index) => {
			if (!pre.length) {
				list.push(cur);
				return pre;
			}
			const target = pre.find(it => it.value === cur);

			if (target && target.children && target.children.length) {
				return target.children;

			} else if ((this.hasNext && this.hasNext(target)) || target[this.hasNextKey]) {
				list.push(cur);

				return [];
			}
			return [];
		}, dataSource);
		console.log(list, 'list to load');

		return list;
	}

	/**
	 * 加载source
	 * @param {Array} listToLoad 需要去加载它子级数据的values，如杭州330100加载下级的区数据
	 * @param {Array} wholeValues 全部选中的数据
	 */
	loadSource(listToLoad, wholeValues) {

		// 当用于加载最后一个的时候lastSync为true
		const lastSync = listToLoad.length > 1;
		const list = (lastSync ? listToLoad.slice(0, -1) : listToLoad).map(it => this.loadNext(it));

		return new Promise((resolve, reject) => {

			this.loading = true;

			Promise.all(list)
				.then(async res => {
					
					let i = 0;
					
					// 把加载完成的数据插入到source中
					wholeValues.reduce((pre, cur) => {
						const target = pre.find(it => it.value === cur);

						if (cur === listToLoad[i]) {
							target[this.nextKey] = res[i];
							i++;
						}
						return target[this.nextKey];

					}, this.source);

					if (lastSync) {
						const lastOne = res[res.length - 1].find(it => it.value === listToLoad[listToLoad.length - 1]);
						const hasChildren = this.checkNext(lastOne);
						
						if (hasChildren) {
							try {
								await this.loadSource([lastOne.value], wholeValues);
								this.loading = false;
								resolve();
							} catch (error) {
								console.log(error);
								this.loading = false;
								reject();
							}
						} else {
							this.loading = false;
							resolve();
						}
						
					} else {
						this.loading = false;
						resolve();
					}
				})
				.catch(err => {
					this.loading = false;
					console.log(err, 'err');
					reject();
				});
		});
	}

	/**
	 * 检查是否还有下级
	 * @param {*} it 
	 */
	checkNext(it) {
		if (it.children && it.children.length) return true;

		return (this.hasNext && this.hasNext(it)) || it[this.hasNextKey];
	}

	getSelectedData(values = [], source = []) {
		const data = [];
		const label = [];
		values.reduce((pre, cur) => {
			const target = pre.find(it => it.value === cur);
			data.push(target);
			label.push(target.label);
			
			return target.children;
		}, source);

		return {
			data,
			label,
			value: values
		};
	}
}

export default SourceManager;