import Message from '../message';
import CopyMixin from './copy-mixin';

export default {
	name: "vc-copy",
	mixins: [CopyMixin],
	methods: {
		_toast(opts) {
			Message.success(opts);
		}
	}
};
