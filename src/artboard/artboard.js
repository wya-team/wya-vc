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
		this.degree = degree;
		this.config = config;
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
		this.pressed = false; // 鼠标或手指按压标识
		this.point = {}; // 存储点信息
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
		
		context.lineWidth = 6;
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
				});
			});
		}
	}

	start(e) {
		e.preventDefault();
		this.pressed = true;
		this.getPoint(e);
		this.context.beginPath();
		this.context.moveTo(this.point.x, this.point.y);
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
	}
	
	clear() {
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

	getImage({ type, encoderOptions }) {
		return this.canvas.toDataURL(type, encoderOptions);
	}
	
}