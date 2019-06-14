/**
 * 不能直接在methods直接写broadcast，会造成this永远表示第一次调用的那个
 */
function broadcast(componentName, eventName, params) {
	this.$children.forEach(child => {
		let name = child.$options.componentName;

		if (name === componentName) {
			child.$emit(...[eventName].concat(params));
		} else {
			broadcast.apply(child, [componentName, eventName].concat([params]));
		}
	});
}
export default {
	methods: {
		dispatch(componentName, eventName, params) {
			let parent = this.$parent || this.$root;
			let name = parent.$options.name;
			
			while (parent && (!name || name !== componentName)) {
				parent = parent.$parent;

				if (parent) {
					name = parent.$options.name;
				}
			}
			if (parent) {
				/* eslint-disable prefer-spread */
				parent.$emit.apply(parent, [eventName].concat(params)); // 如果是数组，会被解构处理
			}
		},
		broadcast(componentName, eventName, params) {
			broadcast.call(this, componentName, eventName, params);
		}
	}
};
