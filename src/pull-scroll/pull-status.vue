<template>
	<div class="vc-pull-scroll-pull-status">
		<div 
			v-if="typeof text[status] === 'string'"
			class="vc-pull-scroll-pull-status__wrapper" 
		>
			<vc-spin 
				v-if="status === 3" 
				:size="12" 
				background="#666" 
				style="margin-right: 6px"
			/>
			<span v-html="text[status]" />
		</div>
		<vc-customer 
			v-else-if="text[status] || text"
			:render="text[status] || text"
			:status="status"
		/>
	</div>
</template>

<script>
import Customer from '../customer';
import Spin from '../spin';

export default {
	name: 'vc-pull-scroll-pull-status',
	components: {
		'vc-spin': Spin,
		'vc-customer': Customer,
	},
	props: {
		status: Number,
		text: {
			type: Object | Function,
			default() {
				return Object.assign({
					0: '↓ 下拉刷新', 
					1: '↓ 下拉刷新', 
					2: '↑ 释放更新', 
					3: '加载中...', 
				}, this.text);
			}
		},
	}
};
</script>

<style lang="scss">
.vc-pull-scroll-pull-status {
	position: absolute;
	top: -75px;
	left: 0;
	right: 0;
	transform: translateZ(0);
	> div {
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		line-height: 30px;
		font-size: 12px;
		height: 75px;
		padding-top: 45px;
	}
}

</style>
