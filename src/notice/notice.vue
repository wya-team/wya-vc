<template>
	<vc-transition-slide mode="right" @after-leave="handleRemove">
		<div 
			v-show="visible" 
			ref="target" 
			class="vc-notice__wrapper"
		>
			<vc-icon v-if="mode" :type="`o-${mode}`" :class="`is-${mode}`" class="vc-notice__icon"/>
			<div>
				<!-- title -->
				<div v-if="title" :style="{marginBottom: content ? '8px' : ''}" class="vc-notice__title">
					<p 
						v-if="typeof title === 'string'"
						v-html="title"
					/>
					<vc-customer
						v-else-if="typeof title === 'function'" 
						:render="title" 
					/>
				</div>
				
				<!-- content -->
				<div v-if="content" class="vc-notice__content">
					<p 
						v-if="typeof content === 'string'"
						v-html="content"
					/>
					<vc-customer
						v-else-if="typeof content === 'function'" 
						:render="content" 
					/>
				</div>
			</div>
			<!-- close -->
			<vc-icon 
				v-if="closable" 
				type="close"
				style="font-size: 12px"
				class="vc-notice__close"
				@click="handleClose" 
			/>
		</div>
	</vc-transition-slide>
</template>

<script>
import Icon from "../icon";
import Transition from '../transition';
import Customer from "../customer/index";

export default {
	name: 'vc-nontice',
	components: {
		'vc-icon': Icon,
		'vc-customer': Customer,
		'vc-transition-slide': Transition.Slide,
	},
	props: {
		title: [String, Function],
		content: [String, Function],
		duration: {
			type: Number,
			default: 4.5
		},
		closable: {
			type: Boolean,
			default: true,
		},
		mode: {
			type: String,
			validator: v => /(info|loading|success|error|warning)/.test(v)
		},
		beforeClose: Function
	},
	data() {
		return {
			// 先要隐藏在显示，才有transition
			visible: false,
		};
	},
	mounted() {
		this.visible = true;
		if (this.duration !== 0) {
			this.timer = setTimeout(() => {
				// 主线程
				this.visible = false;
			}, this.duration * 1000 - 300); // 动画时间
		}
	},
	destroyed() {
		this.timer && clearTimeout(this.timer);
	},
	methods: {
		handleRemove() {
			this.$emit('close');
		},
		async handleClose(e) {
			let visible = false;
			if (this.beforeClose) {
				visible = await this.beforeClose();
			}
			this.visible = visible;
		}
	}
};
</script>

<style lang="scss">
@import '../style/index.scss';

@include block(vc-notice) {
	position: fixed;
	right: 0px;
    top: 24px;
    bottom: auto;
	z-index: 4000;
	width: 384px;
	margin-right: 24px;
	box-sizing: border-box; 
	@include element(wrapper) {
		position: relative;
		margin-bottom: 16px;
		padding: 16px;
		overflow: hidden;
		display: flex;
		align-items: center;
		background: $white;
		box-shadow: $border-shadow;
		border-radius: 4px;
		font-size: 14px;
		@include element(title) {
			color: rgba(0, 0, 0, 0.85);
			padding-right: 24px;
			font-size: 16px;
			display: inline-block;
		}
		@include element(content) {
			line-height: 1.5;
			color: rgba(0, 0, 0, 0.65);
		}
		@include element(icon) {
			padding-right: 8px;
			font-size: 22px;
			line-height: 24px;
			align-self: flex-start;
			@include when(success) {
				color: $success;
			}
			@include when(error) {
				color: $error;
			}
			@include when(warning) {
				color: $warning;
			}
			@include when(info) {
				color: $info;
			}
		}
	}
	@include element(close) {
		position: absolute;
		top: 16px;
		right: 22px;
		font-size: 12px;
		cursor: pointer;
		height: 24px;
		display: inline-flex;
		align-items: center;
	}
}

</style>