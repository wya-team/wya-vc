<template>
	<div
		class="vc-imgs-preview"
		style="display: flex; flex-wrap: wrap"
	>
		<div
			v-for="(item, index) in dataSource"
			:key="index"
			class="vc-imgs-preview__item"
		>
			<vc-customer-row
				v-if="!$slots.row && !$scopedSlots.row" 
				:src="item | getImage"
				:index="index"
				:render="renderRow"
			/>
			<slot 
				v-else
				:src="item | getImage" 
				:index="index" 
				name="row" 
			/>
			<div class="vc-imgs-preview__mask">
				<div v-if="!$slots.operate && !$scopedSlots.operate">
					<vc-icon type="visible" @click.stop="handleShow($event, index)" />
				</div>
				<div v-else>
					<slot 
						:src="item | getImage" 
						:index="index" 
						:show="handleShow" 
						name="operate" 
					/>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Core, { Func } from './core';
import CreateCustomer from '../create-customer/index';
import Icon from '../icon/index';

const Row = CreateCustomer({
	src: [Object, String],
	index: Number,
	
});
export default {
	name: "vc-imgs-preview-row",
	components: {
		'vc-customer-row': Row,
		'vc-icon': Icon
	},
	filters: {
		getImage(item) {
			return typeof item === 'object' 
				? (item.thumbnail || item.msrc || item.src || item)
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

			this.$emit('open');
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

			}).catch((e) => {
				console.log(e);
			}).finally(() => {
				this.$emit('close');
			});	
		}
	}
};
</script>
<style lang="scss">
@import '../style/index.scss';

@include block(vc-imgs-preview) {
	img {
		display: block;
	}
	@include element(item) { 
		box-sizing: border-box;
		cursor: pointer;
		position: relative;
		margin-bottom: 5px;
		margin-right: 5px; 
		&:hover {
			@include element(mask) {
				transition: opacity 0.5s;
				opacity: 1;
			}
		}
	}; 
	@include element(mask) {
		opacity: 0;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.6);
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