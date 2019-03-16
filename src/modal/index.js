import { ModalConfirm } from './confirm';
import Modal from './modal';

const handleClickVcModal = (data) => {
	ModalConfirm.popup({
		...data
	}).then((res) => {
		console.log(res, 'sure');
	}).catch((res) => {
		console.log(res, 'close');
	});
};
Modal.info = function (data) {
	data.mode = "info";
	handleClickVcModal(data);
};
Modal.success = function (data) {
	data.mode = "success";
	handleClickVcModal(data);
};
Modal.error = function (data) {
	data.mode = "error";
	handleClickVcModal(data);
};
Modal.warning = function (data) {
	data.mode = "warning";
	handleClickVcModal(data);
};
export default Modal;