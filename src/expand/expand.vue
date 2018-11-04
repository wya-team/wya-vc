<template>
	<transition
		v-show="isActive" 
		@before-enter="beforeEnter" 
		@enter="enter" 
		@after-enter="afterEnter" 
		@before-leave="beforeLeave" 
		@leave="leave" 
		@after-leave="afterLeave"
	>
		<div v-show="isActive">
			<slot />
		</div>
	</transition>
</template>

<script>

export default {
	name: "vc-expand",
	model: {
		prop: 'show',
		event: 'change'
	},
	props: {
		show: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			isActive: this.show
		};
	},
	computed: {
		
	},
	methods: {
		// 需要额外调整，使用transition中的name
		beforeEnter(el) {
			el.className += ' vc-expand';
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
			el.className = el.className.replace(' vc-expand', '');
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
				el.className += ' vc-expand';
				el.style.height = 0;
			}
		},
		afterLeave(el) {
			el.className = el.className.replace(' vc-expand', '');
			el.style.height = '';
			el.style.overflow = el.dataset.oldOverflow;
		},

		/**
		 * 外部调用
		 */
		toggle() {
			this.isActive = !this.isActive;
			this.$emit('change', this.isActive);
		}
	}
};
</script>
<style>
.vc-expand {
	transition: height .2s ease-in-out
}
</style>