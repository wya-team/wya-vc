import MModalManager from './mobile/modal-manager';
import MModal from './mobile/modal';

MModalManager.allowMethod.forEach(m => {
	MModal[m] = (userOptions) => {
		return MModalManager[m](userOptions);
	};
});

export default MModal;