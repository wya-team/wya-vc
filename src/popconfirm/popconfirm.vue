<template>
	<vc-popover
		v-bind="$attrs"
		:visible="isActive"
		:placement="placement"
		:trigger="trigger"
		:portal-class-name="['is-padding-none', 'vc-popconfirm']"
		@ready="$emit('ready')"
		@close="$emit('close')"
		@visible-change="handleChange"
	>
		<slot />
		<template #content>
			<div 
				:style="{ width: `${width}px` }" 
				class="vc-popconfirm__wrapper"
			>
				<div class="vc-popconfirm__title">
					<slot name="icon">
						<vc-icon :type="type" :class="`is-${type}`" class="vc-popconfirm__icon" />
					</slot>
					<div>
						<slot name="title">
							<vc-customer 
								:title="title"
								:render="renderTitle"
							/>
						</slot>
					</div>
				</div>
				<div :style="contentStyle" class="vc-popconfirm__content">
					<slot name="content">
						<vc-customer 
							:content="content"
							:render="renderContent"
						/>
					</slot>
				</div>
				<div class="vc-popconfirm__footer">
					<vc-button 
						:type="cancelType" 
						style="margin-right: 8px;"
						size="small"
						@click.stop.prevent="handleCancel"
					>
						{{ cancelText }}
					</vc-button>
					<vc-button 
						:type="okType" 
						size="small"
						@click.stop.prevent="handleOk"
					>
						{{ okText }}
					</vc-button>
				</div>
			</div>
		</template>
	</vc-popover>
</template>
<script>
import { pick } from 'lodash';
import Popover from "../popover/index";
import Button from '../button/index';
import Icon from '../icon/index';
import Customer from '../customer/index';

export default {
	name: "vc-popconfirm",
	components: {
		'vc-popover': Popover,
		'vc-button': Button,
		'vc-icon': Icon,
		'vc-customer': Customer
	},
	inheritAttrs: false,
	model: {
		prop: 'visible',
		event: 'visible-change'
	},
	props: {
		// ...pick(Popover.props, [
		// 	'animation', 
		// 	'theme', 
		// 	'content', 
		// 	'getPopupContainer', 
		// 	'portal', 
		// 	'portalStyle',
		// 	'portalClassName',
		// 	'arrow'
		// ]),
		// TODO: 直接支持title/content的Function模式，仍保留遗留API(renderTitle, renderContent)
		title: String,
		content: String,
		visible: {
			type: Boolean,
			default: false
		},
		placement: {
			type: String,
			default: 'top'
		},
		trigger: {
			type: String,
			default: 'click'
		},
		okText: {
			type: String,
			default: '确定'
		},
		cancelText: {
			type: String,
			default: '取消'
		},
		okType: {
			type: String,
			default: 'primary'
		},
		cancelType: {
			type: String,
			default: 'default'
		},
		type: {
			type: String,
			default: 'warning',
			validator: v => /(warning|info|success|error)/.test(v),
		},
		width: [String, Number],
		renderTitle: {
			type: Function,
			default: (h, props, parent) => {
				return (
					<div>{props.title}</div>
				);
			}
		},
		renderContent: {
			type: Function,
			default: (h, props, parent) => {
				return (
					<div>{props.content}</div>
				);
			}
		}
	},
	data() {
		return {
			isActive: false,
			hasContentSlot: false
		};
	},
	computed: {
		contentStyle() {
			const { content, renderContent, hasContentSlot } = this;
			return content || renderContent || hasContentSlot 
				? { marginBottom: '15px' }
				: {};
		}
	},
	watch: {
		visible: {
			immediate: true,
			handler(v, old) {
				this.isActive = v;
			}
		},
		isActive(v) {
			// ..
		}
	},
	mounted() {
		this.hasContentSlot = this.$slots.content || this.$scopedSlots.content;
	},
	methods: {
		handleOk(e) {
			let { $listeners: { ok } } = this;
			let callback = () => {
				this.isActive = false;

				this.sync();
			};
			let fn = ok && ok(e, callback);

			// loading效果由vc-btn触发
			if (fn && fn.then) {
				return fn.then((res) => {
					return res;
				}).catch((res) => {
					return Promise.reject(res);
				});
			} else if (!fn) {
				callback();
			}
		},
		handleCancel(e) {
			this.isActive = false;
			this.$emit('cancel', e);

			this.sync();
		},
		handleChange(v) {
			this.isActive = v;

			this.sync();
		},
		/**
		 * v-model 同步, 外部的数据改变时不会触发
		 */
		sync() {
			this.$emit('visible-change', this.isActive);
		}
	}
};
</script>
<style lang="scss">
@import '../style/vars.scss';

@include block(vc-popconfirm) {
	@include element(wrapper) {
		padding: 16px;
		min-width: 218px;
	}
	@include element(title) {
		padding-left: 23px;
		margin-bottom: 15px;
		position: relative;
		color: #333;
	}
	@include element(icon) {
		position: absolute;
		top: 1px;
		left: 0px;
		font-size: 15px;
		@include when(warning) {
			color: $warning;
		}
		@include when(info) {
			color: $info;
		}
		@include when(success) {
			color: $success;
		}
		@include when(error) {
			color: $error;
		}
	}
	@include element(footer) {
		text-align: right;
	}
}
</style>