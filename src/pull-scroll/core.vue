<template>
	<div ref="target" :style="{ transform: `translateY(${y}px)`}">
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
		reverse: {
			type: Boolean,
			default: false
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
		auto: Boolean, // 是否有内部控制滚动
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
		current: {
			immediate: true,
			handler(value, old) {
				if (value == 0) {
					this.loadFirstData();
				}
			}
		}
	},
	created() {
		this.prvScrollTop = 0;// 当前列表上次滚动到的位置
		this.timer = null;
	},
	mounted() {
		this.pullContainer = (this.auto) 
			? document.body
			: this.$refs.target.parentNode;
		this.scrollContainer = (this.auto) 
			? window
			: this.$refs.target.parentNode;
		// pull
		this.pullContainer.addEventListener('touchstart', this.handleStart);
		this.pullContainer.addEventListener('touchmove', this.handleMove, { passive: false });
		this.pullContainer.addEventListener('touchend', this.handleEnd);
		this.pullContainer.addEventListener('mousedown', this.handleStart);
		this.pullContainer.addEventListener('mousemove', this.handleMove, { passive: false });
		this.pullContainer.addEventListener('mouseup', this.handleEnd);
		// scroll
		this.scrollContainer.addEventListener('scroll', this.handleScroll);
	},
	destroyed() {
		// 解绑事件
		this.pullContainer.removeEventListener('touchstart', this.handleStart);
		this.pullContainer.removeEventListener('touchmove', this.handleMove);
		this.pullContainer.removeEventListener('touchend', this.handleEnd);
		this.pullContainer.removeEventListener('mousedown', this.handleStart);
		this.pullContainer.removeEventListener('mousemove', this.handleMove);
		// this.pullContainer.removeEventListener('mouseup', this.handleEnd);
		this.pullContainer.removeEventListener('scroll', this.handleScroll);
	},
	methods: {
		loadFirstData() {
			if (!this.show || this.isEnd > 0) { // 禁用，加载完成或者加载中无视
				return false;
			}
			this._loadData(false);
			/**
			 * 重新清理下高度参数
			 */
			this.prvScrollTop = 0;
		},
		handleScroll(event) {
			const { scroll, reverse } = this;
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
				if (!reverse && this.prvScrollTop > scrollTop) {
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
					(!reverse && scrollTop >= scrollHeight - containerHeight - 100)
					|| (reverse && scrollTop == 0)
				) {
					this._loadData(false);
				}
			}, 50); 
		},
		_loadData(pullRefresh) {
			// 请求
			const load = this.loadData(pullRefresh);
			if (load && load.then) {
				this.$emit('load-pending');
				load.then((res) => {
					this.$emit('load-success', res);
					return res;
				}).catch((res) => {
					this.$emit('load-fail', res);
					return Promise.reject(res);
				}).finally(() => {
					this.$emit('load-finish');
				});
			} else {
				console.error('[vc-pull-scroll]-loadData need return a Promise');
			}
		},
	},
};
</script>

<style lang="scss" scoped>

</style>
