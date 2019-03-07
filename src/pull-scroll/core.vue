<template>
	<div ref="target">
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
		pauseY: {
			type: Number,
			default: 75,
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
		current: Number,
		status: Number
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
	beforeCreate() {
		this.prvScrollTop = 0;// 当前列表上次滚动到的位置
		this.timer = null;

		this.touching = false;
		this.shouldLoadForPull = true;
		this.isLoadingForScroll = false;

		this.startY = undefined; // 记录pull起始位置
		this.endY = undefined; // 记录pull当前位置
	},
	mounted() {
		this.container = (this.auto) 
			? window
			: this.$refs.target.parentNode;
		// pull
		this.container.addEventListener('touchstart', this.handleStart);
		this.container.addEventListener('touchmove', this.handleMove, { passive: false });
		this.container.addEventListener('touchend', this.handleEnd);
		this.container.addEventListener('mousedown', this.handleStart);
		this.container.addEventListener('mousemove', this.handleMove, { passive: false });
		this.container.addEventListener('mouseup', this.handleEnd);
		// scroll
		this.container.addEventListener('scroll', this.handleScroll);
	},
	destroyed() {
		// 解绑事件
		this.container.removeEventListener('touchstart', this.handleStart);
		this.container.removeEventListener('touchmove', this.handleMove);
		this.container.removeEventListener('touchend', this.handleEnd);
		this.container.removeEventListener('mousedown', this.handleStart);
		this.container.removeEventListener('mousemove', this.handleMove);
		this.container.removeEventListener('mouseup', this.handleEnd);
		this.container.removeEventListener('scroll', this.handleScroll);
	},
	methods: {
		getParams() {
			let isWindow = (this.container === window);

			let el = (isWindow) ? document : this.container;
			// https://stackoverflow.com/questions/12788487/document-scrolltop-always-returns-0
			let scrollTop = (isWindow) 
				? document.scrollingElement.scrollTop
				: el.scrollTop;
			// 容器高，视口的高
			let containerHeight = (isWindow) 
				? document.documentElement.clientHeight 
				: el.offsetHeight;
			// 内容的总高度
			let totalHeight = (isWindow) 
				? document.body.clientHeight 
				: el.scrollHeight;

			return {
				el,
				containerHeight,
				totalHeight,
				scrollTop
			};
		},
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
			// 延迟计算
			this.timer && clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				if (!this.show || this.isEnd == 2) {
					return;
				}

				const { scrollTop, totalHeight, containerHeight } = this.getParams();
				// 防止向上滚动也拉数据
				if (!reverse && this.prvScrollTop > scrollTop) {
					return;
				}
				this.prvScrollTop = scrollTop;
				
				if (
					(!reverse && scrollTop >= totalHeight - containerHeight - 100)
					|| (reverse && scrollTop == 0)
				) {
					this._loadData(false);
				}
			}, 50); 
		},

		handleStart(e) {
			this.touching = true;

			// 使微信不露底
			this.startYForWeiXin = event.touches 
				? event.touches[0].screenY 
				: event.screenY; 

			this.$emit('pull-start');
		},
		handleMove(e) {

			const eTouchScreenY = e.touches 
				? e.touches[0].screenY 
				: e.screenY; // 也可使用clientY
			let scrollStatus = '11';
			
			const { containerHeight, totalHeight, scrollTop } = this.getParams();
			if (scrollTop === 0) {
				// 如果内容小于容器则同时禁止上下滚动
				// '00'容器足够包含内容，本身就不应该支持滚动，'01'在顶部，支持上滑，向下滚动，支持滚动
				scrollStatus = containerHeight >= totalHeight ? '00' : '01';
			} else if (scrollTop + containerHeight >= totalHeight) {
				// 已经滚到底部了只支持下拉滚动，即向上滚动
				scrollStatus = '10';
			} // 其他情况属于 '11'

			if (scrollStatus != '11') {
				// 判断当前的滚动方向
				let direction = eTouchScreenY - this.startYForWeiXin > 0 ? '10' : '01';
				// 操作方向和当前允许状态求与运算，运算结果为0，就说明不允许该方向滚动，则禁止默认事件，阻止滚动
				if (!(parseInt(scrollStatus, 2) & parseInt(direction, 2))) { // 连着均是'10'或'01' 不阻止滚动
					e.preventDefault();
				}
			}


			if (!this.pull || !this.touching || this.isLoadingForScroll) return;
			if (this.status) { // 状态非0时
				const pulledY = (eTouchScreenY - this.startY) * this.scaleY; // 用scaleY对pull的距离进行缩放
				if (pulledY >= 0) { // 进行下拉
					this.endY = eTouchScreenY;
					this.$emit('update:y', this.status === 3 && pulledY < this.pauseY ? this.pauseY : pulledY);

					if (this.status !== 3) { // 在状态不为3时，即状态为1或2时
						if (pulledY > this.pauseY) { // 拉动的值超过设定的，即提示释放刷新
							if (this.status !== 2) {
								this.$emit('update:status', 2);
							}
						} else if (this.status !== 1) { // 拉动的值不超过设定的，即提示下拉刷新
							this.$emit('update:status', 1);
						}
					}
				} else { // 上滑，其实只有状态为3时才会进入该逻辑，pulledY < 0时，回到状态0
					// e.preventDefault(); // 屏蔽滚动
					this.$emit('update:status', 0);
					this.$emit('update:y', 0);
				}
			} else if (this.getParams().scrollTop === 0) { // 状态为0时, scrollTop为0时进入状态1
				this.startY = eTouchScreenY;
				this.$emit('update:status', 1);
			}
		},

		handleEnd() {
			if (!this.pull || this.isLoadingForScroll) return;

			if (this.status) {
				// 判断是否进入状态3还是回到状态0
				let isPause; 
				if (this.y > this.pauseY) {
					this.$emit('update:status', 3);

					// 强制置顶
					this.getParams().el.scrollTop = 0;

					// 准备去请求数据啦
					this.shouldLoadForPull && this._loadData(true);
					// 不允许下拉刷新获取数据
					this.shouldLoadForPull = false;
					isPause = true;
				} else {
					this.$emit('update:status', 0);
					isPause = false;
				}
			
				this.$emit('update:y', isPause ? this.pauseY : 0);
			}

			this.touching = false;

			this.$emit('pull-end');
		},
		reset() {
			this.$emit('update:y', 0);
			this.$emit('update:status', 0);
			this.shouldLoadForPull = true;
		},
		_loadData(isRefresh) {
			!isRefresh && (this.isLoadingForScroll = true);
			// 请求
			const load = this.loadData(isRefresh);
			if (load && load.then) {
				this.$emit('load-pending');
				load.then((res) => {
					this.$emit('load-success', res);
					return res;
				}).catch((res) => {
					this.$emit('load-fail', res);
					return Promise.reject(res);
				}).finally(() => {
					!isRefresh && (this.isLoadingForScroll = false);
					isRefresh && this.reset();
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
