import MToast from '../../toast/index.m';
import CopyMixin from '../copy-mixin';

export default {
	name: "vcm-copy",
	mixins: [CopyMixin],
	methods: {
		_toast(opts) {
			MToast.info(opts);
		}
	}
};
