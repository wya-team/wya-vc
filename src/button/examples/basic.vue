<template>
	<div style="width: 100%;text-align: center">
		<div class="box-wrapper">
			<vc-button :wait="5000" type="default" @click="showNum">default</vc-button>
			<vc-button type="primary">primary</vc-button>
			<vc-button type="text" size="small">text</vc-button>
			<vc-button type="success" size="large">success</vc-button>
			<vc-button type="error" size="small">error</vc-button>
			<vc-button type="warning">warning</vc-button>
			<vc-button disabled type="primary">Primary</vc-button>
		</div>
		<div class="box-wrapper">
			<vc-button long>
				long
			</vc-button>
		</div>
		<div class="box-wrapper">
			<vc-button type="default" circle>default</vc-button>
			<vc-button type="primary" circle>primary</vc-button>
			<vc-button type="success" circle>success</vc-button>
			<vc-button type="error" circle>error</vc-button>
			<vc-button type="warning" circle>warning</vc-button>
			<vc-button disabled type="primary" circle>Primary</vc-button>
		</div>
		<div class="box-wrapper">
			<vc-button size="large">large</vc-button>
			<vc-button size="medium">default</vc-button>
			<vc-button size="small">large</vc-button>
		</div>
		<div class="box-wrapper">
			<vc-button size="large" icon="success">large</vc-button>
			<vc-button type="success" size="large" icon="search" round/>
		</div>
		<div>
			<vc-button-group size="large">
				<vc-button type="success">large</vc-button>
				<vc-button type="success">large</vc-button>
				<vc-button type="success">large</vc-button>
			</vc-button-group>
			<vc-button-group size="medium">
				<vc-button>medium</vc-button>
				<vc-button>medium</vc-button>
			</vc-button-group>
			<vc-button-group size="small">
				<vc-button>small</vc-button>
				<vc-button>small</vc-button>
				<vc-button>small</vc-button>
			</vc-button-group>
		</div>
		<div>
			<vc-button-group size="large" circle>
				<vc-button>large</vc-button>
				<vc-button>large</vc-button>
				<vc-button>large</vc-button>
			</vc-button-group>
			<vc-button-group size="medium" circle>
				<vc-button>medium</vc-button>
				<vc-button>medium</vc-button>
			</vc-button-group>
			<vc-button-group size="small" circle>
				<vc-button>small</vc-button>
				<vc-button>small</vc-button>
				<vc-button>small</vc-button>
			</vc-button-group>
		</div>
		<div>
			<vc-button-group size="large" vertical>
				<vc-button>large</vc-button>
				<vc-button>large</vc-button>
				<vc-button>large</vc-button>
			</vc-button-group>
			<vc-button-group circle vertical>
				<vc-button>测试</vc-button>
				<vc-button>测试</vc-button>
				<vc-button>测试</vc-button>
			</vc-button-group>
			<vc-button-group size="small" circle vertical>
				<vc-button icon="up"/>
				<vc-button icon="up"/>
				<vc-button icon="up"/>
			</vc-button-group>
		</div>
	</div>
</template>
<script>
import Button from '../button';
import ButtonGroup from '../button-group';
import DebounceClick from '../../debounce-click';

export default {
	name: "vc-button-basic",
	components: {
		"vc-button": Button,
		"vc-button-group": ButtonGroup,
		'vc-debounce-click': DebounceClick
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	methods: {
		showNum(e) {
			console.log(e, new Date());
		}
	}
};
</script>
<style>
.box-wrapper{
	margin: 20px;
}
</style>

