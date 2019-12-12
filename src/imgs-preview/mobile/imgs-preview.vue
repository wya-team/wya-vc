<template>
	<div
		class="vcm-imgs-preview"
		style="display: flex; flex-wrap: wrap"
	>
		<div
			v-for="(item, index) in dataSource"
			:key="index"
			:class="itemClassName"
			class="vcm-imgs-preview__item"
		>
			<slot
				:src="item | getImage" 
				:index="index" 
				:show="handleShow" 
				name="row"
			>
				<vc-customer
					:src="item | getImage"
					:index="index"
					:render="renderRow"
					:show="handleShow"
				/>
			</slot>
		</div>
	</div>
</template>
<script>
import BasicMixin from '../basic-mixin';
import Img from '../../img';

export default {
	name: "vcm-imgs-preview-row",
	components: {
		'vc-img': Img
	},
	mixins: [BasicMixin],
	props: {
		renderRow: {
			type: Function,
			default: (h, props, parent) => {
				const { src, index, show } = props;
				return (
					<vc-img 
						src={src} 
						fit="cover"
						onClick={(e) => {
							show(e, index);
						}}
						style="width: 78px; height: 78px;"
					/>
				);
			}
		}
	}
};
</script>
<style lang="scss">
@import '../../style/index.scss';

@include block(vcm-imgs-preview) {
	img {
		display: block;
	}
	@include element(item) { 
		box-sizing: border-box;
		cursor: pointer;
		position: relative;
		margin-bottom: 8px;
		margin-right: 8px; 
	}; 
}
</style>