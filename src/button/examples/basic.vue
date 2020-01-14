<template>
	<div style="width: 100%;text-align: center">
		<div class="box-wrapper">
			<vc-button :wait="5000" type="default" @click="handleClick">
				default
			</vc-button>
			<vc-button type="primary" @click="handleClick">
				primary
			</vc-button>
			<vc-button type="text" size="small">
				text
			</vc-button>
			<vc-button type="success" size="large">
				success
			</vc-button>
			<vc-button type="error" size="small">
				error
			</vc-button>
			<vc-button type="warning">
				warning
			</vc-button>
			<vc-button disabled type="primary">
				Primary
			</vc-button>
		</div>
		<div class="box-wrapper">
			<vc-button long>
				long
			</vc-button>
		</div>
		<div class="box-wrapper">
			<vc-button type="default" circle>
				default
			</vc-button>
			<vc-button type="primary" circle>
				primary
			</vc-button>
			<vc-button type="success" circle>
				success
			</vc-button>
			<vc-button type="error" circle>
				error
			</vc-button>
			<vc-button type="warning" circle>
				warning
			</vc-button>
			<vc-button disabled type="primary" circle>
				Primary
			</vc-button>
		</div>
		<div class="box-wrapper">
			<vc-button size="large">
				large
			</vc-button>
			<vc-button size="medium">
				default
			</vc-button>
			<vc-button size="small">
				large
			</vc-button>
		</div>
		<div class="box-wrapper">
			<vc-button size="large" icon="success">
				large
			</vc-button>
			<vc-button type="success" size="large" icon="search" round />
		</div>
		<div>
			<vc-button-group size="large">
				<vc-button type="success">
					large
				</vc-button>
				<vc-button type="success">
					large
				</vc-button>
				<vc-button type="success">
					large
				</vc-button>
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
				<vc-button icon="up" />
				<vc-button icon="up" />
				<vc-button icon="up" />
			</vc-button-group>
		</div>
		<div>
			<br>
			<vc-button-group>
				<vc-button type="primary" @click="handlePromise1">
					Promise1
				</vc-button>
				<vc-button type="success" @click="handlePromise2">
					Promise2
				</vc-button>
			</vc-button-group>
		</div>
	</div>
</template>
<script>
import Button from '../button';
import Message from '../../message';
import ButtonGroup from '../button-group';

export default {
	name: "vc-button-basic",
	components: {
		"vc-button": Button,
		"vc-button-group": ButtonGroup
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	methods: {
		handleClick(e) {
			console.log(e);
			Message.info(new Date().getTime().toString());
			// console.log(e, );
		},
		handlePromise1(e, callback) {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve();
				}, 300000);	
			});
		},
		handlePromise2(e, callback) {
			return this.handlePromise1().then(() => {
				console.log(typeof callback);
			});
		}
	}
};
</script>
<style>
.box-wrapper{
	margin: 20px;
}
</style>

