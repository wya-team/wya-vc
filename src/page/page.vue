<template>
	<div class="vc-page">
		<span v-if="showCount" class="vc-page__count">
			<slot>
				<span>共 {{ count }} 条</span> 
			</slot>
		</span>
		<div
			:class="{'is-disabled': currentPage == 1 }"
			title="prev"
			class="vc-page__item is-icon"
			@click="handlePrev"
		>
			<vc-icon type="left" />
		</div>
		<!-- 第一页 -->
		<div 
			:class="{'is-active': currentPage == 1 }"
			class="vc-page__item"
			title="1"
			@click="handleChangePage(1)"
		>
			<span>1</span>
		</div>
		<div 
			v-if="currentPage > 5" 
			title="向前 5 页" 
			class="vc-page__item is-jump"
			@click="handleFastPre"
		>
			...
		</div>
		<div 
			v-if="currentPage === 5" 
			:title="currentPage - 3"
			class="vc-page__item" 
			@click="handleChangePage(currentPage - 3)"
		>
			<span>{{ currentPage - 3 }}</span>
		</div>

		<div 
			v-if="currentPage - 2 > 1" 
			:title="currentPage - 2"
			class="vc-page__item" 
			@click="handleChangePage(currentPage - 2)"
		>
			<span>{{ currentPage - 2 }}</span>
		</div>
		<div 
			v-if="currentPage - 1 > 1" 
			:title="currentPage - 1"
			class="vc-page__item" 
			@click="handleChangePage(currentPage - 1)"
		>
			<span>{{ currentPage - 1 }}</span>
		</div>
	
		<!-- 当前页 -->
		<div 
			v-if="currentPage != 1 && currentPage != totalPage" 
			:title="currentPage"
			class="vc-page__item is-active"
		>
			<span>{{ currentPage }}</span>
		</div>
		<!-- 分割线 -->

		<div 
			v-if="currentPage + 1 < totalPage" 
			:title="currentPage + 1"
			class="vc-page__item" 
			@click="handleChangePage(currentPage + 1)"
		>
			<span>{{ currentPage + 1 }}</span>
		</div>
		<div 
			v-if="currentPage + 2 < totalPage" 
			:title="currentPage + 2"
			class="vc-page__item" 
			@click="handleChangePage(currentPage + 2)"
		>
			<span>{{ currentPage + 2 }}</span>
		</div>
		<div 
			v-if="totalPage - currentPage === 4" 
			:title="currentPage + 3"
			class="vc-page__item" 
			@click="handleChangePage(currentPage + 3)"
		>
			<span>{{ currentPage + 3 }}</span>
		</div>
		<div 
			v-if="totalPage - currentPage >= 5" 
			title="向后 5 页"
			class="vc-page__item is-jump"
			@click="handleFastNext"
		>
			...
		</div>
		<div 
			v-if="totalPage > 1" 
			:title="totalPage" 
			:class="{'is-active': currentPage == totalPage }"
			class="vc-page__item"
			@click="handleChangePage(totalPage)"
		>
			<span>{{ totalPage }}</span>
		</div>
		<div
			:class="{'is-disabled': currentPage == totalPage }"
			title="next"
			class="vc-page__item is-icon"
			@click="handleNext"
		>
			<vc-icon type="right" />
		</div>

		<div v-if="showSizer || showElevator" class="vc-page__size">
			<div v-if="showSizer">
				<vc-select
					v-model="currentPageSize"
					:placement="placement" 
					:portal="portal" 
					:extra="`${currentPageSize} 条/页`"
					style="width: 90px; margin-right: 10px;"
					@change="handleChangePageSize"
				>
					<vc-option 
						v-for="item in pageSizeOpts" 
						:key="item" 
						:value="item"
						:label="item"
					>
						{{ item }} 条/页
					</vc-option>
				</vc-select>
			</div>
			<div v-if="showElevator">
				<span>跳至</span>
				<vc-input-number
					:value="hackPage"
					:spellcheck="false"
					:step="0"
					:min="1"
					:max="totalPage"
					style="width: 50px; margin-right: 10px;"
					autocomplete="off"
					@input="handleInput"
					@enter="handleEnter"
				/>
				<span>页</span>
			</div>
		</div>
	</div>
</template>
<script>
import Icon from '../icon/index';
import Select from '../select/index';
import Option from '../option/index';
import Input from '../input/index';

