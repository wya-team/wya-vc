<template>
	<div class="vc-artboard"> 
		<canvas ref="canvas" />
	</div>
</template>
<script>
import { Device } from '@wya/utils';

export default {
	name: "vc-artboard",
	props: {
		// canvas配置参数
		options: Object,
		// 获取画布实例
		getInstance: Function
	},
	data() {
		return {
			width: 0,
			height: 0,      
			top: 0,
			left: 0,        
			canvas: null,      
			context: null,       
			pressed: false, // 鼠标或手指按压标识
			point: {
				x: 0,
				y: 0
			}, // 存储点信息
			points: [], // 存储每一步快照的点信息
			undoSnapshots: [], // 存储撤销步骤快照的信息
			curSnapshots: [], // 存储当前步骤快照的信息
		};
	},
	mounted() {
		this.init();
	},
	beforeDestroy() {
		this.removeEvent();
	},
	methods: {
		init() {
			const canvas = this.$refs.canvas;
			const { width, height, top, left } = canvas.getBoundingClientRect();
			this.width = width;
			this.height = height;
			this.top = top;
			this.left = left;
			this.canvas = canvas;
			this.context = canvas.getContext('2d');

			const requestAnimationFrame = window.requestAnimationFrame;
			this.optimizedMove = requestAnimationFrame ? e => {
				requestAnimationFrame(() => {
					this.handleMove(e);
				});
			} : this.handleMove;
			this.initCanvas();
			this.addEvent();
			// 对外暴露canvas对象
			this.getInstance && this.getInstance(this);
		},
		initCanvas() {
			const context = this.context;
			const canvas = this.canvas;
			// 根据设备像素比优化canvas绘图
			const devicePixelRatio = window.devicePixelRatio;
			if (devicePixelRatio) {
				canvas.style.width = `${this.width}px`;
				canvas.style.height = `${this.height}px`;
				canvas.height = this.height * devicePixelRatio;
				canvas.width = this.width * devicePixelRatio;
				context.scale(devicePixelRatio, devicePixelRatio);
			} else {
				canvas.width = this.width;
				canvas.height = this.height;
			}

			context.shadowBlur = 1;
			context.shadowColor = 'black';
			context.lineWidth = 2;
			context.strokeStyle = 'black';
			context.lineCap = 'round';
			context.lineJoin = 'round';
			Object.assign(context, this.options);
		},
		addEvent() {
			if (Device.touch) {
				this.canvas.addEventListener('touchstart', this.handleStatrt);
				this.canvas.addEventListener('touchmove', this.optimizedMove);
				this.canvas.addEventListener('touchend', handleEnd);
			} else {
				this.canvas.addEventListener('mousedown', this.handleStatrt);
				this.canvas.addEventListener('mousemove', this.optimizedMove);
				this.canvas.addEventListener('mouseup', this.handleDrawEnd);
				this.canvas.addEventListener('mouseleave', this.handleDrawEnd);
			}
		},
		removeEvent() {
			if (Device.touch) {
				this.canvas.removeEventListener('touchstart', this.handleStatrt);
				this.canvas.removeEventListener('touchmove', this.optimizedMove);
				this.canvas.removeEventListener('touchend', handleEnd);
			} else {
				this.canvas.removeEventListener('mousedown', this.handleStatrt);
				this.canvas.removeEventListener('mousemove', this.optimizedMove);
				this.canvas.removeEventListener('mouseup', this.handleDrawEnd);
				this.canvas.removeEventListener('mouseleave', this.handleDrawEnd);
			}
		},
		// 步骤发生变化，向外暴露change事件
		handleChange() {
			this.$emit('change', { 
				snapshots: [...this.curSnapshots, ...this.undoSnapshots],
				current: this.curSnapshots.length 
			});
		},
		handleStatrt(e) {
			e.preventDefault();
			this.pressed = true;
			this.points = [];
			this.getPoint(e);
			this.context.beginPath();
			this.context.moveTo(this.point.x, this.point.y);
			this.handleMove(e); // 鼠标点击画点
		},
		handleMove(e) {
			e.preventDefault();
			if (this.pressed) {
				this.getPoint(e);
				this.context.lineTo(this.point.x, this.point.y);
				this.context.stroke();
			}
		},
		handleEnd() {
			this.undoSnapshots = [];
			this.curSnapshots.push(this.points);
			this.handleChange();
		},
		handleDrawEnd() {
			if (this.pressed) {
				this.pressed = false;
				this.handleEnd();
			}
		},
		getPoint(e) {
			if (Device.touch) {
				// 手机端没有e.layerX和e.offsetX
				e = e.touches[0];
				this.point.x = e.clientX - this.left;
				this.point.y = e.clientY - this.top;
			} else {
				this.point.x = e.layerX || e.offsetX;
				this.point.y = e.layerY || e.offsetY;
			}
			
			const x = this.point.x;
			const y = this.point.y;
			this.points.push({ x, y });
		},
		/**
		 * 重置
		 */
		reset() {
			this.redraw();
			this.undoSnapshots = [];
			this.curSnapshots = [];
			this.handleChange();
		},
		/**
		 * 回退
		 */
		undo() {
			if (!this.curSnapshots.length) return;
			this.undoSnapshots.unshift(this.curSnapshots.pop());
			this.redraw();
			this.curSnapshots.forEach(step => {
				this.draw(step);
			});
			this.handleChange();
		},
		/**
		 * 撤销
		 */
		redo() {
			if (!this.undoSnapshots.length) return;
			
			const step = this.undoSnapshots.shift();
			this.draw(step);
			this.curSnapshots.push(step);
			this.handleChange();
		},
		/**
		 * 清空画布
		 */
		redraw() {
			this.context.clearRect(0, 0, this.width, this.height);
		},
		draw(step) {
			step.forEach((point, index) => {
				if (index === 0) {
					this.context.beginPath();
					this.context.moveTo(point.x, point.y);
				} else {
					this.context.lineTo(point.x, point.y);
					this.context.stroke();
				}
			});
		},
	}
};
</script>
<style lang="scss">
.vc-artboard {
	width: 100%;
	height: 100%;
	canvas {
		width: 100%;
		height: 100%;
		cursor: crosshair;
		border: 1px solid #d3d3d3;
	}
}
</style>