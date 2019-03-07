<template>
	<div :style="{ transform: `translateY(${y}px)`}">
		<slot/>
	</div>
</template>

<script>

export default {
	name: '',
	components: {

	},
	props: {
		show: {
			type: Boolean,
			default: true
		},
		pull: Boolean,
		scroll: Boolean,
		scaleY: {
			type: Number,
			default: 0.4,
		},
		direction: {
			type: String,
			validator(value) {
				return ['up', 'down'].includes(value);
			},
			default: 'up'
		},
		dataSource: {
			type: Array,
			default: () => []
		},
		loadData: {
			type: Function,
			default: () => {},
		},
		y: Number,
		wrapper: String,
		isEnd: Number,
		current: Number
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
		this.prvScrollTop = 0;// 当前列表上次滚动到的位置
		this.timer = null;
	},
	mounted() {
		this.pullContainer = (this.wrapper) 
			? document.querySelector(this.wrapper) 
			: document.body;
		this.scrollContainer = (this.wrapper) 
			? document.querySelector(this.wrapper) 
			: window;
		// pull
		// this.pullContainer.addEventListener('touchstart', this.handleStart);
		// this.pullContainer.addEventListener('touchmove', this.handleMove, { passive: false });
		// this.pullContainer.addEventListener('touchend', this.handleEnd);
		// this.pullContainer.addEventListener('mousedown', this.handleStart);
		// this.pullContainer.addEventListener('mousemove', this.handleMove, { passive: false });
		// this.pullContainer.addEventListener('mouseup', this.handleEnd);
		// scroll
		this.scrollContainer.addEventListener('scroll', this.handleScroll);

		this.loadFirstData();
	},
	destroyed() {
		// 解绑事件
		// this.pullContainer.removeEventListener('touchstart', this.handleStart);
		// this.pullContainer.removeEventListener('touchmove', this.handleMove);
		// this.pullContainer.removeEventListener('touchend', this.handleEnd);
		// this.pullContainer.removeEventListener('mousedown', this.handleStart);
		// this.pullContainer.removeEventListener('mousemove', this.handleMove);
		// this.pullContainer.removeEventListener('mouseup', this.handleEnd);
		this.pullContainer.removeEventListener('scroll', this.handleScroll);
	},
	methods: {
		loadFirstData() {
			if (!this.show || this.isEnd > 0) { // 禁用，加载完成或者加载中无视
				return false;
			}
			if (this.current == 0) {
				this.loadData(false);
				/**
				 * 重新清理下高度参数
				 */
				this.prvScrollTop = 0;
			}
		},
		handleScroll(event) {
			const { scroll, direction } = this;
			if (!scroll) return;
			let isWindow = (this.scrollContainer === window);
			// 延迟计算
			this.timer && clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				if (!this.show || this.isEnd == 2) {
					return;
				}
				let scrollEle = (isWindow) 
					? document 
					: this.scrollContainer;

				// https://stackoverflow.com/questions/12788487/document-scrolltop-always-returns-0
				let scrollTop = (isWindow) 
					? document.scrollingElement.scrollTop
					: scrollEle.scrollTop;
				// 防止向上滚动也拉数据
				if (direction === 'up' && this.prvScrollTop > scrollTop) {
					return;
				}
				this.prvScrollTop = scrollTop;

				// 容器高，视口的高
				let containerHeight = (isWindow) 
					? document.documentElement.clientHeight 
					: scrollEle.offsetHeight;
				// 内容的总高度
				let scrollHeight = (isWindow) 
					? document.body.clientHeight 
					: scrollEle.scrollHeight;
				
				if (
					(direction == 'up' && scrollTop >= scrollHeight - containerHeight - 100)
					|| (direction == 'down' && scrollTop == 0)
				) {
					this.loadData(false);
				}
			}, 50); 
		}
	},
};
</script>

<style lang="scss" scoped>

</style>
