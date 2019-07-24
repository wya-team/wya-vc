export default {
	tag: 'div', 
	el: 'body', 
	cName: null,
	alive: false, // 再次调用，实例不销毁
	multiple: false, // 多个实例共存
	promise: true,
	aliveRegExp: { className: /(vc-hack-alive|vc-hack-cp)/ },
	aliveKey: 'visible',
	leaveDelay: 0.3,
	autoDestroy: true,
	getInstance: null, 
	onBefore: null, 
	parent: {}, // 依赖注入使用 like store, router, Life cycle，methods, mixins, ....
	components: {}, // 可以动态注入组件
	data: null,
	// 不推荐使用
	$slots: {},
	$scopedSlots: {}
};