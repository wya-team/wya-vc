import { ModalConfirm } from './confirm';
import Modal from './modal';

const handleClickVcModal = (data) => {
	return ModalConfirm.popup({
		...data
	}).then((res) => {
		console.log(res, 'sure');
	}).catch((res) => {
		console.log(res, 'close');
	});
};
Modal.info = function (data) {
	data.mode = "info";
	return handleClickVcModal(data);
};
Modal.success = function (data) {
	data.mode = "success";
	return handleClickVcModal(data);
};
Modal.error = function (data) {
	data.mode = "error";
	return handleClickVcModal(data);
};
Modal.warning = function (data) {
	data.mode = "warning";
	return handleClickVcModal(data);
};
export default Modal;