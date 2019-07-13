<template>
	<div class="vc-pull-scroll-scroll-status">
		<template v-if="typeof renderer[status] === 'string'">
			<vc-spin 
				v-if="status === 1" 
				:size="12" 
				background="#666" 
				style="margin-right: 6px"
			/>
			<span v-html="renderer[status]" />
		</template>
		<vc-customer 
			v-else-if="renderer[status] || renderer"
			:render="renderer[status] || renderer"
			:status="status"
		/>
	</div>
</template>

<script>
import { merge } from 'lodash';
import Customer from '../customer';
import Spin from '../spin';

export default {
	name: 'vc-pull-scroll-scroll-status',
	components: {
		'vc-spin': Spin,
		'vc-customer': Customer,
	},
	props: {
		status: Number,
		text: {
			type: [Object, Function],
			default: () => ({}),
		},
		emptyText: Function | String,
	},
	computed: {
		renderer() {
			return merge(this.text, {
				0: '上拉加载', 
				1: '加载中', 
				2: '已全部加载', 
				3: '网络不稳定，请稍后重试', 
				4: '没有内容可供显示'
			}, {
				4: this.emptyText
			});
		}
	}
};
</script>

<style lang="scss">
.vc-pull-scroll-scroll-status {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 8px 0;
	transform: translateZ(0);
	font-size: 12px;
	overflow: hidden;
	// iPhone X 头尾异常了 几px;
	> span {
		padding-left: 10px;
		padding-right: 10px;
	}
}

</style>
