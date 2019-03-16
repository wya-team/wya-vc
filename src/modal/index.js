import { ModalConfirm } from './confirm';

const $Modal = {
	info(data) {
		data.mode = "info";
		this.handleClickVcModal(data);
	},
	success(data) {
		data.mode = "success";
		this.handleClickVcModal(data);
	},
	error(data) {
		data.mode = "error";
		this.handleClickVcModal(data);
	},
	warning(data) {
		data.mode = "warn";
		this.handleClickVcModal(data);
	},
	handleClickVcModal(data) {
		ModalConfirm.popup({
			...data
		}).then((res) => {
			console.log(res, 'sure');
		}).catch((res) => {
			console.log(res, 'close');
		});
	}
};
export default $Modal;
