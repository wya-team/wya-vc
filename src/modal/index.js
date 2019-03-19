import { createModal } from './confirm';
import Modal from './modal';

Modal.info = createModal('info');
Modal.success = createModal('sucess');
Modal.error = createModal('error');
Modal.warning = createModal('warning');

export default Modal;