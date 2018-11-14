<template>
	<component :is="tag">
		<div style="position: relative" @click="handleToggle">
			<slot />
			<slot :is-expend="isActive" name="icon" />
		</div>
		<transition
			@before-enter="beforeEnter" 
			@enter="enter" 
			@after-enter="afterEnter" 
			@before-leave="beforeLeave" 
			@leave="leave" 
			@after-leave="afterLeave" 
		>
			<div v-show="isActive">
				<slot name="content"/>
			</div>
		</transition>
	</component>
</template>
<script>
import Icon from '../icon/index';

export default {
	name: "vc-collapse-item",
	components: {
		'vc-icon': Icon
	},
	props: {
		tag: {
			type: String,
			default: 'div'
		},
		name: {
			type: String
		},
	},
	data() {
		return {
			index: 0,
			isActive: false
		};
	},
	computed: {
		
	},
	methods: {
		beforeEnter(el) {
			el.className += ' vc-collapse-transition';
			 if (!el.dataset) el.dataset = {};

			el.style.height = '0';
		},
		enter(el) {
			el.dataset.oldOverflow = el.style.overflow;
			if (el.scrollHeight !== 0) {
				el.style.height = el.scrollHeight + 'px';
			} else {
				el.style.height = '';
			}

			el.style.overflow = 'hidden';
		},
		afterEnter(el) {
			el.className = el.className.replace(' vc-collapse-transition', '');
			el.style.height = '';
			el.style.overflow = el.dataset.oldOverflow;
		},
		beforeLeave(el) {
			if (!el.dataset) el.dataset = {};
			el.dataset.oldOverflow = el.style.overflow;

			el.style.height = el.scrollHeight + 'px';
			el.style.overflow = 'hidden';
		},
		leave(el) {
			if (el.scrollHeight !== 0) {
				el.className += ' vc-collapse-transition';
				el.style.height = 0;
			}
		},
		afterLeave(el) {
			el.className = el.className.replace(' vc-collapse-transition', '');
			el.style.height = '';
			el.style.overflow = el.dataset.oldOverflow;
		},

		handleToggle() {
			this.$parent.handleToggle({
				name: this.name || this.index,
				isActive: this.isActive
			});
		}
	}
};
</script>
<style>
.vc-collapse-transition {
	transition: height .2s ease-in-out
}
</style>