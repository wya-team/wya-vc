<template>
	<div 
		:class="{'vcp-imgs-picker__error': it.status == 0, imgClassName, boxClassName}"
		class="vcp-imgs-picker__item vcp-imgs-picker__box"
	>
		<slot :it="it">
			<div
				v-if="typeof it !== 'object'"
				:style="{backgroundImage: `url('${it}')`}"
				:class="imgClasses"
				@click="handlePreview"
			/>
			<div v-else :class="imgClasses">
				<vc-progress
					v-if="it.percent && it.percent != 100" 
					:percent="it.percent"
					:show-info="false"
					status="normal"
					style="width: 100%;padding: 0 5px"
				/>
				<p v-else-if="!it.url && it.percent == 100" style="line-height: 1; padding: 5px">
					服务器正在接收...
				</p>
				<div v-else-if="it.status == 0" style="padding: 5px">
					上传失败
				</div>
			</div>
			<!-- 上传失败或者成功后显示 -->
			<vc-icon 
				v-if="!disabled && (typeof it !== 'object' || it.status == 0)" 
				type="clear" 
				class="vcp-imgs-picker__delete"
				@click="handleDel(it)" 
			/>
			<div class="vcp-imgs-picker__delete--bg"/>
		</slot>
	</div>
</template>

<script>
import Icon from '../icon/index';

export default {
	name: 'vc-imgs-picker-item',
	components: {
		'vc-icon': Icon,
	},
	props: {
		imgClassName: String,
		boxClassName: String,
		imgClasses: String,
		disabled: Boolean,
		it: {
			type: String | Object,
			default: ''
		}
	},
	data() {
		return {
		};
	},
	computed: {

	},
	watch: {
		
	},
	created() {
		
	},
	methods: {
		handlePreview(e) {
			this.$emit('preview', event);
		},
		handleDel(it) {
			this.$emit('delete', it);
		}
	},
};
</script>

<style lang="scss">
</style>
