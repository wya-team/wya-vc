import { createVue, destroyVM, wait, triggerEvent } from '@tests/helper';
import HtmlImg from '../index';

describe('HtmlImg', () => {
	it('basic', () => {
		expect(!!HtmlImg).to.equal(true);
	});
	it('生成图片', async () => {
		let vm = createVue({
			template: `
			<div>
				<img :src="src">
				<vc-html-img ref="target" :parser="parser">
					<div>tpl</div>
					<div>tpl</div>
					<div>tpl</div>
					<div>tpl</div>
					<div>tpl</div>
					<div>tpl</div>
					<img src="https://avatars3.githubusercontent.com/u/34465004?s=200&v=4" class="image">
					<!-- 需要crossorigin加在第一个， 才能处理跨域 -->
					<img 
						crossorigin="anonymous" 
						src="https://wyatest.oss-cn-hangzhou.aliyuncs.com/image/1/20190518/102315/227984.jpg" 
						class="image"
					>
				</vc-html-img>
				<button @click="handleClick">
					生成
				</button>
			</div>
			`,
			data() {
				return {
					src: ''
				};
			},
			components: {
				'vc-html-img': HtmlImg,
			},
			methods: {
				async handleClick() {
					let res = await this.$refs.target.download();
					this.src = res.base64Image;
				},
				parser(url) {
					return new Promise((resolve) => {
						setTimeout(() => {
							resolve(url);
						}, 3000);
					});
				}
			}
		});
		triggerEvent(vm.$el.querySelector('button'), 'click');
		await wait(6);
		expect(vm.src).to.not.equal('');
		destroyVM(vm);
	});
	it('生成图片失败', async () => {
		let vm = createVue({
			template: `
			<div>
				<img :src="src">
				<vc-html-img ref="target" :parser="parser">
					<div>tpl</div>
					<div>tpl</div>
					<div>tpl</div>
					<div>tpl</div>
					<div>tpl</div>
					<div>tpl</div>
					<img src="https://avatars3.githubusercontent.com/u/34465004?s=200&v=4" class="image">
					<!-- 需要crossorigin加在第一个， 才能处理跨域 -->
					<img 
						crossorigin="anonymous" 
						src="https://wyatest.oss-cn-hangzhou.aliyuncs.com/image/1/20190518/102315/227984.jpg" 
						class="image"
					>
				</vc-html-img>
				<button @click="handleClick">
					生成
				</button>
			</div>
			`,
			data() {
				return {
					src: ''
				};
			},
			components: {
				'vc-html-img': HtmlImg,
			},
			methods: {
				async handleClick() {
					let res = await this.$refs.target.getImage();
					this.src = res.base64Image;
				},
				parser(url) {
					return new Promise((resolve, reject) => {
						setTimeout(() => {
							reject;
						}, 3000);
					});
				}
			}
		});
		triggerEvent(vm.$el.querySelector('button'), 'click');
		await wait(6);
		expect(vm.src).to.equal('');
		destroyVM(vm);
	});
});