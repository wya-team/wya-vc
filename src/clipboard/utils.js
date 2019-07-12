export const toggleSelection = () => {
	let selection = document.getSelection();
	if (!selection.rangeCount) {
		return () => {};
	}
	let active = document.activeElement;

	let ranges = [];
	for (let i = 0; i < selection.rangeCount; i++) {
		ranges.push(selection.getRangeAt(i));
	}

	switch (active.tagName.toUpperCase()) { // .toUpperCase handles XHTML
		case 'INPUT':
		case 'TEXTAREA':
			active.blur();
			break;
		default:
			active = null;
			break;
	}

	selection.removeAllRanges();
	return () => {
		selection.type === 'Caret' && selection.removeAllRanges();

		if (!selection.rangeCount) {
			ranges.forEach((range) => {
				selection.addRange(range);
			});
		}
		active && active.focus();
	};
};
export const copyToClipboard = (value, opts = {}) => {

	let reselectPrevious;
	let range;
	let selection;
	let mark;
	let success;
	try {
		// 取消用户选中的文字
		reselectPrevious = toggleSelection();

		range = document.createRange();
		selection = document.getSelection();

		mark = document.createElement('span');
		mark.textContent = value;
		// 重置span元素的用户样式
		mark.style.all = 'unset';
		// 防止滚动到页面的末尾
		mark.style.position = 'fixed';
		mark.style.top = 0;
		mark.style.clip = 'rect(0, 0, 0, 0)';
		// 用于保存空格和换行符
		mark.style.whiteSpace = 'pre';
		// 不要继承user-select(可能是“none”)
		mark.style.webkitUserSelect = 'text';
		mark.style.MozUserSelect = 'text';
		mark.style.msUserSelect = 'text';
		mark.style.userSelect = 'text';

		document.body.appendChild(mark);

		// 设置Range的范围，包括referenceNode和它的所有后代(子孙)节点
		range.selectNode(mark);
		selection.addRange(range);

		if (!document.execCommand('copy')) {
			throw new Error('copy command was unsuccessful');
		}
		success = true;
	} catch (err) {
		// IE
		try {
			window.clipboardData.setData('text', value);
			success = true;
		} catch (err) {
			console.log(err);
			// window.prompt(opts.msg || '复制', value);
		}
	} finally {
		if (selection) {
			if (typeof selection.removeRange == 'function') {
				selection.removeRange(range);
			} else {
				selection.removeAllRanges();
			}
		}
		if (mark) {
			document.body.removeChild(mark);
		}
		reselectPrevious();
	}
	return success;
};
