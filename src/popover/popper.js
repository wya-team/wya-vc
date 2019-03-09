/**
 * 弹层位置  mixin
 */
export default {
	methods: {
		getPopupStyle(rect) {
			switch (this.fitPlacement) {
				case 'bottom':
					this.popStyle = {
						top: `${rect.y + rect.height}px`,
						left: `${rect.x + (rect.width - this.popper.offsetWidth) / 2}px`
					};
					break;
				case 'bottom-left':
					this.popStyle = {
						top: `${rect.y + rect.height}px`,
						left: `${rect.x}px`
					};
					break;
				case 'bottom-right':
					this.popStyle = {
						top: `${rect.y + rect.height}px`,
						left: `${rect.x + rect.width - this.popper.offsetWidth}px`
					};
					break;
				case 'top':
					this.popStyle = {
						top: `${rect.y - this.popper.offsetHeight}px`,
						left: `${rect.x + (rect.width - this.popper.offsetWidth) / 2}px`
					};
					break;
				case 'top-left':
					this.popStyle = {
						top: `${rect.y - this.popper.offsetHeight}px`,
						left: `${rect.x}px`
					};
					break;
				case 'top-right':
					this.popStyle = {
						top: `${rect.y - this.popper.offsetHeight}px`,
						left: `${rect.x + rect.width - this.popper.offsetWidth}px`
					};
					break;
				case 'right':
					this.popStyle = {
						top: `${rect.y + (rect.height - this.popper.offsetHeight) / 2}px`,
						left: `${rect.x + rect.width}px`
					};
					break;
				case 'right-top':
					this.popStyle = {
						top: `${rect.y}px`,
						left: `${rect.x + rect.width}px`
					};
					break;
				case 'right-bottom':
					this.popStyle = {
						top: `${rect.y + rect.height - this.popper.offsetHeight}px`,
						left: `${rect.x + rect.width}px`
					};
					break;
				case 'left':
					this.popStyle = {
						top: `${rect.y + (rect.height - this.popper.offsetHeight) / 2}px`,
						left: `${rect.x - this.popper.offsetWidth}px`
					};
					break;
				case 'left-top':
					this.popStyle = {
						top: `${rect.y}px`,
						left: `${rect.x - this.popper.offsetWidth}px`
					};
					break;
				case 'left-bottom':
					this.popStyle = {
						top: `${rect.y + rect.height - this.popper.offsetHeight}px`,
						left: `${rect.x - this.popper.offsetWidth}px`
					};
					break;
				default:
					break;
			}
		}
	}
};