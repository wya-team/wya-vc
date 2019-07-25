<template>
	<div class="vc-marquee">
		<div 
			:style="style" 
			:class="{ 'is-paused': !animated }" 
			class="vc-marquee__content"
		>
			<slot>
				<div 
					v-if="typeof content === 'string'"
					v-html="content"
				/>
				<vc-customer 
					v-else-if="typeof content === 'function'" 
					:render="content" 
				/>
			</slot>
		</div>
	</div>
</template>

<script>
import { Load } from '@wya/utils';
import { getUid, TRANSFORM_KEBAB, ANIMATION } from '../utils';
import Customer from '../customer';

export default {
	name: 'vc-marquee',
	components: {
		'vc-customer': Customer,
	},
	props: {
		// 每秒移动多少px
		speed: {
			type: Number,
			default: 50,
		},
		content: [String, Function],
		animated: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			duration: 0
		};
	},
	computed: {
		style() {
			return {
				[ANIMATION]: `${this.marqueeId} ${this.duration} linear 0s infinite` 
			};
		}
	},
	watch: {
		content: 'refresh', // TODO: render和slot下也支持重置
		speed: 'refresh',
	},
	beforeCreate() {
		this.marqueeId = getUid('marquee');
	},
	mounted() {
		this.refresh();
	},
	methods: {
		refresh() {
			let elW = this.$el.offsetWidth;
			let contentW = this.$el.firstChild.offsetWidth;

			const FROM = `from { ${TRANSFORM_KEBAB}: translateX(${elW}px) }`;
			const TO = `to { ${TRANSFORM_KEBAB}: translateX(-${contentW}px) }`;

			Load.cssCode(`@keyframes ${this.marqueeId} { ${FROM} ${TO} }`);

			this.duration = Math.max(contentW, elW) / this.speed + 's';
		},
	},
};
</script>

<style lang="scss">

@import '../style/index.scss';

$block: vc-marquee;

@include block($block) {
	white-space: nowrap;
	overflow: hidden;
	@include element(content) {
		display: inline-block;
		@include when(paused) {
			animation-play-state: paused;
		}
	}
}

</style>