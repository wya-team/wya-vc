import Message from '../message';
import ClipboardMixin from './clipboard-mixin';

export default {
	name: "vc-clipboard",
	mixins: [ClipboardMixin],
	methods: {
		_toast(opts) {
			Message.success(opts);
		}
	}
};
