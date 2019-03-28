<template>
	<vc-popover
		v-model="show"
		:placement="placement"
		:trigger="trigger"
	>
		<slot />
		<template #content>
			<div class="vc-popconfirm-content">
				<div class="__popconfirm-title">
					<slot name="icon">
						<vc-icon :type="type" :class="iconColor" class="__popconfirm-icon" />
					</slot>
					<slot name="title">{{ title }}</slot>
				</div>
				<div class="__popconfirm-footer">
					<vc-button 
						:type="cancelType" 
						style="margin-right: 8px;"
						size="small"
						@click="handleCancel"
					>
						{{ cancelText }}
					</vc-button>
					<vc-button 
						:type="okType" 
						size="small"
						@click="handleOk"
					>
						{{ okText }}
					</vc-button>
				</div>
			</div>
		</template>
	</vc-popover>
</template>
<script>
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
	props: {
		...Popover.props,
		title: String,
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
			default: 'warn',
			validator: (value) => (['warn', 'info', 'success', 'error'].indexOf(value) !== -1)
		}
	},
	data() {
		return {
			show: this.visible
		};
	},
	computed: {
		iconColor() {
			return `__popconfirm-icon-${this.type}`;
		}
	},
	methods: {
		handleOk(e) {
			this.show = false;
			this.$emit('ok', e);
		},
		handleCancel(e) {
			this.show = false;
			this.$emit('cancel', e);
		}
	}
};
</script>
<style lang="scss">
.vc-popconfirm-content {
	padding: 7px 4px;
	.__popconfirm-title {
		padding-left: 20px;
		padding-bottom: 12px;
		position: relative;
		.__popconfirm-icon {
			position: absolute;
			top: 0px;
			left: 0px;
			&-warn {
				color: #ffbf00;
			}
			&-info {
				color: #0177de;
			}
			&-success {
				color: #00a854;
			}
			&-error {
				color: #f04134;
			}
		}
	}
	.__popconfirm-footer {
		text-align: right;
		margin-bottom: 6px;
	}
}
</style>