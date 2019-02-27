<template>
	<component :is="tag" class="vcp-imgs-picker">
		<div 
			v-for="(item, index) in data" 
			:key="typeof item === 'object' ? item.uid : item"
			:class="item.retcode == 0 && '__error'"
			class="__item __normal"
		>
			<div
				v-if="typeof item !== 'object'"
				:style="{backgroundImage: `url('${item}')`}"
				class="__img"
			>
				<div class="__mask g-relative">
					<div v-if="!$slots.operate && !$scopedSlots.operate">
						<vc-icon v-if="!disabled" type="delete" @click="handleDel(item)" />
						<vc-icon v-if="!disabled" type="divider" />
						<vc-icon type="preview" @click="handlePreview($event, index)" />
					</div>
					<div v-else>
						<slot v-bind="{src: item, index}" name="operate" />
					</div>
				</div>
			</div>
			<div v-else class="__img __flex-cc">
				<div v-if="item.percent && item.percent != 100" class="__pc-bg">
					<div :style="{width: item.percent + '%'}" class="__progress"/>
				</div>
				<p v-else-if="!item.url && item.percent == 100" class="g-pd-10" style="line-height: 1">
					服务器正在接收...
				</p>
				<div v-else-if="item.retcode == 0" class="g-pd-10 __flex-cc">
					上传失败
					<div class="__mask">
						<div>
							<vc-icon type="delete" @click="handleDel(item)" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<vc-upload 
			v-show="!disabled && (data.length < max || max === 0)"
			v-bind="uploadOpts"
			:accept="accept"
			class="__upload __normal"
			@file-start="handleFileStart"
			@file-progress="handleFileProgress"
			@file-success="handleFileSuccess"
			@file-error="handleFileError"
			@error="$emit('error', arguments[0])"
			@complete="handleFileComplete"
		/>
	</component>
</template>

<script>
import emitter from '../extends/mixins/emitter'; // 表单验证
import Upload from '../upload/index';
import ImgsPreview from '../imgs-preview/index';
import Icon from '../icon/index';

export default {
	name: "vc-imgs-picker",
	components: {
		'vc-upload': Upload,
		'vc-icon': Icon
	},
	mixins: [emitter],
	model: {
		prop: 'dataSource',
		event: 'change'
	},
	props: {
		tag: {
			type: String,
			default: 'div'
		},
		dataSource: {
			type: Array,
			default() {
				return [];
			},
		},
		max: {
			type: Number,
			default: 0
		},
		disabled: {
			type: Boolean,
			default: false
		},
		upload: {
			type: Object,
			default() {
				return {};
			}
		},
		accept: {
			type: String,
			default: 'image/gif,image/jpeg,image/jpg,image/png' // 不默认为image/*是因为在Webkit浏览器下回响应很慢
		},
		format: Function
	},
	data() {
		return {
			data: this.dataSource,
			uploadOpts: { ...this.upload }
		};
	},
	watch: {
		dataSource: {
			immediate: true,
			handler(newVal) {
				let arr = this.data.length === 0 ? newVal : this.data;
				this.data = arr.map((it) => {
					for (let i = 0; i < newVal.length; i++) {
						if (typeof it === 'string' && newVal[i] === it) {
							return newVal[i];
						}
					}
					return it;
				});
				if (this.upload.multiple) {
					let max = this.upload.max || 1;
					let canSelectNum = max - this.data.length;
					if (this.uploadOpts.max != canSelectNum) {
						this.uploadOpts.max = canSelectNum;
					}
				}
			}
		}
	},
	methods: {
		handleFileStart(res) {
			this.data = [...this.data, res];
			// 开始上传时，最大值 -1
			if (this.uploadOpts.multiple) {
				let max = this.uploadOpts.max - 1;
				this.uploadOpts.max = max >= 0 ? max : 0;
			}
		},
		handleFileProgress(e, file) {
			if (parseInt(e.percent, 10) <= 100) {
				this.data = this.data.map((item) => {
					if (file.uid === item.uid) {
						return {
							...item,
							percent: e.percent
						};
					}
					return item;
				});
			}
		},
		handleFileSuccess(res, file) {
			let dataSource;
			this.data = this.data.map((item) => {
				if (item.uid === file.uid) {
					return this.getUrl(res);
				}
				return item;
			});
			// 将已经上传成功的文件传递给外部
			dataSource = this.data.filter((it) => !it.errorFlag && this.getUrl(res));
			this.$emit('change', dataSource);
			this.dispatch('FormItem', 'on-form-change', dataSource);
		},
		handleFileError(res, file) {
			// 内部保存上传失败的文件，不传递给外层
			this.data = this.data.map((item) => {
				if (item.uid === file.uid) {
					return {
						...item,
						...res,
						errorFlag: new Date().getTime()
					};
				}
				return item;
			});
			this.$emit('error', res);
		},
		handleFileComplete(res) {
			this.$emit('complete', res);
		},
		handleDel(item, index) {
			// 删除时，最大值加1
			if (this.uploadOpts.multiple) {
				this.uploadOpts.max = this.uploadOpts.max + 1;
			}
			if (item.errorFlag) {
				this.data = this.data.filter(it => it.uid != item.uid);
				return;
			}
			// this.data.splice(index, 1);
			this.data = this.data.filter(it => it != item);
			let dataSource = this.data.filter(it => !it.errorFlag);
			this.$emit('change', dataSource);
			this.dispatch('FormItem', 'on-form-change', dataSource);
		},
		handlePreview(e, idx) {
			let pos = {};
			try {
				const target = e.target; // 先得到pos, 否则getThumbBoundsFn再计划，target已变化
				const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
				const rect = target.getBoundingClientRect();

				pos = { x: rect.left, y: rect.top + pageYScroll, w: rect.width };

			} catch (e) {
				console.log(e);
			}

			ImgsPreview.popup({
				visible: true,
				dataSource: this.dataSource,
				opts: {
					index: idx,
					history: false,
					getThumbBoundsFn: (index) => pos
				}
			}).then(() => {

			}).catch(() => {

			});
		},
		getUrl(res) {
			return this.format ? this.format(res) : res.data.url;
		}
	}
};
</script>

