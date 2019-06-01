<template>
	<div>
		<vc-customer
			v-if="true"
			v-show="show"
			:render="renderRow"
			:value="value" 
			:date="date" 
			class="vc-customer"
			style="border: 1px solid red"
			name="time"
			after-text="----"
			@click-show="handleClick"
		/>

		<vc-customer :render="renderRow2">
			<div>test1</div>
			<div>test2</div>
			<template #test="it">
				{{ it }}
			</template>
		</vc-customer>
	</div>
</template>
<script>
import Customer from '..';

export default {
	name: "vc-customer-basic",
	components: {
		'vc-customer': Customer
	},
	data() {
		return {
			show: true,
			value: 1,
			date: new Date()
		};
	},
	computed: {
		
	},
	mounted() {
		setInterval(() => {
			this.value++;
			this.date = new Date();
			this.show = true;
		}, 1000);
	},
	methods: {
		handleClick() {
			console.log('click');
			this.show = false;
		},
		renderRow(h, props, parent) {
			console.log(parent, props);

			const { style, className, name, value, date, afterText, onClickShow } = props;
			/**
			 * 与React类似
			 */
			return (
				<div class={className} style={style} onClick={onClickShow}>
					{date.toString()}:{name}:{value}{afterText}
				</div>
			);
		},
		renderRow2(h, props, parent) {
			return (
				<div>
					{ parent.children }
					{ parent.scopedSlots.default() }
					{ parent.scopedSlots.test({ name: 'scopedSlots' }) }
				</div>
			);
		}
	}
};
</script>
