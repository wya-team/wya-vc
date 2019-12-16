import { $ } from '@wya/utils';
import { getComputedStyle } from '../utils';

const HIDDEN_TEXT_STYLE = `
	position: absolute!important;
	word-break: break-all!important;
	overflow: auto!important;
	opacity: 0!important;
	z-index: -1000!important;
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
	// 'text-indent', // 需要额外计算
	'padding-left',
	'padding-right',
	'border-width',
	'box-sizing'
];

let hiddenEl;

export const getFitIndex = (options = {}) => {
	const { el, lineHeight, line, value, suffix, indent } = options;
	if (!hiddenEl) {
		hiddenEl = document.createElement('div');
		document.body.appendChild(hiddenEl);
	}

	// Fix wrap="off" issue
	// https://github.com/ant-design/ant-design/issues/6577
	el.getAttribute('wrap') 
		? hiddenEl.setAttribute('wrap', el.getAttribute('wrap'))
		: hiddenEl.removeAttribute('wrap');

	let {
		paddingSize, borderSize,
		boxSizing, sizingStyle,
	} = getComputedStyle(el, SIZING_STYLE);

	let textIndent = `text-indent: ${parseInt($(el).getStyle('text-indent'), 10) + indent}px;`;
	hiddenEl.setAttribute('style', `${sizingStyle};${textIndent};${HIDDEN_TEXT_STYLE}`);

	let endIndex = 0;
	hiddenEl.innerText = suffix;
	value.split('').forEach((item, i) => {
		// 后缀必须放入后面计算，前面会造成问题
		let old = hiddenEl.innerText;
		old = old.substring(0, old.length - suffix.length);
		hiddenEl.innerText = old + item + suffix;

		let height = paddingSize;
		// content + padding + border
		boxSizing === 'border-box' 
			&& (height += borderSize);

		if (hiddenEl.clientHeight - height > lineHeight * line && endIndex === 0) {
			endIndex = i;
		}
	});

	return endIndex;
};
