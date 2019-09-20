<template>
	<div ref="target">
		<slot/>
	</div>
</template>

<script>
import { VcError } from '../vc/index';

export default {
	name: '',
	components: {

	},
	props: {
		show: {
			type: Boolean,
			default: true
		},
		pullDown: Boolean,
		pullUp: Boolean,
		scroll: Boolean,
		scaleY: {
			type: Number,
			default: 0.4,
		},
		pauseY: {
			type: Number,
			default: 75,
		},
		inverted: {
			type: Boolean,
			default: false
		},
		dataSource: {
			type: Array,
			default: () => []
		},
		loadData: Function,
		y: Number,
		auto: Boolean, // 是否有内部控制滚动
		current: [String, Number],
		total: [String, Number],
		scrollStatus: Number,
		scrollThreshold: {
			type: Number,
			default: 200,
		},
		pullDownStatus: Number,
		prePullDownStatus: Number,
		pullUpStatus: Number,
		prePullUpStatus: Number
	},
	data() {
		return {
		};
	},
	computed: {

	},
	watch: {
		total: {
			immediate: true,
			handler(v, old) {
				if (v == 0) {
					this.loadFirstData();
				}
			}
		},
		show(v, old) {
			if (v && old === false && this.total == 0) {
				this.loadFirstData();
			}
		}
	},
	beforeCreate() {
		this.preScrollTop = 0;// 当前列表上次滚动到的位置
		this.preTotalHeight = 0;
		this.timer = null;

		this.touching = false;
		this.shouldLoadForPullDown = true;
		this.shouldLoadForPullUp = true;

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
			if (!this.show || (this.total != 0 && this.scrollStatus > 0)) { // 禁用，加载完成或者加载中无视
				return false;
			}
			this._loadData({
				type: 'scroll', // 默认
				page: 1,
			});
			/**
			 * 重新清理下高度参数
			 */
			this.preScrollTop = 0;
		},
		handleScroll(event) {
			const { scroll, inverted } = this;
			if (!scroll || this.total === 0) return;
			// 延迟计算
			this.timer && clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				if (!this.show || this.scrollStatus == 2) {
					return;
				}

				const { scrollTop, totalHeight, containerHeight } = this.getParams();

				// 防止向上滚动也拉数据
				if (!inverted && this.preScrollTop > scrollTop) {
					return;
				}
				this.preScrollTop = scrollTop;
				
				if (
					(!inverted && scrollTop >= totalHeight - containerHeight - this.scrollThreshold)
					|| (inverted && scrollTop == 0)
				) {
					this._loadData({
						type: 'scroll',
						page: this.current + 1,
					});
				}
			}, 50); 
		},

		handleStart(e) {
			this.touching = true;

			this.startY = event.touches 
				? event.touches[0].screenY 
				: event.screenY; 

			this.$emit('pull-start');
		},
		handleMove(e) {
			const { status, direction } = this._moveBoundary(e);

			if (!this.touching || this.isLoadingForScroll) return;

			const eTouchScreenY = e.touches 
				? e.touches[0].screenY 
				: e.screenY; // 也可使用clientY

			const pulledY = (eTouchScreenY - this.startY) * this.scaleY; // 用scaleY对pull的距离进行缩放

			// 下拉逻辑
			if (direction === '10') {
				if (this.pullDownStatus) { // 状态非0时
					if (pulledY >= 0) { // 进行下拉
						this.endY = eTouchScreenY;
						this.$emit('update:y', this.pullDownStatus === 3 && pulledY < this.pauseY ? this.pauseY : pulledY);

						if (this.pullDownStatus !== 3) { // 在状态不为3时，即状态为1或2时
							if (pulledY > this.pauseY) { // 拉动的值超过设定的，即提示释放刷新
								if (this.pullDownStatus !== 2) {
									this.$emit('update:pull-down-status', 2);
								}
							} else if (this.pullDownStatus !== 1) { // 拉动的值不超过设定的，即提示下拉刷新
								this.$emit('update:pull-down-status', 1);
							}
						}
					} else { // 上滑，其实只有状态为3时才会进入该逻辑，pulledY < 0时，回到状态0
						// e.preventDefault(); // 屏蔽滚动
						this.$emit('update:pull-down-status', 0);
						this.$emit('update:y', 0);
					}
				} else if (this.getParams().scrollTop === 0) { // 状态为0时, scrollTop为0时进入状态1
					this.startY = eTouchScreenY;
					this.$emit('update:pull-down-status', 1);
				}
			} else {
				const { scrollTop, totalHeight, containerHeight } = this.getParams();

				// 上拉逻辑
				if (this.pullUpStatus) {
					if (pulledY < 0) {
						this.endY = eTouchScreenY;
						this.$emit('update:y', this.pullUpStatus === 3 && pulledY < -this.pauseY ? -this.pauseY : pulledY);

						if (this.pullUpStatus !== 3) { // 在状态不为3时，即状态为1或2时
							if (-pulledY > this.pauseY) { // 拉动的值超过设定的，即提示释放刷新
								if (this.pullUpStatus !== 2) {
									this.$emit('update:pull-up-status', 2);
								}
							} else if (this.pullUpStatus !== 1) { // 拉动的值不超过设定的，即提示下拉刷新
								this.$emit('update:pull-up-status', 1);
							}
						} else {
							this.$emit('update:pull-up-status', 0);
							this.$emit('update:y', 0);
						}
					} 
				} else if (
					(this.scrollStatus == 2 || !this.scroll)
					&& scrollTop + containerHeight === totalHeight
					&& pulledY < 0
				) {
					this.startY = eTouchScreenY;
					this.$emit('update:pull-up-status', 1);
				}
			}
		},

		handleEnd() {
			if (this.isLoadingForScroll) {
				this.resetDefaultStatus();
				return;
			}

			// 下拉逻辑
			if (this.pullDownStatus) {
				// 判断是否进入状态3还是回到状态0
				let isPause; 
				if (this.pullDown && this.y > this.pauseY) {
					this.$emit('update:pull-down-status', 3);

					// 强制置顶
					this.getParams().el.scrollTop = 0;

					// 准备去请求数据啦
					this.shouldLoadForPullDown && this._loadData({
						type: 'pull-down',
						page: 1,
						method: this.$listeners['pull-down-end']
					});

					// 不允许下拉刷新获取数据
					this.shouldLoadForPullDown = false;
					isPause = true;
				} else {
					this.resetDefaultStatus('pull-down-status');
					isPause = false;
				}
				this.$emit('update:y', isPause ? this.pauseY : 0);
			}

			// 上拉逻辑
			if (this.pullUpStatus) {
				// 判断是否进入状态3还是回到状态0
				let isPause; 
				if (this.pullUp && -this.y > this.pauseY) {
					this.$emit('update:pull-up-status', 3);

					// 准备去请求数据啦
					if (this.shouldLoadForPullUp) {
						this._loadData({
							type: 'pull-up',
							page: this.current + 1,
							method: this.$listeners['pull-up-end']
						});
					}

					// 不允许上拉刷新获取数据
					this.shouldLoadForPullUp = false;

					isPause = true;
				} else {
					this.resetDefaultStatus('pull-up-status');
					isPause = false;
				}
				this.$emit('update:y', isPause ? -this.pauseY : 0);
			}

			this.touching = false;
			this.$emit('pull-end');
		},

		resetDefaultStatus() {
			this.$emit('update:pull-down-status', 0);
			this.$emit('update:pull-up-status', 0);
			this.shouldLoadForPullDown = true;
			this.shouldLoadForPullUp = true;

			// 动画结束后
			this.timer && clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				this.$emit('update:pre-pull-down-status', 0);
				this.$emit('update:pre-pull-up-status', 0);
			}, 300);
		},

		_loadData({ page, type, method }) {
			if (this.isLoadingForScroll) return;
			let scroll = type === 'scroll';

			scroll && (this.isLoadingForScroll = true);

			let { loadData } = this;
			loadData = method || loadData || (() => Promise.resolve([]));

			// 请求
			const load = loadData(page, type === 'pull-down', this);
			if (load && load.then) {
				this.$emit('load-pending', { type, scroll });

				// 倒致处理
				if (this.inverted && page != 1) {
					this.preTotalHeight = this.getParams().totalHeight;
				}
				let onSuccess = data => {
					// 倒致处理: 滚动到加载前的位置(图片需要额外处理，在可视化内图片向下撑开，不可视范围内存在滚动条不影响)
					if (this.inverted) {
						const { totalHeight, containerHeight } = this.getParams();
						if (page == 1) {
							this.scrollTo(totalHeight - containerHeight);
						} else {
							let ele = this.$parent.$refs.header;
							// TODO: 是否有必要添加headers所使用的高度或者让用户自行固定header高度
							// let offset = ele ? ele.getBoundingClientRect().height : 0;
							let offset = 0;
							this.scrollTo(totalHeight - this.preTotalHeight + offset);
						}
					}
					this.$emit('load-success', { data, page, type });
					return data;
				};

				let onError = data => {
					this.$emit('load-fail', { data, type, page });
					return Promise.reject(data);
				};

				let onFinally = () => {
					scroll && (this.isLoadingForScroll = false);

					// y的位置为0;
					this.$emit('update:y', 0);

					// 初始化状态
					this.resetDefaultStatus();
					this.$emit('load-finish', { type });

					// 下拉逻辑，清0
					type === 'pull-down' && (this.preScrollTop = 0);
				};

				load.then(onSuccess).catch(onError).finally(onFinally);
			} else {
				throw new VcError('pull-scroll', '方法必须是 Promise');
			}
		},

		scrollTo(v) {
			let isWindow = (this.container === window);
			let el = (isWindow) ? document.scrollingElement : this.container;
			// https://stackoverflow.com/questions/12788487/document-scrolltop-always-returns-0
			el && (el.scrollTop = v);
		},

		scrollToTop() {
			this.scrollTo(1);
		},

		scrollToEnd() {
			this.scrollTo(Number.MAX_SAFE_INTEGER);
		},

		scrollIntoView() {
			// Todo
		},

		/**
		 * 微信顶部滑动，屏蔽网址
		 */
		_moveBoundary(e) {
			const eTouchScreenY = e.touches 
				? e.touches[0].screenY 
				: e.screenY; // 也可使用clientY

			let status = '11';
			
			const { containerHeight, totalHeight, scrollTop } = this.getParams();
			if (scrollTop === 0) {
				// 如果内容小于容器则同时禁止上下滚动
				// '00'容器足够包含内容，本身就不应该支持滚动，'01'在顶部，支持上滑，向下滚动，支持滚动
				status = containerHeight >= totalHeight ? '00' : '01';
			} else if (scrollTop + containerHeight >= totalHeight) {
				// 已经滚到底部了只支持下拉滚动，即向上滚动
				status = '10';
			} // 其他情况属于 '11'

			let direction;
			if (status != '11') {
				// 判断当前的滚动方向
				direction = eTouchScreenY - this.startY > 0 ? '10' : '01';
				// 操作方向和当前允许状态求与运算，运算结果为0，就说明不允许该方向滚动，则禁止默认事件，阻止滚动
				if (!(parseInt(status, 2) & parseInt(direction, 2))) { // 连着均是'10'或'01' 不阻止滚动
					e.preventDefault();
				}
			}

			return {
				direction,
				status
			};
		}

	},
};
</script>
