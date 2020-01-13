import { getComputedStyle } from '../utils';

const HIDDEN_TEXTAREA_STYLE = `
	min-height:0 !important;
	max-height:none !important;
	height:0 !important;
	visibility:hidden !important;
	overflow:hidden !important;
	position:absolute !important;
	z-index:-1000 !important;
	top:0 !important;
	right:0 !important
`;

const SIZING_STYLE = [
	'letter-spacing',
	'line-height',
	'padding-top',
	'padding-bottom',
	'font-family',
	'font-weight',
	'font-size',
	'text-rendering',
	'text-transform',
	'width',
	'text-indent',
	'padding-left',
	'padding-right',
	'border-width',
	'box-sizing'
];

let hiddenEl;

export const getComputedHeight = (options = {}) => {
	const { el, minRows = null, maxRows = null } = options;
	if (!hiddenEl) {
		hiddenEl = document.createElement('textarea');
		document.body.appendChild(hiddenEl);
	}

	// Fix wrap="off" issue
	// https://github.com/ant-design/ant-design/issues/6577
	el.getAttribute('wrap') 
		? hiddenEl.setAttribute('wrap', el.getAttribute('wrap'))
		: hiddenEl.removeAttribute('wrap');


	// Copy all CSS properties that have an impact on the height of the content in
	// the textbox
	let {
		paddingSize, borderSize,
		boxSizing, sizingStyle,
	} = getComputedStyle(el, SIZING_STYLE);

	// Need to have the overflow attribute to hide the scrollbar otherwise
	// text-lines will not calculated properly as the shadow will technically be
	// narrower for content
	hiddenEl.setAttribute('style', `${sizingStyle};${HIDDEN_TEXTAREA_STYLE}`);
	hiddenEl.value = el.value || el.placeholder || '';

	let minHeight = Number.MIN_SAFE_INTEGER;
	let maxHeight = Number.MAX_SAFE_INTEGER;
	let height = hiddenEl.scrollHeight;
	let overflowY;

	if (boxSizing === 'border-box') {
		// border-box: add border, since height = content + padding + border
		height += borderSize;
	} else if (boxSizing === 'content-box') {
		// remove padding, since height = content
		height -= paddingSize;
	}

	if (minRows !== null || maxRows !== null) {
		// measure height of a textarea with a single row
		hiddenEl.value = ' ';
		let singleRowHeight = hiddenEl.scrollHeight - paddingSize;
		if (minRows !== null) {
			minHeight = singleRowHeight * minRows;
			if (boxSizing === 'border-box') {
				minHeight = minHeight + paddingSize + borderSize;
			}
			height = Math.max(minHeight, height);
		}
		if (maxRows !== null) {
			maxHeight = singleRowHeight * maxRows;
			if (boxSizing === 'border-box') {
				maxHeight = maxHeight + paddingSize + borderSize;
			}
			overflowY = height > maxHeight ? '' : 'hidden';
			height = Math.min(maxHeight, height);
		}
	}
	// Remove scroll bar flash when autosize without maxRows
	if (!maxRows) {
		overflowY = 'hidden';
	}

	return {
		height: `${height}px`,
		minHeight: `${minHeight}px`,
		maxHeight: `${maxHeight}px`,
		overflowY
	};
};
