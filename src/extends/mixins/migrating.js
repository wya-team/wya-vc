import { kebabCase } from 'lodash';
import { VcError } from '../../vc/index';
/**
 * API 变迁使用
 * getMigratingConfig() {
 * 		return {
 * 			events: {
 * 				expand: 'expand 重命名为 expand-change'
 * 			}
 * 		};
 * 	}
 */

export default {
	mounted() {
		if (process.env.NODE_ENV === 'production') return;
		if (!this.$vnode) return;
		const { props = {}, events = {} } = this.getMigratingConfig();
		const { data, componentOptions } = this.$vnode;
		const definedProps = data.attrs || {};
		const definedEvents = componentOptions.listeners || {};

		for (let propName in definedProps) {
			propName = kebabCase(propName);
			if (props[propName]) {
				throw new VcError('migrating:props', `${this.$options.name} -> ${props[propName]}`);
			}
		}

		for (let eventName in definedEvents) {
			eventName = kebabCase(eventName);
			if (events[eventName]) {
				throw new VcError('migrating:event', `${this.$options.name} -> ${events[eventName]}`);
			}
		}
	},
	methods: {
		getMigratingConfig() {
			return {
				props: {},
				events: {}
			};
		}
	}
};
