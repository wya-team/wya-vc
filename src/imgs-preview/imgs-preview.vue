<template>
	<div
		class="vc-imgs-preview"
		style="display: flex; flex-wrap: wrap"
	>
		<div
			v-for="(item, index) in dataSource"
			:key="index"
			class="__item"
		>
			<row 
				:src="item | getImage"
				:index="index"
				:render="renderRow"
			/>
			<div class="__mask">
				<span
					@click.stop="handleShow($event, index)"
				>➠</span>
			</div>
		</div>
	</div>
</template>
<script>
import Core, { Func } from './core';
import CreateCustomer from '../create-customer/index';

const Row = CreateCustomer({
	src: [Object, String],
	index: Number
});
export default {
	name: "vc-imgs-preview-row",
	popup: Func.popup,
	components: {
		Row
	},
	filters: {
		getImage(item) {
			return typeof item === 'object' 
				? (item.thumbnail || item.msrc || item.src)
				: item;
		}
	},
	props: {
		...Core.props,
		renderRow: {
			type: Function,
			default: (h, params) => {
				const { src, index } = params; 
				return h('img', {
					attrs: {
						src,
						width: 100,
						height: 100,
					}
				});
			}
		}
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	methods: {
		handleShow(e, index) {
			const { id, dataSource, opts, events, getInstance } = this;
			let pos = {};
			try {
				const target = e.target; // 先得到pos, 否则getThumbBoundsFn再计划，target已变化
				const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
				const rect = target.getBoundingClientRect();

				pos = { x: rect.left, y: rect.top + pageYScroll, w: rect.width };

			} catch (e) {
				console.log(e);
			}
			Func.popup({
				id,
				dataSource,
				events,
				getInstance,
				opts: {
					...opts,
					index,
					history: false,
					getThumbBoundsFn: (index) => pos,
				}
			}).then(() => {

			}).catch(() => {

			});
		}
	}
};
</script>
<style lang="scss" scoped>
.vc-imgs-preview {
	img {
		display: block;
	}
	.__item {
		box-sizing: border-box;
		cursor: pointer;
		position: relative;
		margin-bottom: 5px;
		margin-right: 5px;
	}
	.__item:hover .__mask {
		transition: opacity 0.5s;
		opacity: 1;
	}
	.__mask {
		opacity: 0;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.4);
		color: #fff;
		display: flex;
		justify-content: space-around;
		align-items: center;
		box-sizing: border-box;
		& > span {
			cursor: pointer;
			font-size: 18px;
		}
	}
}
</style>