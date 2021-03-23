<!-- 仅展示最基本的用法 -->
<template>
	<div style="padding: 20px">
		<vc-steps-bar 
			v-model="current"
			:data-source="dataSource"
			@change="handleChange"
		/>
		<vc-steps :current="2" style="margin-top: 20px">
			<vc-step title="这是标题" subtitle="我是子标题" description="我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述" />
			<vc-step title="这是标题" subtitle="我是子标题" description="我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述" />
			<vc-step title="这是标题" subtitle="我是子标题" description="我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述" />
		</vc-steps>
		<vc-steps :current="2" style="margin-top: 20px" direction="vertical">
			<vc-step title="这是标题" subtitle="我是子标题" description="我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述" />
			<vc-step title="这是标题" subtitle="我是子标题" description="我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述" />
			<vc-step title="这是标题" subtitle="我是子标题" description="我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述" />
		</vc-steps>
		<vc-steps :current="2" style="margin-top: 20px" size="small">
			<vc-step title="这是标题" subtitle="我是子标题" description="我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述" />
			<vc-step title="这是标题" subtitle="我是子标题" description="我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述" />
			<vc-step title="这是标题" subtitle="我是子标题" description="我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述" />
		</vc-steps>
	</div>
</template>
<script>
import Steps from '..';

export default {
	name: "vc-steps-basic",
	components: {
		'vc-steps-bar': Steps.Bar,
		'vc-steps': Steps,
		'vc-step': Steps.Step,
	},
	data() {
		return {
			current: "1",
			dataSource: [
				{ 
					value: "1",
					label: '第1步'
				},
				{ 
					value: "2",
					label: '第2步'
				},
				{ 
					value: "3",
					label: '第3步'
				}
			]
		};
	},
	methods: {
		handleChange(e) {
			console.log(e);
		}
	}
};
</script>