export default {
	name: 'vc-page',
	components: {
		'vc-icon': Icon,
		'vc-input-number': Input.Number,
		'vc-select': Select,
		'vc-option': Option,
	},
	props: {
		current: {
			type: Number,
			default: 1
		},
		count: {
			type: Number,
			default: 0
		},
		pageSize: {
			type: Number,
			default: 10
		},
		pageSizeOpts: {
			type: Array,
			default: () => ([10, 20, 30, 40])
		},
		placement: {
			type: String,
			default: 'bottom'
		},
		portal: {
			type: Boolean,
			default: true
		},
		showCount: {
			type: Boolean,
			default: true
		},
		showElevator: {
			type: Boolean,
			default: false
		},
		showSizer: {
			type: Boolean,
			default: false
		},
	},
	data() {
		return {
			hackPage: this.current,
			currentPage: this.current,
			currentPageSize: this.pageSize,
		};
	},
	computed: {
		totalPage() {
			const v = Math.ceil(this.count / this.currentPageSize);
			return (v === 0) ? 1 : v;
		}
	},
	watch: {
		count(val) {
			let maxPage = Math.ceil(val / this.currentPageSize);
			if (maxPage < this.currentPage) {
				this.currentPage = (maxPage === 0 ? 1 : maxPage);
			}
		},
		current: {
			immediate: true,
			handler(v) {
				this.currentPage = v;
			}
		},
		pageSize: {
			immediate: true,
			handler(v) {
				this.currentPageSize = v;
			}
		}
	},
	created() {
		/**
		 * 外部可掉用
		 */
		this.prev = ::this.handlePrev;
		this.next = ::this.handleNext;
		this.resetPage = ::this.handleChangePage;
	},
	methods: {
		handleChangePage(page) {
			if (this.currentPage != page) {
				this.currentPage = page;
				this.$emit('update:current', page);
				this.$emit('change', page);
			}
		},
		handlePrev() {
			const current = this.currentPage;
			if (current <= 1) {
				return false;
			}
			this.resetPage(current - 1);
		},
		handleNext() {
			const current = this.currentPage;
			if (current >= this.totalPage) {
				return false;
			}
			this.resetPage(current + 1);
		},
		handleFastPre() {
			const page = this.currentPage - 5;
			if (page > 0) {
				this.resetPage(page);
			} else {
				this.resetPage(1);
			}
		},
		handleFastNext() {
			const page = this.currentPage + 5;
			if (page > this.totalPage) {
				this.resetPage(this.totalPage);
			} else {
				this.resetPage(page);
			}
		},
		handleChangePageSize(pageSize) {
			this.$emit('page-size-change', this.currentPageSize);

			// 切换条数时，强制为第一页
			this.hackPage = this.totalPage < this.currentPage ? this.totalPage : this.currentPage;
			this.currentPage = 1;
		},
		handleInput(v) {
			this.hackPage = v > this.totalPage ? this.totalPage : v;
		},
		handleEnter(v) {
			this.resetPage(Number(this.hackPage));
		}
	}
};
</script>
<style lang="scss">
@import '../style/index.scss';
$block: vc-page;
$size: 28px;

@include block($block) {
	display: flex;
	align-items: center;
	@include commonClearfix();
	@include element(item) {
		min-width: $size;
		height: $size;
		line-height: $size;
		margin-right: 4px;
		text-align: center;
		background-color: #fff;
		user-select: none;
		cursor: pointer;
		font-family: "Arial";
		font-weight: 500;
		border-radius: 4px;
		@include commonBorder1PX('', #dcdee2);
		span {
			font-family: "Monospaced Number";
			color: #515a6e;
		}
		@include when(jump) {
			&:before, &:after {
				border-color: #0000!important;
			};
		}
		@include when(active) {
			span {
				color: #2d8cf0 !important;	
			}
			&:before, &:after {
				border-color: #2d8cf0;
			};
		}
		&:hover {
			span {
				color: #2d8cf0 !important;	
			}
			&:before, &:after {
				border-color: #2d8cf0;
			};
		}
		@include when(disabled) {
			cursor: not-allowed;
			color: #ccc;
		}
		@include when(icon) {
			@include commonFlexCc();
			.vc-icon {
				font-size: 12px;
				transform: scale(0.8);
			}
			&:hover {
				color: #2d8cf0 !important;
			}
			@include when(disabled) {
				cursor: not-allowed;
				color: #ccc;
				&:hover {
					color: #ccc !important;
				}
				&:before, &:after {
					border-color: #ccc;
				};
			}
		}
	}
	@include element(count) {
		display: inline-block;
		height: $size;
		line-height: $size;
		margin-right: 10px;
	}
	@include element(size) {
		margin-left: 15px;
		display: flex;
		align-items: center;
	}
}
</style>
