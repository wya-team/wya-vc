<template>
	<div class="vc1-popover-basic" style="background: #f2f2f2; height: 3000px">
		<div ref="parent" class="_btn-container">
			<div class="__left" style="margin-top: 32px; margin-bottom: 32px">
				<vc-popover 
					:get-popup-container="getPopupContainer"
					trigger="click" 
					placement="left-top"
					content="LeftTop"
					@visible-change="handleVisibleChange"
				>
					<vc-button class="_btn _m-tb-10">
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
					trigger="click" 
					placement="left" 
					content="Left"
				>
					<vc-button class="_btn _m-tb-10">
						Left
					</vc-button>
					<template #content>
						<div style="height: 100px; width: 200px">
							跟随父节点
							<span @click="visible = false">点击我关闭弹窗</span>
						</div>
					</template>
				</vc-popover>
				<vc-popover trigger="click" placement="left-bottom" content="LeftBottom">
					<vc-button class="_btn _m-tb-10">
						LB
					</vc-button>
					<template #content>
						<div style="height: 100px; width: 200px">
							Body
						</div>
					</template>
				</vc-popover>
			</div>
			<div class="__middle">
				<div class="_flex-jc-sb">
					<vc-popover 
						:get-popup-container="getPopupContainer"
						trigger="click" 
						placement="top-left" 
						content="TopLeft"
					>
						<vc-button class="_btn _m-lr-10">
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
						trigger="click" 
						placement="top" 
						content="Top"
					>
						<vc-button class="_btn _m-lr-10">
							Top
						</vc-button>
						<template #content>
							<div style="height: 100px; width: 200px">
								transfer="false"
							</div>
						</template>
					</vc-popover>
					<vc-popover 
						trigger="click" 
						placement="top-right" 
						content="TopRight"
					>
						<vc-button class="_btn _m-lr-10">
							TR
						</vc-button>
						<template #content>
							<div style="height: 100px; width: 200px">
								Body
							</div>
						</template>
					</vc-popover>
				</div>
				<div class="_flex-jc-sb">
					<vc-popover 
						:get-popup-container="getPopupContainer"
						trigger="click" 
						placement="bottom-left"
						content="BottomLeft"
					>
						<vc-button class="_btn _m-lr-10">
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
						trigger="click" 
						placement="bottom" 
						content="Bottom"
					>
						<vc-button class="_btn _m-lr-10">
							Bottom
						</vc-button>
						<template #content>
							<div style="height: 100px; width: 200px">
								transfer="false"
							</div>
						</template>
					</vc-popover>
					<vc-popover 
						trigger="click" 
						placement="bottom-right"
						content="BottomRight"
					>
						<vc-button class="_btn _m-lr-10">
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
			<div class="__right" style="margin-top: 32px; margin-bottom: 32px">
				<vc-popover 
					:get-popup-container="getPopupContainer"
					trigger="click" 
					placement="right-top" 
					content="RightTop"
				>
					<vc-button class="_btn _m-tb-10">
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
					trigger="click" 
					placement="right" 
					content="Right"
				>
					<vc-button class="_btn _m-tb-10">
						Right
					</vc-button>
					<template #content>
						<div style="height: 100px; width: 200px">
							transfer="false"
						</div>
					</template>
				</vc-popover>
				<vc-popover 
					trigger="click" 
					placement="right-bottom" 
					content="RightBottom"
				>
					<vc-button class="_btn _m-tb-10">
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
			visible: false
		};
	},
	computed: {
		
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
		}
	}
};
</script>

<style lang="scss">
.vc1-popover-basic {
	padding: 50px 0 0 0;
	// overflow: auto;
	// height: 1400px; 
	display: flex;
	align-items: flex-start;
	justify-content: center;
	._btn-container {
		display: flex;
		height: 400px; 
		width: auto; 
		margin-top: 200px; 
		overflow: unset; 
		position: relative; 
		background: #666666;
		.__left {
			display: flex;
			flex-direction: column;
			margin-right: 10px;
		}
		.__middle {
			display: flex;
			flex-direction: column;
			justify-content: space-between
		}
		.__right {
			display: flex;
			flex-direction: column;
			margin-left: 10px;
		}
	}
	._m-lr-10 {
		margin-right: 10px;
		margin-left: 10px;
	}
	._m-tb-10 {
		margin-top: 10px;
		margin-bottom: 10px;
	}
	._flex-jc-sb {
		display: flex;
		justify-content: space-between
	}
	._btn {
		width: 80px
	}
}
</style>

