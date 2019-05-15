import { VcError } from '../vc/index';

const EXTRA_DISTANCE = 4; // 额外的距离
const HALF_ARROW = 12.73 / 2; // 箭头一半的高度
export default {
	methods: {
		getRect({ portal, hasContainer, popupContainer, el }) {
			let rect;
			if (hasContainer) { // 基于传入的容器节点
				let elRect = popupContainer.getBoundingClientRect();
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
					height: popupContainer.offsetHeight,
					width: popupContainer.offsetWidth
				};
			} else {
				rect = popupContainer.getBoundingClientRect(); // 基于body
				rect.y = document.scrollingElement.scrollTop + rect.y;
			}

			return rect || {};
		},
		getFitPos({ rect, placement, popupContainer, el }) {
			// 目前判断是否可展示下是针对于整个页面，没有针对父容器
			let popupRect = popupContainer.getBoundingClientRect();

			let remanentW;
			let remanentH;

			switch (placement.match(/^(bottom|left|right|top|\S)/)[0]) {
				case 'left':
					if (popupRect.x - el.offsetWidth < 0) {
						placement = placement.replace('left', 'right');
					}
					break;
				case 'right':
					remanentW = window.innerWidth - popupRect.x - popupRect.width - el.offsetWidth;
					if (remanentW < 0) {
						placement = placement.replace('right', 'left');
					}
					break;
				case 'top':
					if (popupRect.y - el.offsetHeight < 0) {
						placement = placement.replace('top', 'bottom');
					}
					break;
				case 'bottom':
					remanentH = window.innerHeight - popupRect.y - popupRect.height - el.offsetHeight;
					if (remanentH < 0) {
						placement = placement.replace('bottom', 'top');
					}
					break;
				default:
					break;
			}

			return placement;
		},
		getPopupStyle({ rect, placement, popupContainer, el }) {
			let wrapperStyle;
			let arrowStyle;
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
						left: `${rect.x}px`,
						transformOrigin: `16px 0px`
					};
					break;
				case 'bottom-right':
					wrapperStyle = {
						top: `${rect.y + rect.height + EXTRA_DISTANCE}px`,
						left: `${rect.x + rect.width - el.offsetWidth}px`,
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
						left: `${rect.x}px`,
						transformOrigin: `16px 100%`
					};
					break;
				case 'top-right':
					wrapperStyle = {
						top: `${rect.y - el.offsetHeight - EXTRA_DISTANCE}px`,
						left: `${rect.x + rect.width - el.offsetWidth}px`,
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
						top: `${popupContainer.offsetHeight / 2 - HALF_ARROW}px`
					};
					break;
				case 'right-bottom':
					wrapperStyle = {
						top: `${rect.y + rect.height - el.offsetHeight}px`,
						left: `${rect.x + rect.width + EXTRA_DISTANCE}px`,
						transformOrigin: `0px ${el.offsetHeight - 12}px`
					};
					arrowStyle = {
						bottom: `${popupContainer.offsetHeight / 2 - HALF_ARROW}px`
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
						top: `${popupContainer.offsetHeight / 2 - HALF_ARROW}px`
					};
					break;
				case 'left-bottom':
					wrapperStyle = {
						top: `${rect.y + rect.height - el.offsetHeight}px`,
						left: `${rect.x - el.offsetWidth - EXTRA_DISTANCE}px`,
						transformOrigin: `100% ${el.offsetHeight - 12}px`
					};
					arrowStyle = {
						bottom: `${popupContainer.offsetHeight / 2 - HALF_ARROW}px`
					};
					break;
				default:
					break;
			}
			return {
				wrapperStyle,
				arrowStyle
			};
		}
	}
};