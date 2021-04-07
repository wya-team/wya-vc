import { cloneDeep } from 'lodash';
import Theme from './theme';
import Image from './theme-image';
import View from './theme-view';
import Text from './theme-text';

Theme.View = View;
Theme.Image = Image;
Theme.Text = Text;

export default Theme;
