import { createVue, createComponent, destroyVM, wait } from '@tests/helper';
import { Storage } from '@wya/utils';
import IMGStore from '../store';
import Img from '..';
import MImg from '../index.m';

describe('Img', () => {
	it('basic', () => {
		expect(!!Img).to.equal(true);
		expect(!!MImg).to.equal(true);
	});

	it('fit', async () => {
		let vm = createVue({
			template: `
				<div style="width: 100px; height: 100px; overflow: auto;">
					<vc-img
						v-for="(item, index) in fits"
						:src="urls[index % 2]"
						ref="img"
						:fit="item"
					/>
					<vc-img
						:src="urls[0]"
						ref="img5"
					/>
					<vc-img
						:src="urls[0]"
						ref="img6"
						lazy
					/>
				</div>
			`,
			components: {
				'vc-img': Img,
			},
			data() {
				return {
					fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
					urls: [
						'https://oss.ruishan666.com/image/xcx/180228/803943951788/裤子.png',
						'https://oss.ruishan666.com/image/xcx/180228/803943510611/衣服-01.png'
					]
				};
			}
		});
		vm.fits.forEach((item, index) => {
			expect(vm.$refs.img[index].style['object-fit']).to.equal(item);
		});
		vm.urls = [
			'https://oss.ruishan666.com/image/xcx/180228/803943510611/衣服-01.png',
			'https://oss.ruishan666.com/image/xcx/180228/803943951788/裤子.png'
		];
		await wait(0.1);

		destroyVM(vm);
	});

	it('img-style-scene', () => {
		IMGStore.add('https://oss.ruishan666.com/image/xcx/180228/803943951788/裤子.png', {
			originW: 200,
			originH: 200
		});
		IMGStore.add('https://oss.ruishan666.com/image/xcx/180228/803943951788/裤子.png', {
			originW: 200,
			originH: 200
		});
		let vm = createVue({
			template: `
				<div>
					<div style="width: 300px; height: 300px; overflow: auto;">
						<vc-img
							src="https://oss.ruishan666.com/image/xcx/180228/803943951788/裤子.png"
							fit="cover"
							ref="img1"
							style="width: 100px;"
						/>
						<vc-img
							src="https://oss.ruishan666.com/image/xcx/180228/803943951788/裤子.png"
							fit="cover"
							ref="img2"
							style="height: 100px;"
						/>
						<vc-img
							src="https://oss.ruishan666.com/image/xcx/180228/803943951788/裤子.png"
							ref="img3"
							fit="cover"
						/>
						<div style="width: 80px; height: 80px; overflow: auto;">
							<vc-img
								src="https://oss.ruishan666.com/image/xcx/180228/803943951788/裤子.png"
								ref="img4"
								fit="cover"
							/>
						</div>
					</div>
					<vc-img
						src="https://oss.ruishan666.com/image/xcx/180228/803943951788/裤子.png"
						ref="img5"
						fit="cover"
					/>
				</div>
			`,
			components: {
				'vc-img': Img,
			},
		});


		let img1 = vm.$refs.img1;
		let img2 = vm.$refs.img2;
		let img3 = vm.$refs.img3;
		let img4 = vm.$refs.img4;
		let img5 = vm.$refs.img5;

		expect(+img1.pStyle.width.replace('px', '')).to.equal(100);
		expect((+img1.pStyle.height.replace('px', ''))).to.equal(100);

		expect(+img2.pStyle.width.replace('px', '')).to.equal(100);
		expect((+img2.pStyle.height.replace('px', ''))).to.equal(100);

		expect(+img3.pStyle.width.replace('px', '')).to.equal(200);
		expect((+img3.pStyle.height.replace('px', ''))).to.equal(200);

		expect(+img4.pStyle.width.replace('px', '')).to.equal(80);
		expect((+img4.pStyle.height.replace('px', ''))).to.equal(80);

		expect(+img5.pStyle.width.replace('px', '')).to.equal(200);
		expect((+img5.pStyle.height.replace('px', ''))).to.equal(200);
	});

	it('wrap', async () => {
		Storage.remove('@wya/vc-img:', { session: true });
		let vm = createVue({
			template: `
				<div class="wrap" style="width: 100px; height: 100px; overflow: auto;">
					<vc-img
						src="https://oss.ruishan666.com/image/xcx/180228/803943951788/裤子.png"
						ref="img"
						:wrapper="wrapper"
					/>
					<vc-img
						:src="src"
						ref="img2"
						:show="true"
						wrapper=".wrap"
					/>
					<vc-img
						src="https://oss.ruishan666.com/image/xcx/180228/803943951788/裤子.png"
						ref="img3"
						wrapper=".wrap"
						style="width: 50px; height: 50px;"
					/>
				</div>
			`,
			components: {
				'vc-img': Img,
			},
			data() {
				return {
					wrapper: {},
					src: 'https://oss.ruishan666.com/image/xcx/180228/803943951788/裤子.png'
				};
			},
		});

		let img = vm.$refs.img;
		let img2 = vm.$refs.img2;
		let img3 = vm.$refs.img3;

		vm.src = 'https://oss.ruishan666.com/image/xcx/180228/803943510611/衣服-01.png';
		await wait(0.1);

		expect(img.scroller === vm.wrapper).to.equal(true);
		expect(img2.scroller === document.querySelector('.wrap')).to.equal(true);
	});

	it('error', async () => {
		let vm = createVue({
			template: `
				<div class="wrap" style="width: 100px; height: 100px; overflow: auto;">
					<vc-img
						src="https://oss.ruishan666.com/image/xcx/180228/1223/裤子.png"
						ref="img"
						@error="count++"
					/>
				</div>
			`,
			components: {
				'vc-img': Img,
			},
			data() {
				return {
					count: 0
				};
			},
		});

		await wait(1);

		expect(vm.count).to.equal(1);
	});

	it('lazy-load-extra-scene', async () => {
		let vm = createVue({
			template: `
				<div class="wrap" style="width: 100px; height: 100px; overflow: auto;">
					<vc-img
						src="https://oss.ruishan666.com/image/xcx/180228/803943951788/裤子.png"
						ref="img"
						:lazy="true"
						wrapper="test"
					/>
					<vc-img
						src="https://oss.ruishan666.com/image/xcx/180228/803943951788/裤子.png"
						ref="img2"
						:lazy="true"
						:wrapper="wrapper"
					/>
				</div>
			`,
			components: {
				'vc-img': Img,
			},
			data() {
				return {
					wrapper: '.wrap'
				};
			},
		});

		destroyVM(vm);
	});

	it('hackFit', async () => {
		IMGStore.add('https://oss.ruishan666.com/image/xcx/180228/803943951788/裤子.png', {
			originW: 200,
			originH: 200
		});
		IMGStore.add('https://wyatest.oss-cn-hangzhou.aliyuncs.com/image/1/20190724/100046/AD441A36-DD3D-4593-9642-D0C0006F1908.png!1-0', {
			originW: 640,
			originH: 731
		});
		let vm = createVue({
			template: `
				<div class="wrap" style="width: 100px; height: 100px; overflow: auto;">
					<vc-img
						src="https://oss.ruishan666.com/image/xcx/180228/803943951788/裤子.png"
						ref="img"
						:fit="fit"
						:lazy="true"
					/>
					<vc-img
						:src="src"
						ref="img2"
						:fit="fit"
						:lazy="true"
						:style="style"
					/>
				</div>
			`,
			components: {
				'vc-img': Img,
			},
			data() {
				return {
					fit: 'fill', // ['fill', 'contain', 'cover', 'none', 'scale-down'],
					src: 'https://oss.ruishan666.com/image/xcx/180228/803943951788/裤子.png',
					style: {
						width: '50px',
						height: '50px'
					}
				};
			},
		});

		let hackFit = vm.$refs.img.hackFit;
		expect(JSON.stringify(hackFit('fill')) === '{}').to.equal(true);

		await wait(1);
		let target = vm.$refs.img2;
		hackFit = target.hackFit;
		expect(JSON.stringify(hackFit('fill')) === '{}').to.equal(true);
		expect(hackFit('contain').height === 'auto').to.equal(true);
		expect(hackFit('cover').width === 'auto').to.equal(true);
		expect(hackFit('none').width === 'auto').to.equal(true);
		expect(hackFit('none').height === 'auto').to.equal(true);

		vm.src = 'https://wyatest.oss-cn-hangzhou.aliyuncs.com/image/1/20190724/100046/AD441A36-DD3D-4593-9642-D0C0006F1908.png!1-0';
		await wait(0.1);
		expect(hackFit('contain').width === 'auto').to.equal(true);
		expect(hackFit('cover').height === 'auto').to.equal(true);

		expect(hackFit('scale-down').width === 'auto').to.equal(true);
		vm.style = {
			width: '1000px',
			height: '1000px'
		};
		await wait(0.1);
		expect(hackFit('scale-down').width === 'auto').to.equal(true);
		expect(hackFit('scale-down').height === 'auto').to.equal(true);
	});
});
