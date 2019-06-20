import { pick, values } from 'lodash';
import filters from './filters';
import directives from './directives';
import mixins from './mixins';

const Extends = {
	filters: (needs) => pick(filters, needs || Object.keys(filters)),
	directives: (needs) => pick(directives, needs || Object.keys(directives)),
	mixins: (needs) => values(pick(mixins, needs || Object.keys(mixins))),
};

export default Extends;