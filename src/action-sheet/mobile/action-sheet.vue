<template>
	<div class="vcm-action-sheet">
		<vcm-popup 
			v-model="isActive" 
			:mask="mask"
			:mask-closable="maskClosable"
			:wrapper-class-name="`vcm-action-sheet__wrapper ${wrapperClassName}`"
			:wrapper-style="wrapperStyle"
			:scroll-reg-exp="scrollRegExp"
			placement="bottom"
			theme="light"
			:fixed="true"
			@close="handleClose"
		>
			<div v-if="description" class="vcm-action-sheet__description">{{ description }}</div>
			<div v-for="(action, index) in actions" :key="index">
				<!-- 样式后面的空格不要删，是样式之间的间隔 -->
				<div 
					class="vcm-action-sheet__item"
					:class="`${ action.disabled ? 'is-disabled ' : ' '}
					${index < actions.length - 1 ? 'vcm-action-sheet__item--divider ' : ' '}
					${action.className || ''}`"
					:style="action.style"
					@click="handleActionClick(action, index)"
				>
					<vcm-spin
						v-if="loadingIndex === index"
						:size="20"
						background="#ffffff"
						class="vcm-action-sheet__item--loading"
					/>
					<template v-else>
						<p>{{ action.name }}</p>
						<p v-if="action.subName" class="vcm-action-sheet__item--sub-name">
							{{ action.subName }}
						</p>
					</template>
				</div>
			</div>
			<template v-if="cancelText">
				<div class="vcm-action-sheet__gap" />
				<div 
					class="vcm-action-sheet__item vcm-action-sheet__cancel"
					@click="handleClose"
				>
					{{ cancelText }}
				</div>
			</template>
		</vcm-popup>
	</div>
</template>

<script>
import { pick } from 'lodash';
import Portal from '../../portal/index';
import MSpin from '../../spin/index.m';
import MPopup from '../../popup/index.m';

const wrapperComponent = {
	name: 'vcm-action-sheet',
	components: {
		'vcm-popup': MPopup,
		'vcm-spin': MSpin
	},
	props: {
		...pick(MPopup.props, [
			'mask',
			'maskClosable',
			'wrapperClassName',
			'wrapperStyle',
			'scrollRegExp'
		]),
		// 顶部标题下的简要消息
		description: String,
		actions: {
			type: Array,
			default: () => ([])
		},
		cancelText: String
	},
	data() {
		return {
			isActive: false,
			loadingIndex: -1, // 异步情况下需要展示loading的action，值为action的索引
		};
	},
	computed: {

	},
	mounted() {
		this.isActive = true;
	},
	methods: {
		async handleActionClick(action, index) {
			let { onClick, ...rest } = action;
			if (rest.disabled || this.loadingIndex > -1) return; // 存在异步时不允许点击
			let after = onClick && onClick(rest, () => { this.handleOk(rest); });
			if (after && after.then) {
				this.loadingIndex = index;
				try {
					await after;
					this.handleOk(rest);
				} catch (error) {
					this.loadingIndex = -1;
				}
			}
		},
		handleOk(rest) {
			this.isActive = false;
			this.$emit('sure', rest);
		},
		handleClose() {
			this.isActive = false;
			this.$emit('sure');
		},
	},
};

export default wrapperComponent;
export const Func = new Portal(wrapperComponent, {});
</script>

<style lang="scss">
@import '../../style/vars.scss';

@include block(vcm-action-sheet) {
	color: #333333;
	@include element(wrapper) {
		border-radius: 12px 12px 0 0;
		overflow: hidden;
	}
	@include element(description) {
		position: relative;
		padding: 15px 16px;
		color: #969799;
		font-size: 14px;
		text-align: center;
		&::after {
			position: absolute;
			box-sizing: border-box;
			content: ' ';
			pointer-events: none;
			right: 0;
			bottom: 0;
			left: 0;
			border-bottom: 1px solid #ebedf0;
			transform: scaleY(0.5);
		}
	}
	@include element(item) {
		display: block;
		width: 100%;
		padding: 14px 16px;
		font-size: 16px;
		background-color: #fff;
		border: none;
		cursor: pointer;
		text-align: center;
		@include modifier(divider) {
			position: relative;
			&::after {
				position: absolute;
				box-sizing: border-box;
				content: ' ';
				pointer-events: none;
				right: 0;
				bottom: 0;
				left: 0;
				border-bottom: 1px solid #ebedf0;
				transform: scaleY(0.5);
			}
		}
		@include modifier(sub-name) {
			margin-top: 3px;
			color: #969799;
			font-size: 12px;
			line-height: 18px;
		}
		@include when(disabled) {
			cursor: not-allowed;
			color: #c8c9cc;
			&:active {
				background-color: #ffffff;	
			}
		}
		&:active {
			background-color: #f2f3f5;
		}
	}
	@include element(gap) {
		display: block;
		height: 8px;
		background-color: #f7f8fa;
	}
	@include element(cancel) {
		box-sizing: border-box;
		color: #646566;
	}
}
</style>