<template>
	<div
		class="vc-imgs-preview"
		style="display: flex; flex-wrap: wrap"
	>
		<div
			v-for="(item, index) in dataSource"
			:key="index"
			:class="itemClass"
			class="vc-imgs-preview__item"
		>
			<slot
				:src="item | getImage" 
				:index="index" 
				name="row"
			>
				<vc-customer
					:src="item | getImage"
					:index="index"
					:render="renderRow"
				/>
			</slot>
			<div class="vc-imgs-preview__mask">
				<slot 
					:src="item | getImage" 
					:index="index" 
					:show="handleShow" 
					name="operate"
				>
					<vc-icon type="preview" @click.stop="handleShow($event, index)" />
				</slot>
			</div>
		</div>
	</div>
</template>
<script>
import BasicMixin from './basic-mixin';

export default {
	name: "vc-imgs-preview-row",
	mixins: [BasicMixin],
	props: {
		renderRow: {
			type: Function,
			default: (h, props, parent) => {
				const { src, index } = props;
				return h('img', {
					attrs: {
						src,
						width: 100,
						height: 100,
					}
				});
			}
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