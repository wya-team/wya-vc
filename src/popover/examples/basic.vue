<template>
	<div class="vc-popover-basic" style="background: #f2f2f2; height: 3000px">
		<div ref="parent" class="_btn-container">
			<div class="__left" style="margin-top: 32px; margin-bottom: 32px">
				<vc-popover 
					:get-popup-container="getPopupContainer"
					trigger="click" 
					placement="left-top"
					content="LeftTop"
				>
					<vc-button class="_btn _m-tb-10">
						LT
					</vc-button>
					<div slot="content" style="height: 100px; width: 200px">
						getPopupContainer
					</div>
				</vc-popover>
				<vc-popover 
					:transfer="false"
					trigger="click" 
					placement="left" 
					content="Left"
				>
					<vc-button class="_btn _m-tb-10">
						Left
					</vc-button>
					<div slot="content" style="height: 100px; width: 200px">
						transfer="false"
					</div>
				</vc-popover>
				<vc-popover trigger="click" placement="left-bottom" content="LeftBottom">
					<vc-button class="_btn _m-tb-10">
						LB
					</vc-button>
					<div slot="content" style="height: 100px; width: 200px">
						Body
					</div>
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
						<div slot="content" style="height: 100px; width: 200px">
							getPopupContainer
						</div>
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
						<div slot="content" style="height: 100px; width: 200px">
							transfer="false"
						</div>
					</vc-popover>
					<vc-popover 
						trigger="click" 
						placement="top-right" 
						content="TopRight"
					>
						<vc-button class="_btn _m-lr-10">
							TR
						</vc-button>
						<div slot="content" style="height: 100px; width: 200px">
							Body
						</div>
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
						<div slot="content" style="height: 100px; width: 200px">
							getPopupContainer
						</div>
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
						<div slot="content" style="height: 100px; width: 200px">
							transfer="false"
						</div>
					</vc-popover>
					<vc-popover 
						trigger="click" 
						placement="bottom-right"
						content="BottomRight"
					>
						<vc-button class="_btn _m-lr-10">
							BR
						</vc-button>
						<div slot="content" style="height: 100px; width: 200px">
							Body
						</div>
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
					<div slot="content" style="height: 100px; width: 200px">
						getPopupContainer
					</div>
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
					<div slot="content" style="height: 100px; width: 200px">
						transfer="false"
					</div>
				</vc-popover>
				<vc-popover 
					trigger="click" 
					placement="right-bottom" 
					content="RightBottom"
				>
					<vc-button class="_btn _m-tb-10">
						RB
					</vc-button>
					<div slot="content" style="height: 100px; width: 200px">
						Body
					</div>
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
		};
	},
	computed: {
		
	},
	methods: {
		getPopupContainer() {
			return this.$refs.parent;
		}
	}
};
</script>

<style lang="scss">
.vc-popover-basic {
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

