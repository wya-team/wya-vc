<template>
	<vc-tree :data="data5" :render="renderContent" />
</template>
<script>
import Tree from '..';

export default {
	name: "vc-tree-basic",
	components: {
		'vc-tree': Tree
	},
	data() {
		return {
			data5: [
				{
					title: 'parent 1',
					expand: true,
					render: (h, { root, node, data }) => {
						return h('span', {
							style: {
								display: 'inline-block',
								width: '100%'
							}
						}, [
							h('span', [
								h('div', {
									props: {
										type: 'ios-folder-outline'
									},
									style: {
										marginRight: '8px'
									}
								}),
								h('span', data.title)
							]),
							h('span', {
								style: {
									display: 'inline-block',
									float: 'right',
									marginRight: '32px'
								}
							}, [
								h('div', {
									props: Object.assign({}, this.buttonProps, {
										icon: 'ios-add',
										type: 'primary'
									}),
									style: {
										width: '64px'
									},
									on: {
										click: () => { this.append(data); }
									}
								})
							])
						]);
					},
					children: [
						{
							title: 'child 1-1',
							expand: true,
							children: [
								{
									title: 'leaf 1-1-1',
									expand: true
								},
								{
									title: 'leaf 1-1-2',
									expand: true
								}
							]
						},
						{
							title: 'child 1-2',
							expand: true,
							children: [
								{
									title: 'leaf 1-2-1',
									expand: true
								},
								{
									title: 'leaf 1-2-1',
									expand: true
								}
							]
						}
					]
				}
			],
			buttonProps: {
				type: 'default',
				size: 'small',
			}
		};
	},
	computed: {
		
	},
	methods: {
		renderContent(h, { root, node, data }) {
			return h('span', {
				style: {
					display: 'inline-block',
					width: '100%'
				}
			}, [
				h('span', [
					h('span', {
						style: {
							marginRight: '8px'
						}
					}, '?'),
					h('span', data.title)
				]),
				h('span', {
					style: {
						display: 'inline-block',
						float: 'right',
						marginRight: '32px'
					}
				}, [
					h('span', {
						style: {
							marginRight: '8px'
						},
						on: {
							click: () => { this.append(data); }
						}
					}, '+'),
					h('span', {
						on: {
							click: () => { this.remove(root, node, data); }
						}
					}, '-')
				])
			]);
		},
		append(data) {
			const children = data.children || [];
			children.push({
				title: 'appended node',
				expand: true
			});
			this.$set(data, 'children', children);
		},
		remove(root, node, data) {
			const parentKey = root.find(el => el === node).parent;
			const parent = root.find(el => el.nodeKey === parentKey).node;
			const index = parent.children.indexOf(data);
			parent.children.splice(index, 1);
		}
	}
};
</script>
