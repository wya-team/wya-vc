import Vue from 'vue';

let dropdowns = [];

!Vue.prototype.$isServer && document.addEventListener('click', function (event) {
	dropdowns.forEach(function (dropdown) {
		let target = event.target;
		if (!dropdown || !dropdown.$el) return;
		if (target === dropdown.$el || dropdown.$el.contains(target)) {
			return;
		}
		dropdown.handleOutsideClick && dropdown.handleOutsideClick(event);
	});
});

export default {
	open(instance) {
		if (instance) {
			dropdowns.push(instance);
		}
	},

	close(instance) {
		let index = dropdowns.indexOf(instance);
		if (index !== -1) {
			dropdowns.splice(instance, 1);
		}
	}
};
