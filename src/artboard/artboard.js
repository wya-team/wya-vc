import { Device } from '@wya/utils';

export default class Sign {
	constructor(canvas, degree, config = {}) {
		
		if (!canvas) {
			throw new Error('canvas必传');
		}

		const { width, height, left, top } = canvas.getBoundingClientRect();
		this.width = width;
		this.height = height;
		this.left = left;
		this.top = top;
		this.degree = degree; // 旋转角度
		this.config = config; // canvas配置参数
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
		this.pressed = false; // 鼠标或手指按压标识
		this.point = {}; // 存储点信息
		this.points = []; // 存储每一步的点信息
		this.preStep = []; // 存储撤销的信息
		this.steps = []; // 存储所有的点的信息
		this.touch = Device.touch; // 是否移动端

		const requestAnimationFrame = window.requestAnimationFrame;
		this.optimizedMove = requestAnimationFrame ? e => {
			requestAnimationFrame(() => {
				this.move(e);
			});
		} : this.move;
		this.init();
		this.addEvent();
	}

	init() {
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

		context.rotate((this.degree * Math.PI) / 180);
		switch (this.degree) {
			case -90:
				this.context.translate(-this.height, 0);
				break;
			case 90:
				this.context.translate(0, -this.width);
				break;
			case -180:
			case 180:
				this.context.translate(-this.width, -this.height);
				break;
			default:
		}
	}

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
						this.steps.push(this.points);
					}
				});
			});
		}
	}

	start(e) {
		e.preventDefault();
		this.pressed = true;
		this.points = [];
		this.getPoint(e);
		this.context.beginPath();
		this.context.moveTo(this.point.x, this.point.y);
		this.move(e); // 鼠标点击画点
	}

	move(e) {
		e.preventDefault();
		if (this.pressed) {
			this.getPoint(e);
			this.context.lineTo(this.point.x, this.point.y);
			this.context.stroke();
		}
	}

	getPoint(e) {
		e = this.touch ? e.touches[0] : e;
		this.point.x = e.clientX - this.left;
		this.point.y = e.clientY - this.top;
		const x = this.point.x;
		const y = this.point.y;
		this.points.push({ x, y });
	}
	
	clear() {
		this.redraw();
		this.steps = [];
	}

	redraw() {
		let width;
		let height;

		switch (this.degree) {
			case -90:
			case 90:
				width = this.height;
				height = this.width;
				break;
			default:
				width = this.width;
				height = this.height; 
		}
		this.context.clearRect(0, 0, width, height);
	}

	revocation() {
		this.preStep = this.steps.pop();
		this.redraw();
		this.steps.forEach(points => {
			points.forEach((point, index) => {
				if (index === 0) {
					this.context.beginPath();
					this.context.moveTo(point.x, point.y);
				} else {
					this.context.lineTo(point.x, point.y);
					this.context.stroke();
				}
			});
		});
	}

	cancel() {
		if (!this.preStep.length) return;
		this.preStep.forEach((point, index) => {
			if (index === 0) {
				this.context.beginPath();
				this.context.moveTo(point.x, point.y);
			} else {
				this.context.lineTo(point.x, point.y);
				this.context.stroke();
			}
		});
		this.steps.push(this.preStep);
	}

	getImage({ type, encoderOptions }) {
		return this.canvas.toDataURL(type, encoderOptions);
	}
	
}