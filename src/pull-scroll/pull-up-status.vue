<template>
	<!-- 样式处理历史问题 -->
	<div :class="{ 'is-lack': lack }" class="vc-pull-scroll-pull-status is-up" name="pull-up">
		<div v-if="typeof renderer[currentStatus] === 'string'">
			<vc-spin 
				v-if="currentStatus === 3" 
				:size="12" 
				background="#666" 
				style="margin-right: 6px"
			/>
			<span v-html="renderer[currentStatus]" />
		</div>
		<vc-customer 
			v-else-if="renderer[currentStatus] || renderer"
			:render="renderer[currentStatus] || renderer"
			:status="status"
			:pre-statue="preStatus"
		/>
	</div>
</template>

<script>
import { merge } from 'lodash';
import Customer from '../customer';
import Spin from '../spin';

export default {
	name: 'vc-pull-scroll-pull-up-status',
	components: {
		'vc-spin': Spin,
		'vc-customer': Customer,
	},
	props: {
		status: Number,
		preStatus: Number,
		text: {
			type: [Object, Function],
			default: () => ({}),
		},
		lack: Boolean
	},
	computed: {
		currentStatus() {
			let status = this.status;
			if (this.preStatus == 0 && this.status == 0) {
				status = 1; 
			}
			if (this.preStatus == 1 && this.status == 0) {
				status = 1; 
			}
			if (this.preStatus == 3 && this.status == 0) {
				status = 1; 
			}
			return status;
		},
		renderer() {
			if (typeof this.text === 'function') {
				return this.text;
			}
			let result = merge(
				{
					0: '~', 
					1: '↑ 上拉加载更多', 
					2: '↓ 释放加载更多', 
					3: '加载中...', 
				},
				this.text
			);
			return result;
		}
	},
	watch: {
		
	}
};
</script>

<style lang="scss">
.vc-pull-scroll-pull-status.is-up {
	> div {
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		line-height: 30px;
		font-size: 12px;
	}
	&.is-lack {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		> div {
			margin-bottom: -30px;
		}
	}
}
</style>
