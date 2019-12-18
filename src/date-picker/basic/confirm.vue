<template>
	<div class="vc-date-confirm">
		<!-- 需要一个置灰的控制 -->
		<vc-button 
			v-if="showTime"
			size="small" 
			type="text" 
			class="vc-date-confirm__time"
			@click="handleToggleTime"
		>
			{{ label }}
		</vc-button>
		<vc-button size="small" @click="handleClear">清空</vc-button>
		<vc-button size="small" type="primary" @click="handleConfirm">确定</vc-button>
	</div>
</template>

<script>
import Button from '../../button/index';

export default {
	name: 'vc-date-confirm',
	components: {
		'vc-button': Button
	},
	props: {
		showTime: {
			type: Boolean,
			default: false
		},
		currentView: {
			type: String,
			default: 'date'
		}
	},
	data() {
		return {
		};
	},
	computed: {
		label() {
			return this.currentView === 'date' ? '选择时间' : '选择日期';
		}
	},
	watch: {
		
	},
	created() {
		
	},
	methods: {
		handleToggleTime(e) {
			this.$emit('toggle-time', this.currentView === 'date' ? 'time' : 'date');
		},
		handleConfirm(e) {
			this.$emit('ok', e);
		},
		handleClear(e) {
			this.$emit('clear', e);
		}
	},
};
</script>

<style lang="scss">
@import '../../style/index.scss';

$block: vc-date-confirm;

@include block($block) {
	border-top: 1px solid #e8eaec;
    text-align: right;
    padding: 8px;
    clear: both;
	@include element(time) {
		float: left;
	}
}
</style>
