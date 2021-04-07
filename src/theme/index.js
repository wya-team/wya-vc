import { cloneDeep } from 'lodash';
import Theme from './theme';

let createThemeByTag = (tag) => {
	let comp = cloneDeep(Theme);
	comp.props.tag.default = tag;

	return comp;
};

Theme.View = createThemeByTag('div');
Theme.Image = createThemeByTag('img');
Theme.Text = Theme;

export default Theme;
