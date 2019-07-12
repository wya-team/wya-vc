import MToast from '../../toast/index.m';
import ClipboardMixin from '../clipboard-mixin';

export default {
	name: "vcm-clipboard",
	mixins: [ClipboardMixin],
	methods: {
		_toast(opts) {
			MToast.info(opts);
		}
	}
};
