<template>
	<div 
		:class="`__${type}`"
		class="vc-ps-status"
	>
		<div class="__content">
			<span
				v-if="type === 'pull'"
				v-text="pullText[status]" 
			/>
			<span
				v-if="isLoading"
				class="__loading" 
			/>
			<div
				v-if="type === 'scroll' && !isLoading && status === 0"
				class="__placeholder" 
			/>
			<span v-if="isEmptyData">{{ scrollText[4] }}</span>
			<div v-else-if="type === 'scroll'">
				<span>{{ scrollText[status] }}</span>
			</div>
		</div>
	</div>
</template>

<script>
import { visible } from '../extends/directives/visible';

export default {
	name: '',
	directives: {
		visible
	},
	components: {
	},
	props: {
		type: {
			type: String,
			validator(value) {
				return ['pull', 'scroll'].includes(value);
			},
			default: 'scroll'
		},
		scrollText: {
			type: Array,
			default: () => ['上拉加载', '加载中', '已全部加载', '网络不稳定，请稍后重试', '没有内容可供显示']
		},
		pullText: {
			type: Array,
			default: () => ['↓ 下拉刷新', '↓ 下拉刷新', '↑ 释放更新', '加载中...']
		},
		y: Number,
		current: Number | String,
		status: Number,
		dataSource: Array,
	},
	data() {
		return {
		};
	},
	computed: {
		isLoading() {
			return (this.type === 'scroll' && this.status == 1) 
				|| (this.type === 'pull' && this.status == 3);
		},
		isEmptyData() {
			return this.current === 1 && this.dataSource.length === 0;
		}
	},
	watch: {
		
	},
	methods: {

	},
};
</script>

<style lang="scss">
.vc-ps-status {
	&.__pull {
		position: absolute;
		top: -75px;
		left: 0;
		right: 0;
		margin-top: 45px;
		height: 75px;
		line-height: 30px;
		width: 100%;
		font-size: 12px;
		text-align: center;
		transform: translateZ(0);
	}
	&.__scroll {
		overflow: hidden;
		font-size: 12px;
		transform: translateZ(0);
		text-align: center;
	}
	.__content {
		text-align: center;
	}
	.__loading {
		display: inline-block;
		height: 15px;
		width: 15px;
		border-radius: 100%;
		margin: 6px;
		border: 2px solid #666;
		border-bottom-color: transparent;
		vertical-align: middle;
		animation: vc-ps-rotate 0.75s linear infinite;
	}
	.__placeholder {
		height: 15px;
		margin: 6px;
	}
}

@keyframes vc-ps-rotate {
	0% {
		transform: rotate(0deg);
	}
	50% {
		transform: rotate(180deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
