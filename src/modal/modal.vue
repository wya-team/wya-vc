<template>
	<div class="vc-modal">
		<transition name="mask">
			<div v-if="value" class="_modal-mask"/>
		</transition>
		<div class="_wrap">
			<transition name="modal" @enter="enter">
				<div 
					v-show="value"
					ref="modal" 
					:style="{width: width + 'px',transformOrigin: '0 0 0'}"
					class="_modal-wrap"
				>
					<div class="_modal-header">
						<slot name="header">
							<p class="_header-inner">我是标题</p>
							<a class="__modal-close" @click="handleClose">
								<vc-icon type="close"/>
							</a>
						</slot>
					</div>
					<div ref="slot" class="_modal-content"><slot/></div>
					<div class="_modal-footer">
						<slot name="footer">
							<vc-button type="text">取消</vc-button>
							<vc-button type="primary">确定</vc-button>
						</slot>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>
<script>
import Icon from '../icon';
import Button from '../button';

export default {
	name: "vc-modal",
	components: {
		'vc-icon': Icon,
		'vc-button': Button
	},
	props: {
		width: {
			type: Number,
			default: 400
		},
		value: {
			type: Boolean,
			default: false
		},
		e: {
			type: Object
		},
	},
	data() {
		return {
			newCoord: {
				x: 0,
				y: 0
			},
			coord: {
				x: 0,
				y: 0
			}
		};
	},
	watch: {
		value() {
			// let modalDom = document.querySelector('._modal-wrap');
			
		}
	},
	mounted() {
		if (!this.e) {
			document.documentElement.addEventListener('click', (e) => {
				this.coord = {
					x: e.x,
					y: e.y
				};
			});
		} else {
			this.coord = this.e;
		}
	},
	methods: {
		handleClose() {
			this.$emit('input', false);
		},
		enter(el) {
			console.log(el);
			this.newCoord = {
				x: 0,
				y: 0
			};
			let modalX = el.offsetLeft;
			let modalY = 100;
			if (modalX > this.coord.x) {
				this.newCoord.x = -(modalX - this.coord.x);
			} else {
				this.newCoord.x = this.coord.x - modalX;
			}
			if (modalY > this.coord.y) {
				this.newCoord.y = -(modalY - this.coord.y);
			} else {
				this.newCoord.y = this.coord.y - modalY;
			}
			console.log('modalX:', modalX, 'modalY:', modalY);
			console.log('X:', this.newCoord.x, 'Y:', this.newCoord.y);
			el.style.transformOrigin = this.newCoord.x + 'px ' + this.newCoord.y + 'px 0';
		}
	}
};
</script>
<style lang="less" scoped>
.vc-modal{
	._modal-mask{
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(55,55,55,.6);
		height: 100%;
		z-index: 1000;
	}
	._wrap{
		position: fixed;
		top: 100px;
		width: 100%;
		z-index: 1001;
		._modal-wrap{
			position: relative;
			background: #fff;
			box-shadow: 0 4px 12px rgba(0,0,0,.15);
			margin: auto;
			._modal-header{
				position: relative;
				border-bottom: 1px solid #e8eaec;
				padding: 14px 16px;
				line-height: 1;
				font-size: 14px;
				font-weight: 700;
				._header-inner{
					display: inline-block;
					width: 100%;
					height: 20px;
					line-height: 20px;
					font-size: 14px;
					color: #17233d;
					font-weight: 700;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.__modal-close{
					position: absolute;
					top: 17px;
					right: 16px;
					color: #999;
				}
			}
			._modal-content{
				padding: 16px;
			}
			._modal-footer{
				border-top: 1px solid #e8eaec;
				padding: 12px 18px;
				text-align: right;
			}
		}
	}

}
.mask-enter-active, 
.mask-leave-active,
.modal-enter-active, 
.modal-leave-active{
	transition: all .1s linear;
}
.mask-enter, .mask-leave-to{
	opacity: 0;
}
.modal-enter, .modal-leave-to{
	transform-origin: -50px 500px 0;
	transform: scale(0);
	opacity: 0;
}
</style>