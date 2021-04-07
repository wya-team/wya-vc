import Theme from './theme';

export default {
	name: 'vc-theme-image',
	mixins: [Theme],
	props: {
		tag: {
			type: String,
			default: 'img'
		}
	}
};