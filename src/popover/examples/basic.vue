<template>
	<div class="vc-popover-basic">
		<div @click="isHover=!isHover">{{ trigger }}</div>
		<div ref="parent" class="vc-popover-basic__container">
			<div class="vc-popover-basic__left" style="margin-top: 32px; margin-bottom: 32px">
				<vc-popover 
					:get-popup-container="getPopupContainer"
					:visible="true" 
					:trigger="trigger"
					placement="left-top"
					content="LeftTop"
					theme="dark"
					@visible-change="handleVisibleChange"
					@close="handleClose"
				>
					<vc-button class="g-btn g-m-tb-10">
						LT
					</vc-button>
					<template #content>
						<div style="height: 100px; width: 200px">
							动态改变内容{{ content }}
						</div>
					</template>
					
				</vc-popover>
				<vc-popover 
					v-model="visible"
					:transfer="false"
					:trigger="trigger" 
					placement="left" 
					content="Left"
				>
					<vc-button class="g-btn g-m-tb-10">
						Left
					</vc-button>
					<template #content>
						<div style="height: 100px; width: 200px">
							跟随父节点
							<span @click="visible = false">点击我关闭弹窗</span>
						</div>
					</template>
				</vc-popover>
				<vc-popover :trigger="trigger" placement="left-bottom" content="LeftBottom">
					<vc-button class="g-btn g-m-tb-10">
						LB
					</vc-button>
					<template #content>
						<div style="height: 100px; width: 200px">
							Body
						</div>
					</template>
				</vc-popover>
			</div>
			<div class="vc-popover-basic__middle">
				<div class="g-jc-sb">
					<vc-popover 
						:get-popup-container="getPopupContainer"
						:trigger="trigger" 
						placement="top-left" 
						content="TopLeft"
					>
						<vc-button class="g-btn g-m-lr-10">
							TL
						</vc-button>
						<template #content>
							<div style="height: 100px; width: 200px">
								getPopupContainer
							</div>
						</template>
					</vc-popover>
					<vc-popover 
						:transfer="false"
						:trigger="trigger" 
						placement="top" 
						content="Top"
					>
						<vc-button class="g-btn g-m-lr-10">
							Top
						</vc-button>
						<template #content>
							<div style="height: 100px; width: 200px">
								transfer="false"
							</div>
						</template>
					</vc-popover>
					<vc-popover 
						:trigger="trigger" 
						placement="top-right" 
						content="TopRight"
					>
						<vc-button class="g-btn g-m-lr-10">
							TR
						</vc-button>
						<template #content>
							<div style="height: 100px; width: 200px">
								Body
							</div>
						</template>
					</vc-popover>
				</div>
				<div class="g-jc-sb">
					<vc-popover 
						:get-popup-container="getPopupContainer"
						:trigger="trigger" 
						placement="bottom-left"
						content="BottomLeft"
					>
						<vc-button class="g-btn g-m-lr-10">
							BL
						</vc-button>
						<template #content>
							<div style="height: 100px; width: 200px">
								getPopupContainer
							</div>
						</template>
					</vc-popover>
					<vc-popover 
						:transfer="false"
						:trigger="trigger" 
						placement="bottom" 
						content="Bottom"
					>
						<vc-button class="g-btn g-m-lr-10">
							Bottom
						</vc-button>
						<template #content>
							<div style="height: 100px; width: 200px">
								transfer="false"
							</div>
						</template>
					</vc-popover>
					<vc-popover 
						:trigger="trigger" 
						placement="bottom-right"
						content="BottomRight"
					>
						<vc-button class="g-btn g-m-lr-10">
							BR
						</vc-button>
						<template #content>
							<div style="height: 100px; width: 200px">
								Body
							</div>
						</template>
					</vc-popover>
				</div>
			</div>
			<div class="vc-popover-basic__right" style="margin-top: 32px; margin-bottom: 32px">
				<vc-popover 
					:get-popup-container="getPopupContainer"
					:trigger="trigger" 
					placement="right-top" 
					content="RightTop"
				>
					<vc-button class="g-btn g-m-tb-10">
						RT
					</vc-button>
					<template #content>
						<div style="height: 100px; width: 200px">
							getPopupContainer
						</div>
					</template>
				</vc-popover>
				<vc-popover 
					:transfer="false"
					:trigger="trigger" 
					placement="right" 
					content="Right"
				>
					<vc-button class="g-btn g-m-tb-10">
						Right
					</vc-button>
					<template #content>
						<div style="height: 100px; width: 200px">
							transfer="false"
						</div>
					</template>
				</vc-popover>
				<vc-popover 
					:trigger="trigger" 
					placement="right-bottom" 
					content="RightBottom"
				>
					<vc-button class="g-btn g-m-tb-10">
						RB
					</vc-button>
					<template #content>
						<div style="height: 100px; width: 200px">
							Body
						</div>
					</template>
				</vc-popover>
			</div>
		</div>
	</div>
</template>

<script>
import Popover from '../popover'; 
import Button from '../../button/button';

export default {
	name: "vc-popover-basic",
	components: {
		"vc-popover": Popover,
		"vc-button": Button
	},
	data() {
		return {
			content: 1,
			visible: false,
			isHover: false
		};
	},
	computed: {
		trigger() {
			return this.isHover ? 'hover' : 'click';
		}
	},
	mounted() {
		setTimeout(() => {
			this.content = 111111;
		}, 5000);
	},
	methods: {
		getPopupContainer() {
			return this.$refs.parent;
		},
		handleVisibleChange(visible) {
			console.log('visible: ', visible);
		},
		handleClose() {
			console.log('close');
		}
	}
};
</script>

<style lang="scss">
@import '../../style/index.scss';

.g-m-lr-10 {
	margin-right: 10px;
	margin-left: 10px;
}
.g-m-tb-10 {
	margin-top: 10px;
	margin-bottom: 10px;
}
.g-jc-sb {
	display: flex;
	justify-content: space-between
}
.g-btn {
	width: 80px
}

@include block(vc-popover-basic) {
	padding: 50px 0 0 0;
	display: flex;
	align-items: flex-start;
	justify-content: center;
	background: #f2f2f2; 
	height: 3000px;
	@include element(container) {
		display: flex;
		height: 400px; 
		width: auto; 
		margin-top: 200px; 
		overflow: unset; 
		position: relative; 
		background: #666666;
		@include element(left) {
			display: flex;
			flex-direction: column;
			margin-right: 10px;
		}
		@include element(middle) {
			display: flex;
			flex-direction: column;
			justify-content: space-between
		}
		@include element(right) {
			display: flex;
			flex-direction: column;
			margin-left: 10px;
		}
	}
}
</style>

