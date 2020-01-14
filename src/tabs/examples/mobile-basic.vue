<template>
	<div style="background: #f7f6f6">
		<div :style="{ height: `${height}px` }" />
		<vcm-button @click="animated = !animated">
			animated: {{ animated }}
		</vcm-button>
		<vcm-button @click="theme = theme === 'light' ? 'dark' : 'light'">
			theme: {{ theme }}
		</vcm-button>
		<vcm-button @click="handleClear">
			清除定时器
		</vcm-button>
		<br>
		<vcm-tabs 
			v-model="value"
			:animated="animated" 
			:theme="theme"
			:average="false"
			:sticky="true"
			closable 
			@click="handleClick"
			@tab-remove="handleRemove"
		>
			<template #extra>
				<div>extra</div>
			</template>
			<template #label="{ it, index }">
				<span>{{ it.label }} - {{ index }}</span>
			</template>
			<vcm-tabs-pane label="标签一">
				<div v-for="item in list" :key="item">
					<div>标签一的内容</div>
					<div>标签一的内容</div>
				</div>
			</vcm-tabs-pane>
			<vcm-tabs-pane label="标签二">
				<div v-for="item in list" :key="item">
					<div>标签二的内容</div>
					<div>标签二的内容</div>
				</div>
			</vcm-tabs-pane>
			<vcm-tabs-pane label="标签三">
				<div v-for="item in list" :key="item">
					<div>标签三的内容</div>
					<div>标签三的内容</div>
					<div>标签三的内容</div>
				</div>
			</vcm-tabs-pane>
			<vcm-tabs-pane label="标签四">
				<div v-for="item in list" :key="item">
					<div>标签四的内容</div>
					<div>标签四的内容</div>
				</div>
			</vcm-tabs-pane>
			<vcm-tabs-pane label="标签五">
				<div v-for="item in list" :key="item">
					<div>标签五的内容</div>
					<div>标签五的内容</div>
				</div>
			</vcm-tabs-pane>
			<vcm-tabs-pane label="标签六">
				<div v-for="item in list" :key="item">
					<div>标签六的内容</div>
					<div>标签六的内容</div>
					<div>标签六的内容</div>
				</div>
			</vcm-tabs-pane>
			<vcm-tabs-pane label="标签七">
				<div v-for="item in list" :key="item">
					<div>标签七的内容</div>
				</div>
			</vcm-tabs-pane>
			<vcm-tabs-pane label="标签八">
				<div v-for="item in list" :key="item">
					<div>标签八的内容</div>
					<div>标签八的内容</div>
				</div>
			</vcm-tabs-pane>
			<vcm-tabs-pane label="标签九">
				<div v-for="item in list" :key="item">
					<div>标签九的内容</div>
					<div>标签九的内容</div>
					<div>标签九的内容</div>
				</div>
			</vcm-tabs-pane>
		</vcm-tabs>
	</div>
</template>
<script>
import MTabs from '../index.m';
import MButton from '../../button/index.m';

export default {
	name: "vcm-tpl-basic",
	components: {
		'vcm-tabs': MTabs,
		'vcm-tabs-pane': MTabs.Pane,
		'vcm-button': MButton
	},
	data() {
		return {
			height: 0,
			value: 0,
			animated: false,
			theme: 'light',
			list: Array.from({ length: 200 }, (_, i) => i)
		};
	},
	computed: {
		
	},
	mounted() {
		this.timer = setInterval(() => {
			this.height += 100;
		}, 2000);
	},
	methods: {
		handleClick() {
			console.log('click');
		},
		handleRemove() {
			console.log('remove');
		},
		handleClear() {
			clearInterval(this.timer);
		}
	}
};
</script>
