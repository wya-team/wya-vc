import Clipboard from './clipboard';
import { copyToClipboard, toggleSelection } from './utils';

Clipboard.get = () => {
	// TODO: 获取黏贴板的内容，暂时无法实现
};

Clipboard.set = copyToClipboard;

// 用于清除Dom上选中的文字
Clipboard.clearSelection = toggleSelection;

export default Clipboard;
