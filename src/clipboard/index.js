import Clipboard from './clipboard';
import { copyToClipboard } from './utils';

Clipboard.set = copyToClipboard;

export default Clipboard;
