<template>
	<div>
		<vc-list :label-width="100" style="margin: 20px 0;">
			<vc-list-item :arrow="false" label="姓名">
				<template #label="">
					<div/>
				</template>
				啦啦啦
			</vc-list-item>
			<vc-list-item :arrow="false" label="姓名">
				啦啦啦
			</vc-list-item>
			<vc-list-item :arrow="false" label="姓名">
				啦啦啦
			</vc-list-item>
		</vc-list>
		<vc-list-item :arrow="true" label="姓名">
			啦啦啦
		</vc-list-item>
	</div>
</template>
<script>
import List from '../index.m';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-list': List,
		'vc-list-item': List.Item
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	methods: {
	}
};
</script>
