<template>
	<component 
		:is="componentType"
		:tag="tag"
		v-bind="$attrs"
		move-class="vc-transition-collapse--move"
		v-on="$listeners"
		@before-enter="handleBeforeEnter"
		@after-enter="handleAfterEnter"
		@enter="handleEnter"
		@before-leave="handleBeforeLeave"
		@leave="handleLeave"
		@after-leave="handleAfterLeave"
	>
		<slot />
	</component>
</template>
<script>
import basicMixin from './basic-mixin';

export default {
	name: 'vc-transition-collapse',
	mixins: [basicMixin],
	methods: {
		getTransitionStyle(duration = 0.3) {
			let style = `
				${duration}s height ease-in-out, 
				${duration}s padding-top ease-in-out, 
				${duration}s padding-bottom ease-in-out
			`;
			return style;
		},
		handleBeforeEnter(el) {
			let duration = this.duration.enter || this.duration;

			el.style.transition = this.getTransitionStyle(duration);
			if (!el.dataset) el.dataset = {};

			el.dataset.oldPaddingTop = el.style.paddingTop;
			el.dataset.oldPaddingBottom = el.style.paddingBottom;

			el.style.height = '0';
			el.style.paddingTop = 0;
			el.style.paddingBottom = 0;
			this.resetStyles(el);
		},

		handleEnter(el) {
			el.dataset.oldOverflow = el.style.overflow;
			if (el.scrollHeight !== 0) {
				el.style.height = el.scrollHeight + 'px';
				el.style.paddingTop = el.dataset.oldPaddingTop;
				el.style.paddingBottom = el.dataset.oldPaddingBottom;
			} else {
				el.style.height = '';
				el.style.paddingTop = el.dataset.oldPaddingTop;
				el.style.paddingBottom = el.dataset.oldPaddingBottom;
			}

			el.style.overflow = 'hidden';
		},

		handleAfterEnter(el) {
			// for safari: 删除，然后需要重置高度
			el.style.transition = '';
			el.style.height = '';
			el.style.overflow = el.dataset.oldOverflow;
		},

		handleBeforeLeave(el) {
			if (!el.dataset) el.dataset = {};
			el.dataset.oldPaddingTop = el.style.paddingTop;
			el.dataset.oldPaddingBottom = el.style.paddingBottom;
			el.dataset.oldOverflow = el.style.overflow;

			el.style.height = el.scrollHeight + 'px';
			el.style.overflow = 'hidden';
			this.resetStyles(el);
		},

		handleLeave(el) {
			let leaveDuration = this.duration.leave ? this.duration.leave : this.duration;
			if (el.scrollHeight !== 0) {
				/**
				 * for safari: 
				 * 在设置高度之后添加，否则它会突然跳到零高度
				 */
				el.style.transition = this.getTransitionStyle(leaveDuration);
				el.style.height = 0;
				el.style.paddingTop = 0;
				el.style.paddingBottom = 0;
			}
			/**
			 * for group
			 */
			this.resetAbsolute(el);
		},

		handleAfterLeave(el) {
			el.style.transition = '';
			el.style.height = '';
			el.style.overflow = el.dataset.oldOverflow;
			el.style.paddingTop = el.dataset.oldPaddingTop;
			el.style.paddingBottom = el.dataset.oldPaddingBottom;
		}
	}
};

</script>
<style lang="scss">
@import '../style/index.scss';

@include block(vc-transition) {
	@include element(collapse) {
		@include modifier(move) {
			transition: transform .3s ease-in-out;
		}
	}
}
</style>
