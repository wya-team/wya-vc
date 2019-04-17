<template>
	<vc-popover
		v-bind="$attrs"
		v-model="isActive"
		:placement="placement"
		:trigger="trigger"
	>
		<slot />
		<template #content>
			<div class="vc-popconfirm__content">
				<div class="vc-popconfirm__title">
					<slot name="icon">
						<vc-icon :type="type" :class="`is-${type}`" class="vc-popconfirm__icon" />
					</slot>
					<slot name="title">{{ title }}</slot>
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

export default {
	name: "vc-popconfirm",
	components: {
		'vc-popover': Popover,
		'vc-button': Button,
		'vc-icon': Icon,
	},
	inheritAttrs: false,
	model: {
		prop: 'visible',
		event: 'visible-change'
	},
	props: {
		// ...pick(Popover.props, [
		// 	'animate', 
		// 	'theme', 
		// 	'content', 
		// 	'getPopupContainer', 
		// 	'transfer', 
		// 	'arrow'
		// ]),
		title: String,
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
		}
	},
	data() {
		return {
			isActive: false
		};
	},
	computed: {
		
	},
	watch: {
		visible: {
			immediate: true,
			handler(v, old) {
				this.isActive = v;
			}
		}
	},
	methods: {
		handleClose() {
			this.$emit('visible-change', false);
			this.$emit('close');
		},
		handleOk(e) {
			let { $listeners: { ok } } = this;
			let callback = () => {
				this.isActive = false;
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
		}
	}
};
</script>
<style lang="scss">
@import '../style/index.scss';

@include block(vc-popconfirm) {
	padding: 7px 4px;
	@include element(title) {
		padding-left: 20px;
		padding-bottom: 12px;
		position: relative;
	}
	@include element(icon) {
		position: absolute;
		top: 0px;
		left: 0px;
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
		margin-bottom: 6px;
	}
}
</style>