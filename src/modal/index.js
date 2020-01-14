import ModalManager, { allowMethod } from './modal-manager';
import Modal from './modal';

ModalManager.allowMethod.forEach(m => {
	Modal[m] = (userOptions) => {
		return ModalManager[m](userOptions);
	};
});

export default Modal;