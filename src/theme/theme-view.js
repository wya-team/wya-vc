import Theme from './theme';

export default {
	name: 'vc-theme-view',
	mixins: [Theme],
	props: {
		tag: {
			type: String,
			default: 'div'
		}
	}
};