<style lang="scss" scoped>
.vcp-imgs-picker {
	display: flex;
	box-sizing: border-box;
	flex-wrap: wrap;
	.__normal {
		width: 104px;
		height: 104px;
		border-radius: 4px;
		background-color: #fafafa;
		.__img {
			width: 88px;
			height: 88px;
		}
	}
	.__img {
		background-size: cover;
		position: relative;
	}
	.__item {
		box-sizing: border-box;
		margin-right: 8px;
		margin-bottom: 8px;
		cursor: pointer;
		border: 1px solid #d9d9d9;
		padding: 8px;
	}
	.__item:hover .__mask {
		transition: opacity 0.5s;
		opacity: 1;
	}
	.__flex-cc {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.__pc-bg {
		flex: 1;
		background-color: #cdcdcd;
		height: 8px;
		border-radius: 5px;
		overflow: hidden;
		margin: 0 4px;
		.__progress {
			display: block;
			margin: 0;
			background-color: #2397fa;
			height: 8px;
			border-radius: 5px;
		}
	}
	.__error {
		color: #f42626;
		border: 1px solid #f42626;
	}
	.__mask {
		opacity: 0;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.4);
		color: #fff;
		display: flex;
		justify-content: space-around;
		align-items: center;
		box-sizing: border-box;
		& > span {
			cursor: pointer;
			font-size: 18px;
		}
	}
	.__upload {
		display: flex;
		box-sizing: border-box;
		justify-content: center;
		align-items: center;
		position: relative;
		border: 1px dashed #d9d9d9;
		background-color: #fafafa;
		margin-right: 8px;
		margin-bottom: 8px;
		&:hover {
			border-color: #1890ff;
		}
		&:after,
		&:before {
			content: " ";
			position: absolute;
			top: 50%;
			left: 50%;
			-webkit-transform: translate(-50%, -50%);
			transform: translate(-50%, -50%);
			background-color: #999;
			border-radius: 2px;
		}

		&:before {
			width: 2px;
			height: 28px;
		}

		&:after {
			width: 28px;
			height: 2px;
		}
	}
}
</style>