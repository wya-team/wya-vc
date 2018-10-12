<template>
	<customer-row :render="renderRow" name="customer-render-test"/>
</template>
<script>
import CreateCustomer from '../index';

const CustomerRow = CreateCustomer({
	name: String
});

export default {
	name: "vc-tpl-basic",
	components: {
		CustomerRow
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	methods: {
		renderRow(h, { name }) {
			return h('div', {
				domProps: {
					innerHTML: name
				}
			});
		}
	}
};
</script>
