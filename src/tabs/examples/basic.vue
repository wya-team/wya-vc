<template>
	<div style="background: #f7f6f6">
		<vc-button @click="animated = !animated">
			animated: {{ animated }}
		</vc-button>
		<vc-button @click="type = type === 'line' ? 'card' : 'line'">
			type: {{ type }}
		</vc-button>
		<br>
		<br>
		<div>通过 before-remove 只能删除索引大于5的标签</div>
		<vc-tabs 
			v-model="value"
			:animated="animated" 
			:type="type"
			:before-remove="handleBeforeRemove"
			closable 
			@click="handleClick"
			@tab-remove="handleRemove"
		>
			<template #extra>
				<div>extra</div>
			</template>
			<vc-tabs-pane v-if="tab0" disabled :label="renderLabel">
				<div v-for="item in list" :key="item">
					<div>标签一的内容</div>
					<div>标签一的内容</div>
				</div>
			</vc-tabs-pane>
			<vc-tabs-pane v-if="tab1" label="标签二">
				<div v-for="item in list" :key="item">
					<div>标签二的内容</div>
					<div>标签二的内容</div>
				</div>
			</vc-tabs-pane>
			<vc-tabs-pane v-if="tab2" label="标签三">
				<div v-for="item in list" :key="item">
					<div>标签三的内容</div>
					<div>标签三的内容</div>
					<div>标签三的内容</div>
				</div>
			</vc-tabs-pane>
			<vc-tabs-pane v-if="tab3" label="标签四">
				<div v-for="item in list" :key="item">
					<div>标签四的内容</div>
					<div>标签四的内容</div>
				</div>
			</vc-tabs-pane>
			<vc-tabs-pane v-if="tab4" label="标签五">
				<div v-for="item in list" :key="item">
					<div>标签五的内容</div>
					<div>标签五的内容</div>
				</div>
			</vc-tabs-pane>
			<vc-tabs-pane v-if="tab5" label="标签六">
				<div v-for="item in list" :key="item">
					<div>标签六的内容</div>
					<div>标签六的内容</div>
					<div>标签六的内容</div>
				</div>
			</vc-tabs-pane>
			<vc-tabs-pane v-if="tab6" label="标签七">
				<div v-for="item in list" :key="item">
					<div>标签七的内容</div>
				</div>
			</vc-tabs-pane>
			<vc-tabs-pane v-if="tab7" label="标签八">
				<div v-for="item in list" :key="item">
					<div>标签八的内容</div>
					<div>标签八的内容</div>
				</div>
			</vc-tabs-pane>
			<vc-tabs-pane v-if="tab8" label="标签九">
				<div v-for="item in list" :key="item">
					<div>标签九的内容</div>
					<div>标签九的内容</div>
					<div>标签九的内容</div>
				</div>
			</vc-tabs-pane>
		</vc-tabs>
	</div>
</template>
<script>
import Tabs from '..';
import Button from '../../button';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-tabs': Tabs,
		'vc-tabs-pane': Tabs.Pane,
		'vc-button': Button
	},
	data() {
		return {
			value: 6,
			animated: false,
			type: 'card',
			list: Array.from({ length: 200 }, (_, i) => i),
			tab0: true,
			tab1: true,
			tab2: true,
			tab3: true,
			tab4: true,
			tab5: true,
			tab6: true,
			tab7: true,
			tab8: true,
		};
	},
	methods: {
		handleBeforeRemove(name) {
			return new Promise((resolve, reject) => {
				if (name > 5) {
					resolve('resolve');
				} else {
					reject(new Error('reject'));
				}
			});
		},
		handleClick() {
			console.log('click');
		},
		handleRemove(name) {
			this['tab' + name] = false;
		},
		renderLabel(h, { index }) {
			return (
				<span>自定义渲染标签一 { index }</span>
			);
		}
	}
};
</script>
