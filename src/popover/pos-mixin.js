import { VcError } from '../vc/index';

const EXTRA_DISTANCE = 4; // 额外的距离
const HALF_ARROW = 12.73 / 2; // 箭头一半的高度
export default {
	methods: {
		getRect({ portal, hasContainer, triggerEl, el }) {
			let rect;
			if (hasContainer) { // 基于传入的容器节点
				let elRect = triggerEl.getBoundingClientRect();
				let parentRect = el.parentElement.getBoundingClientRect();
				let y = elRect.y - parentRect.y;
				let x = elRect.x - parentRect.x;
				if (x < 0 || y < 0) {
					throw new VcError('popover', 'getPopupContainer选择节点应为容器元素');
				}
				rect = {
					y,
					x,
					height: elRect.height,
					width: elRect.width
				};
			} else if (!portal) { // 基于父节点
				rect = {
					y: 0,
					x: 0,
					height: triggerEl.offsetHeight,
					width: triggerEl.offsetWidth
				};
			} else {
				rect = triggerEl.getBoundingClientRect(); // 基于body
				rect.y = document.scrollingElement.scrollTop + rect.y;
			}

			return rect || {};
		},
		getFitPos({ rect, placement, triggerEl, el }) {
			// 目前判断是否可展示下是针对于整个页面，没有针对父容器,只与body进行比较
			let popupRect = triggerEl.getBoundingClientRect();

			let remanentW;
			let remanentH;

			let direction = placement.split('-');
			let rightDistance = window.innerWidth - popupRect.left; // 触发节点左侧距离浏览器右侧的距离
			let leftDistance = popupRect.right; // 触发节点右侧距离浏览器左侧的距离
			let rightSurplus = rightDistance - el.offsetWidth; // 右侧剩余的距离
			let leftSurplus = leftDistance - el.offsetWidth; // 左侧剩余的距离

			let bottomDistance = window.innerHeight - popupRect.top; // 触发节点顶部距离浏览器底部的距离
			let topDistance = popupRect.bottom; // 触发节点底部侧距离浏览器顶部的距离
			let bottomSurplus = bottomDistance - el.offsetHeight;
			let topSurplus = topDistance - el.offsetHeight;

			switch (direction[0]) {
				case 'left':
					if (popupRect.x - el.offsetWidth < 0) {
						placement = placement.replace('left', 'right');
					}
					placement = this.getYAssistFitPos({
						direction, popupRect, placement, bottomDistance, bottomSurplus, topSurplus, el
					});
					break;
				case 'right':
					remanentW = window.innerWidth - popupRect.x - popupRect.width - el.offsetWidth;
					if (remanentW < 0) {
						placement = placement.replace('right', 'left');
					}
					placement = this.getYAssistFitPos({
						direction, popupRect, placement, bottomDistance, bottomSurplus, topSurplus, el
					});
					break;
				case 'top':
					// 主轴方向的自适应
					if (popupRect.y - el.offsetHeight < 0) {
						placement = placement.replace('top', 'bottom');
					}
					placement = this.getXAssistFitPos({
						direction, popupRect, placement, rightDistance, leftSurplus, rightSurplus, el
					});
					break;
				case 'bottom':
					remanentH = window.innerHeight - popupRect.y - popupRect.height - el.offsetHeight;
					// 主轴方向的自适应
					if (remanentH < 0) {
						placement = placement.replace('bottom', 'top');
					}
					placement = this.getXAssistFitPos({
						direction, popupRect, placement, rightDistance, leftSurplus, rightSurplus, el
					});
					break;
				default:
					break;
			}

			return placement;
		},
		getYAssistFitPos({ direction, popupRect, placement, bottomDistance, bottomSurplus, topSurplus, el }) {
			// Y轴辅助方向上的自适应
			if (direction.length === 1) {
				if (popupRect.top + popupRect.height / 2 < el.offsetHeight / 2) {
					placement = `${placement}-top`;
				} else if (bottomDistance < el.offsetHeight / 2) {
					placement = `${placement}-bottom`;
				}
			} else if (direction[1] === 'top' && bottomSurplus < 0 && bottomSurplus < topSurplus) {
				placement = placement.replace('top', 'bottom');
			} else if (direction[1] === 'bottom' && topSurplus < 0 && topSurplus < bottomSurplus) {
				placement = placement.replace('bottom', 'top');
			}
			return placement;
		},
		getXAssistFitPos({ direction, popupRect, placement, rightDistance, leftSurplus, rightSurplus, el }) {
			// X轴辅助方向上的自适应
			if (direction.length === 1) {
				if (popupRect.left + popupRect.width / 2 < el.offsetWidth / 2) {
					placement = `${placement}-left`;
				} else if (rightDistance - popupRect.width / 2 < el.offsetWidth / 2) {
					placement = `${placement}-right`;
				}
			} else if (direction[1] === 'left' && rightSurplus < 0 && rightSurplus < leftSurplus) {
				placement = placement.replace('left', 'right');
			} else if (direction[1] === 'right' && leftSurplus < 0 && leftSurplus < rightSurplus) {
				placement = placement.replace('right', 'left');
			}
			return placement;
		},
		getPopupStyle({ rect, placement, triggerEl, el }) {
			let wrapperStyle;
			let arrowStyle;
			let popContainer = el.parentElement;
			let isWindow = popContainer === document.body;
			let scrollXWidth = isWindow ? window.scrollX : 0; // 横轴上滚动的距离

			switch (placement) {
				case 'bottom':
					wrapperStyle = {
						top: `${rect.y + rect.height + EXTRA_DISTANCE}px`,
						left: `${rect.x + (rect.width - el.offsetWidth) / 2}px`,
						transformOrigin: `${el.offsetWidth / 2}px 0px`
					};
					break;
				case 'bottom-left':
					wrapperStyle = {
						top: `${rect.y + rect.height + EXTRA_DISTANCE}px`,
						left: `${rect.x + scrollXWidth}px`,
						transformOrigin: `16px 0px`
					};
					break;
				case 'bottom-right':
					wrapperStyle = {
						top: `${rect.y + rect.height + EXTRA_DISTANCE}px`,
						left: `${rect.x + rect.width - el.offsetWidth + scrollXWidth}px`,
						transformOrigin: `${el.offsetWidth - 16}px 0px`
					};
					break;
				case 'top':
					wrapperStyle = {
						top: `${rect.y - el.offsetHeight - EXTRA_DISTANCE}px`,
						left: `${rect.x + (rect.width - el.offsetWidth) / 2}px`,
						transformOrigin: `${el.offsetWidth / 2}px 100%`
					};
					break;
				case 'top-left':
					wrapperStyle = {
						top: `${rect.y - el.offsetHeight - EXTRA_DISTANCE}px`,
						left: `${rect.x + scrollXWidth}px`,
						transformOrigin: `16px 100%`
					};
					break;
				case 'top-right':
					wrapperStyle = {
						top: `${rect.y - el.offsetHeight - EXTRA_DISTANCE}px`,
						left: `${rect.x + rect.width - el.offsetWidth + scrollXWidth}px`,
						transformOrigin: `${el.offsetWidth - 16}px 100%`
					};
					break;
				case 'right':
					wrapperStyle = {
						top: `${rect.y + (rect.height - el.offsetHeight) / 2}px`,
						left: `${rect.x + rect.width + EXTRA_DISTANCE}px`,
						transformOrigin: `0px ${el.offsetHeight / 2}px`
					};
					break;
				case 'right-top':
					wrapperStyle = {
						top: `${rect.y}px`,
						left: `${rect.x + rect.width + EXTRA_DISTANCE}px`,
						transformOrigin: `0px 12px`
					};
					arrowStyle = {
						top: `${triggerEl.offsetHeight / 2 - HALF_ARROW}px`
					};
					break;
				case 'right-bottom':
					wrapperStyle = {
						top: `${rect.y + rect.height - el.offsetHeight}px`,
						left: `${rect.x + rect.width + EXTRA_DISTANCE}px`,
						transformOrigin: `0px ${el.offsetHeight - 12}px`
					};
					arrowStyle = {
						bottom: `${triggerEl.offsetHeight / 2 - HALF_ARROW}px`
					};
					break;
				case 'left':
					wrapperStyle = {
						top: `${rect.y + (rect.height - el.offsetHeight) / 2}px`,
						left: `${rect.x - el.offsetWidth - EXTRA_DISTANCE}px`,
						transformOrigin: `100% ${el.offsetHeight / 2}px`
					};
					break;
				case 'left-top':
					wrapperStyle = {
						top: `${rect.y}px`,
						left: `${rect.x - el.offsetWidth - EXTRA_DISTANCE}px`,
						transformOrigin: `100% 12px`
					};
					arrowStyle = {
						top: `${triggerEl.offsetHeight / 2 - HALF_ARROW}px`
					};
					break;
				case 'left-bottom':
					wrapperStyle = {
						top: `${rect.y + rect.height - el.offsetHeight}px`,
						left: `${rect.x - el.offsetWidth - EXTRA_DISTANCE}px`,
						transformOrigin: `100% ${el.offsetHeight - 12}px`
					};
					arrowStyle = {
						bottom: `${triggerEl.offsetHeight / 2 - HALF_ARROW}px`
					};
					break;
				default:
					break;
			}
			return {
				wrapperStyle,
				arrowStyle
			};
		},
		/**
		 * 弹层【宽度】变化后的自适应，主要服务于Cascader等内容会变化的下拉框
		 */
		getTBWrapperResize({ placement, el }) {
			let direction = placement.split('-');

			let left = parseFloat(this.wrapperStyle.left);
			switch (direction[0]) {
				case 'top':
				case 'bottom':
					if (left + el.offsetWidth >= window.innerWidth) {
						this.wrapperStyle = {
							...this.wrapperStyle,
							left: `${window.innerWidth - el.offsetWidth}px`
						};
					} else {
						this.setPopupStyle();
					}
					break;
				default:
					break;
			}
		}
	}
};