<template>
	<div class="vc-pull-scroll-pull-down-status">
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
	name: 'vc-pull-scroll-pull-down-status',
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
		}
	},
	computed: {
		currentStatus() {
			let status = this.status;
			if (this.preStatus == 1 && this.status == 0) {
				status = 1; 
			}

			if (this.preStatus == 3 && this.status == 0) {
				status = 3; 
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
					1: '↓ 下拉刷新', 
					2: '↑ 释放更新', 
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
.vc-pull-scroll-pull-down-status {
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
