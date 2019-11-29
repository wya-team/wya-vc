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
		config: Object, // canvas配置参数
		type: String, // 生成的图片的类型, 可取 image/png image/jpeg
		encoderOptions: Number, // 0 - 1
	},
	data() {
		return {
			width: 0,
			height: 0,       
			left: 0,       
			top: 0,        
			canvas: null,      
			context: null,       
			pressed: false, // 鼠标或手指按压标识
			point: {
				x: 0,
				y: 0
			}, // 存储点信息
			points: [], // 存储每一步的点信息
			preStep: [], // 存储撤销的信息
			steps: [], // 存储所有的点的信息
			touch: false // 是否移动端
		};
	},
	mounted() {
		this.initCanvasConfigs();
	},
	methods: {
		initCanvasConfigs() {
			const canvas = this.$refs.canvas;
			if (!canvas) {
				throw new Error('canvas必传');
			}

			const { width, height, left, top } = canvas.getBoundingClientRect();
			this.width = width;
			this.height = height;
			this.left = left;
			this.top = top;
			this.canvas = canvas;
			this.context = canvas.getContext('2d');
			this.touch = Device.touch; // 是否移动端

			const requestAnimationFrame = window.requestAnimationFrame;
			this.optimizedMove = requestAnimationFrame ? e => {
				requestAnimationFrame(() => {
					this.move(e);
				});
			} : this.move;
			this.initCanvas();
			this.addEvent();
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

			if (!this.touch) {
				context.shadowBlur = 1;
				context.shadowColor = 'black';
			}
			
			context.lineWidth = 2;
			context.strokeStyle = 'black';
			context.lineCap = 'round';
			context.lineJoin = 'round';
			Object.assign(context, this.config);
			window.context = context;
		},
		addEvent() {
			if (this.touch) {
				this.canvas.addEventListener('touchstart', this.start.bind(this));
				this.canvas.addEventListener('touchmove', this.optimizedMove.bind(this));
			} else {
				this.canvas.addEventListener('mousedown', this.start.bind(this));
				this.canvas.addEventListener('mousemove', this.optimizedMove.bind(this));
				['mouseup', 'mouseleave'].forEach(event => {
					this.canvas.addEventListener(event, () => {
						this.pressed = false;
						if (event === 'mouseup') {
							this.preStep = [];
							this.steps.push(this.points);
						}
					});
				});
			}
		},
		start(e) {
			e.preventDefault();
			this.pressed = true;
			this.points = [];
			this.getPoint(e);
			this.context.beginPath();
			this.context.moveTo(this.point.x, this.point.y);
			this.move(e); // 鼠标点击画点
		},
		move(e) {
			e.preventDefault();
			if (this.pressed) {
				this.getPoint(e);
				this.context.lineTo(this.point.x, this.point.y);
				this.context.stroke();
			}
		},
		getPoint(e) {
			e = this.touch ? e.touches[0] : e;
			this.point.x = e.clientX - this.left;
			this.point.y = e.clientY - this.top;
			const x = this.point.x;
			const y = this.point.y;
			this.points.push({ x, y });
		},
		clear() {
			this.redraw();
			this.steps = [];
			this.preStep = [];
		},
		redraw() { // 清除画布
			this.context.clearRect(0, 0, this.width, this.height);
		},
		revocation() { // 回退一笔
			this.preStep.unshift(this.steps.pop());
			this.redraw();
			this.draw(this.steps);
		},
		cancel() { // 取消回退
			if (!this.preStep.length) {
				throw new Error('没有回退数据');
			}
			this.draw(this.preStep);
			this.steps = this.steps.concat(this.preStep);
			this.preStep = [];
		},
		draw(steps) {
			steps.forEach(step => {
				step.forEach((point, index) => {
					if (index === 0) {
						this.context.beginPath();
						this.context.moveTo(point.x, point.y);
					} else {
						this.context.lineTo(point.x, point.y);
						this.context.stroke();
					}
				});
			});
		},
		getImage({ type, encoderOptions }) {
			return this.canvas.toDataURL(type, encoderOptions);
		}
	}
};
</script>
<style lang="scss">
.vc-artboard {
	width: 200px;
	height: 200px;
	canvas {
		width: 100%;
		height: 100%;
		cursor: crosshair;
		border: 1px solid #d3d3d3;
	}
}
</style>