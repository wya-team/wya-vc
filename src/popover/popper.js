/**
 * 弹层位置  mixin
 */
const EXTRA_DISTANCE = 4; // 额外的距离
const HALF_ARROW = 12.73 / 2; // 箭头一半的高度
export default {
	methods: {
		getPopupStyle(rect) {
			switch (this.fitPos) {
				case 'bottom':
					this.wrapperStyle = {
						top: `${rect.y + rect.height + EXTRA_DISTANCE}px`,
						left: `${rect.x + (rect.width - this.$el.offsetWidth) / 2}px`,
						transformOrigin: `${this.$el.offsetWidth / 2}px 0px`
					};
					break;
				case 'bottom-left':
					this.wrapperStyle = {
						top: `${rect.y + rect.height + EXTRA_DISTANCE}px`,
						left: `${rect.x}px`,
						transformOrigin: `16px 0px`
					};
					break;
				case 'bottom-right':
					this.wrapperStyle = {
						top: `${rect.y + rect.height + EXTRA_DISTANCE}px`,
						left: `${rect.x + rect.width - this.$el.offsetWidth}px`,
						transformOrigin: `${this.$el.offsetWidth - 16}px 0px`
					};
					break;
				case 'top':
					this.wrapperStyle = {
						top: `${rect.y - this.$el.offsetHeight - EXTRA_DISTANCE}px`,
						left: `${rect.x + (rect.width - this.$el.offsetWidth) / 2}px`,
						transformOrigin: `${this.$el.offsetWidth / 2}px 100%`
					};
					break;
				case 'top-left':
					this.wrapperStyle = {
						top: `${rect.y - this.$el.offsetHeight - EXTRA_DISTANCE}px`,
						left: `${rect.x}px`,
						transformOrigin: `16px 100%`
					};
					break;
				case 'top-right':
					this.wrapperStyle = {
						top: `${rect.y - this.$el.offsetHeight - EXTRA_DISTANCE}px`,
						left: `${rect.x + rect.width - this.$el.offsetWidth}px`,
						transformOrigin: `${this.$el.offsetWidth - 16}px 100%`
					};
					break;
				case 'right':
					this.wrapperStyle = {
						top: `${rect.y + (rect.height - this.$el.offsetHeight) / 2}px`,
						left: `${rect.x + rect.width + EXTRA_DISTANCE}px`,
						transformOrigin: `0px ${this.$el.offsetHeight / 2}px`
					};
					break;
				case 'right-top':
					this.wrapperStyle = {
						top: `${rect.y}px`,
						left: `${rect.x + rect.width + EXTRA_DISTANCE}px`,
						transformOrigin: `0px 12px`
					};
					this.arrowStyle = {
						top: `${this.triggerEl.offsetHeight / 2 - HALF_ARROW}px`
					};
					break;
				case 'right-bottom':
					this.wrapperStyle = {
						top: `${rect.y + rect.height - this.$el.offsetHeight}px`,
						left: `${rect.x + rect.width + EXTRA_DISTANCE}px`,
						transformOrigin: `0px ${this.$el.offsetHeight - 12}px`
					};
					this.arrowStyle = {
						bottom: `${this.triggerEl.offsetHeight / 2 - HALF_ARROW}px`
					};
					break;
				case 'left':
					this.wrapperStyle = {
						top: `${rect.y + (rect.height - this.$el.offsetHeight) / 2}px`,
						left: `${rect.x - this.$el.offsetWidth - EXTRA_DISTANCE}px`,
						transformOrigin: `100% ${this.$el.offsetHeight / 2}px`
					};
					break;
				case 'left-top':
					this.wrapperStyle = {
						top: `${rect.y}px`,
						left: `${rect.x - this.$el.offsetWidth - EXTRA_DISTANCE}px`,
						transformOrigin: `100% 12px`
					};
					this.arrowStyle = {
						top: `${this.triggerEl.offsetHeight / 2 - HALF_ARROW}px`
					};
					break;
				case 'left-bottom':
					this.wrapperStyle = {
						top: `${rect.y + rect.height - this.$el.offsetHeight}px`,
						left: `${rect.x - this.$el.offsetWidth - EXTRA_DISTANCE}px`,
						transformOrigin: `100% ${this.$el.offsetHeight - 12}px`
					};
					this.arrowStyle = {
						bottom: `${this.triggerEl.offsetHeight / 2 - HALF_ARROW}px`
					};
					break;
				default:
					break;
			}
		}
	}
};