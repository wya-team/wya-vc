<template>
	<transition name="fade" @after-leave="hide">
		<div v-if="visible" ref="target" class="vc-upload-tips">
			<div class="__header">
				<span>当前选择上传进度</span>
				<span @click="hide">&#10005;</span>
			</div>
			<div v-if="showTips" class="__result" @click="setTipsStatus">
				<span>上传结束，成功: {{ success }}，失败: {{ error }}，总数: {{ total }}</span>
				<span class="__icon">&#10005;</span>
			</div>
			<div class="__content">
				<div>文件名</div>
				<div>文件大小</div>
				<div>状态</div>
			</div>
			<ul>
				<li v-for="({ name, size, percent, msg }, key) in itemObj" :key="key">
					<div :style="{ width: `${msg ? 100 : percent}%` }" class="__bar" />
					<div class="__content">
						<div>{{ name }}</div>
						<div>{{ (size / 1024 / 1024).toFixed(2) }} MB</div>
						<div :class="msg ? `__error` : `__success`">
							<span v-if="msg">{{ msg }}</span>
							<span v-else-if="!msg && (Number(percent) === 100)">&#10004;</span>
							<span v-else>上传中</span>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</transition>
</template>
<script>
import CreatePortal from '../create-portal/index';

export default {
	name: "vc-upload-tips",
	props: {
	},
	data() {
		return {
			visible: false,
			itemArr: [],
			itemObj: {},
			success: 0,
			error: 0,
			showTips: false
		};
	},
	computed: {
		total() {
			return this.itemArr.length;
		}
	},
	created() {
		this.timer = null;
	},
	mounted() {
		// this.visible = true;
	},
	destroyed() {
		this.timer && clearTimeout(this.timer);
	},
	methods: {
		/**
		 * 外部可调用
		 */
		show({ itemArr, itemObj }) {
			this.visible = true;
			this.itemArr = [
				...this.itemArr, 
				...itemArr
			];
			this.itemObj = {
				...this.itemObj,
				...itemObj
			};
		},
		/**
		 * 外部可调用
		 */
		hide() {
			this.visible = false;
		},
		/**
		 * 外部调用
		 */
		setValue(uid, key, value) {
			switch (key) {
				case 'percent':
					// File对象实例
					this.itemObj[uid].percent = value;
					break;
				case 'success':
					this.success++;
					break;
				case 'error':
					this.error++;
					this.itemObj[uid].msg = value;
					break;
				default:
					break;
			}
		},
		/**
		 * 外部调用
		 */
		setTipsStatus(show) {
			this.showTips = typeof show === 'boolean' ? show : !this.showTips;
		},
	}
};

export const Tips = CreatePortal({}, module.exports.default);
</script>
<style lang="scss" scoped>
@import '../style/index.scss';
.fade-enter, .fade-leave-active {
	opacity: 0;
}
.vc-upload-tips {
	width: 600px;
	position: fixed;
	right: 5px;
	bottom: 5px;
	font-size: 13px;
	border-radius: 3px;
	box-shadow: 0 0 50px rgba(#000, 0.2);
	opacity: 1;
	transition: opacity .3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
	background: white;
	.__header {
		@include commonFlex();
		justify-content: space-between;
		align-items: center;
		padding: 10px 20px;
		flex: 1;
		border-bottom: 1px solid #e8e8e8;
		height: 50px;
	}
	ul {
		height: 300px;
		overflow: auto;
	}
	li {
		position: relative;
		height: 30px;
		border-bottom: 1px solid #e8e8e8;
	}
	.__bar {
		height: 30px;
		background-color: #f5f5f5;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
	}
	.__content {
		width: 100%;
		height: 30px;
		@include commonFlex();
		div {
			padding: 0 12px;
			flex: 0 0 20%;
			height: 30px;
			line-height: 30px;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
			&:nth-child(1) {
				flex: 0 0 45%;
			}
			&:nth-child(2) {
				flex: 0 0 20%;
			}
			&:nth-child(3) {
				flex: 1;
			}
		}
	}
	.__result {
		position: absolute;
		top: 50px;
		left: 0;
		padding: 0 30px 0 12px;
		width: 100%;
		height: 30px;
		line-height: 30px;
		background-color: #3abfbf;
		color: #fff;
		.__icon {
			position: absolute;
			top: 0;
			right: 5px;
			color: #fff;
			display: inline-block;
			width: 30px;
			height: 30px;
			text-align: center;
		}
	}
	.__success {
		color: #5cb85c;
	}
	.__error {
		color: #d9534f;
	}
}	
</style>