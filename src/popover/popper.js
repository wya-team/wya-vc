/**
 * 弹层位置  mixin
 */
const EXTRA_DISTANCE = 4; // 而外的距离
const HALF_ARROW = 12.73 / 2; // 箭头一般的高度
export default {
	methods: {
		getPopupStyle(rect) {
			switch (this.fitPlacement) {
				case 'bottom':
					this.popStyle = {
						top: `${rect.y + rect.height + EXTRA_DISTANCE}px`,
						left: `${rect.x + (rect.width - this.popper.offsetWidth) / 2}px`,
						transformOrigin: `${this.popper.offsetWidth / 2}px 0px`
					};
					break;
				case 'bottom-left':
					this.popStyle = {
						top: `${rect.y + rect.height + EXTRA_DISTANCE}px`,
						left: `${rect.x}px`,
						transformOrigin: `16px 0px`
					};
					break;
				case 'bottom-right':
					this.popStyle = {
						top: `${rect.y + rect.height + EXTRA_DISTANCE}px`,
						left: `${rect.x + rect.width - this.popper.offsetWidth}px`,
						transformOrigin: `${this.popper.offsetWidth - 16}px 0px`
					};
					break;
				case 'top':
					this.popStyle = {
						top: `${rect.y - this.popper.offsetHeight - EXTRA_DISTANCE}px`,
						left: `${rect.x + (rect.width - this.popper.offsetWidth) / 2}px`,
						transformOrigin: `${this.popper.offsetWidth / 2}px 100%`
					};
					break;
				case 'top-left':
					this.popStyle = {
						top: `${rect.y - this.popper.offsetHeight - EXTRA_DISTANCE}px`,
						left: `${rect.x}px`,
						transformOrigin: `16px 100%`
					};
					break;
				case 'top-right':
					this.popStyle = {
						top: `${rect.y - this.popper.offsetHeight - EXTRA_DISTANCE}px`,
						left: `${rect.x + rect.width - this.popper.offsetWidth}px`,
						transformOrigin: `${this.popper.offsetWidth - 16}px 100%`
					};
					break;
				case 'right':
					this.popStyle = {
						top: `${rect.y + (rect.height - this.popper.offsetHeight) / 2}px`,
						left: `${rect.x + rect.width + EXTRA_DISTANCE}px`,
						transformOrigin: `0px ${this.popper.offsetHeight / 2}px`
					};
					break;
				case 'right-top':
					this.popStyle = {
						top: `${rect.y}px`,
						left: `${rect.x + rect.width + EXTRA_DISTANCE}px`,
						transformOrigin: `0px 12px`
					};
					this.arrowStyle = {
						top: `${this.triggerElm.offsetHeight / 2 - HALF_ARROW}px`
					};
					break;
				case 'right-bottom':
					this.popStyle = {
						top: `${rect.y + rect.height - this.popper.offsetHeight}px`,
						left: `${rect.x + rect.width + EXTRA_DISTANCE}px`,
						transformOrigin: `0px ${this.popper.offsetHeight - 12}px`
					};
					this.arrowStyle = {
						bottom: `${this.triggerElm.offsetHeight / 2 - HALF_ARROW}px`
					};
					break;
				case 'left':
					this.popStyle = {
						top: `${rect.y + (rect.height - this.popper.offsetHeight) / 2}px`,
						left: `${rect.x - this.popper.offsetWidth - EXTRA_DISTANCE}px`,
						transformOrigin: `100% ${this.popper.offsetHeight / 2}px`
					};
					break;
				case 'left-top':
					this.popStyle = {
						top: `${rect.y}px`,
						left: `${rect.x - this.popper.offsetWidth - EXTRA_DISTANCE}px`,
						transformOrigin: `100% 12px`
					};
					this.arrowStyle = {
						top: `${this.triggerElm.offsetHeight / 2 - HALF_ARROW}px`
					};
					break;
				case 'left-bottom':
					this.popStyle = {
						top: `${rect.y + rect.height - this.popper.offsetHeight}px`,
						left: `${rect.x - this.popper.offsetWidth - EXTRA_DISTANCE}px`,
						transformOrigin: `100% ${this.popper.offsetHeight - 12}px`
					};
					this.arrowStyle = {
						bottom: `${this.triggerElm.offsetHeight / 2 - HALF_ARROW}px`
					};
					break;
				default:
					break;
			}
		}
	}
};