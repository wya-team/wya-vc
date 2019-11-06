

export default class Manager {
	static getImageData(options) {
		let { context, dataSource, width, height } = options;
		if (!context || !(context instanceof CanvasRenderingContext2D)) {
			throw new Error('【wya-process】需要传入 CanvasRenderingContext2D 对象');
		}

		return new Promise((resolve, reject) => {
			const image = new Image();
			image.crossOrigin = 'anonymous';
			image.onload = () => {
				context.drawImage(image, 0, 0, width, height);
				// 获取像素信息数据
				resolve(context.getImageData(0, 0, width, height));
			};
			image.onerror = (err) => {
				console.error(err);
			};
			image.src = dataSource;
		});
	}

	/**
	 * 抠取特定颜色
	 * @param {*} imageData 
	 * @param {*} opts 
	 */
	static cutout(imageData, opts = {}) {
		let { tolerance, cutoutColor } = opts;
		for (let index = 0; index < imageData.data.length; index += 4) {
			let r = imageData.data[index];
			let g = imageData.data[index + 1];
			let b = imageData.data[index + 2];
		
			if (Math.sqrt(
				(r - cutoutColor[0]) * (r - cutoutColor[0]) 
			+ (g - cutoutColor[1]) * (g - cutoutColor[1]) 
			+ (b - cutoutColor[2]) * (b - cutoutColor[2])
			) <= tolerance
			) {
				imageData.data[index] = 0;
				imageData.data[index + 1] = 0;
				imageData.data[index + 2] = 0;
				imageData.data[index + 3] = 0;
			} else {
				imageData.data[index] = r;
				imageData.data[index + 1] = g;
				imageData.data[index + 2] = b;
				imageData.data[index + 3] = imageData.data[index + 3];
			}
		}
		// put数据
		// context.putImageData(imageData, 0, 0);
		return imageData;
	}

	/**
	 * 图片灰化
	 * @param {*} imageData 
	 * @param {*} opts 
	 */
	static gray(imageData, opts = {}) {
		for (let index = 0; index < imageData.data.length; index += 4) {
			let r = imageData.data[index];
			let g = imageData.data[index + 1];
			let b = imageData.data[index + 2];
			let gray = parseInt((r + g + b) / 3, 10);
		
			imageData.data[index] = gray;
			imageData.data[index + 1] = gray;
			imageData.data[index + 2] = gray;
		}
		// put数据;
		// context.putImageData(imageData, 0, 0);
		return imageData;
	}

	/**
	 * 选取颜色
	 */
	picker(imageData, opts) {
		
	}
}