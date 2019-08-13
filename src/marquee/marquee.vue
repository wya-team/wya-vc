<template>
	<div class="vc-marquee">
		<div 
			:style="style" 
			:class="{ 'is-paused': paused }" 
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
		autoplay: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			duration: 0,
			elW: 0,
			contentW: 0
		};
	},
	computed: {
		paused() {
			return !this.animated || (!this.autoplay && this.contentW < this.elW);
		},
		style() {
			return {
				[ANIMATION]: `${this.marqueeId} ${this.duration}s linear 0s ${this.paused ? 'paused' : 'running'} infinite` 
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
		// 兼容Portal前动画延迟
		setTimeout(this.refresh, 0);
	},
	methods: {
		refresh() {
			this.elW = this.$el.offsetWidth;
			this.contentW = this.$el.firstChild.offsetWidth;

			if (this.paused) return;

			const FROM = `from { ${TRANSFORM_KEBAB}: translateX(${this.elW}px) }`;
			const TO = `to { ${TRANSFORM_KEBAB}: translateX(-${this.contentW}px) }`;

			Load.cssCode(`@keyframes ${this.marqueeId} { ${FROM} ${TO} }`);

			this.duration = (this.elW + this.contentW) / this.speed;
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