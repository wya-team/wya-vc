<template>
	<div class="vcm-cascader-alphabet vc-hack-scroll">
		<ul 
			ref="list"
			class="vcm-cascader-alphabet__list"
			@touchstart.stop="handleStart"
			@touchmove.stop="handleMove"
		>
			<li
				v-for="letter in alphabet"
				:key="letter"
				class="vcm-cascader-alphabet__item"
				@click="handleTap(letter)"
			>
				{{ letter }}
			</li>
		</ul>
	</div>
</template>

<script>
import { throttle } from 'lodash';

export default {
	name: 'vcm-cascader-alphabet',
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		value: {
			type: String,
			default: ''
		},
		alphabet: {
			type: Array,
			default: () => ([])
		}
	},
	data() {
		return {
			startY: 0,
			barHeight: 0,
			screenTop: 0
		};
	},
	computed: {
		itemHeight() {
			return this.barHeight / this.alphabet.length;
		}
	},
	methods: {
		initData() {
			const rect = this.$refs.list.getBoundingClientRect();
			this.barHeight = rect.height;
			this.screenTop = rect.top;
		},
		handleTap(letter) {
			this.$emit('change', letter);
		},
		handleStart() {
			this.initData();
		},
		handleMove: throttle(function (e) {
			const target = e.touches[0];
			// 不在有效滑动范围内的touchmove
			if (target.pageY < this.screenTop || target.pageY > this.screenTop + this.barHeight) return;
			
			const distance = target.pageY - this.screenTop;
			const index = Math.floor(distance / this.itemHeight);
			const letter = this.alphabet[index];
			if (letter !== this.value) {
				this.$emit('change', letter);
			}
		}, 100)
	}
};
</script>

<style lang="scss">
@import '../../style/index.scss';

@include block(vcm-cascader-alphabet) {
	overflow-y: auto;
	position: absolute;
	top: 6px;
	right: 0;
	height: 100%;
	width: 36px;
	text-align: center;
	user-select: none;
	@include element(list) {
		list-style: none;
	}
	@include element(item) {
		font-size: 10px;
		line-height: 1.2;
		color: #5495f6;
		text-align: center;
	}
}
</style>
