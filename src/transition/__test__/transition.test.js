import { createVue, destroyVM } from '@tests/helper';
import Transition from '../index';

const getStyleValue = (el, property) => {
	return window.getComputedStyle(el, null)[property];
};

describe('Transition', () => {
	let vm;

	afterEach(() => {
		vm && destroyVM(vm);
	});

	it('basic', () => {
		expect(!!Transition).to.equal(true);
	});

	it('collapse', done => {
		vm = createVue({
			template: `
				<div>
					<vc-transition-collapse 
						ref="collapse1"
						:duration="{ enter: 0.1, leave: 0.2 }"
						:delay="{ enter: 0, leave: 0 }"
					>
						<div v-show="visible">这是个有内容的</div>
					</vc-transition-collapse>
					<vc-transition-collapse 
						ref="collapse2"
						:duration="{ enter: 0.1, leave: 0.2 }"
						:delay="{ enter: 0, leave: 0 }"
					>
						<div v-show="visible"></div>
					</vc-transition-collapse>
				</div>
			`,
			components: {
				'vc-transition-collapse': Transition.Collapse
			},
			data() {
				return {
					visible: false
				};
			}
		});
		vm.visible = true;
		setTimeout(() => {
			const transitionStyle = getStyleValue(vm.$refs.collapse1.$el, 'transition');
			const height = getStyleValue(vm.$refs.collapse2.$el, 'height');
			expect(transitionStyle).to.includes('height 0.1s ease-in-out');
			expect(height).to.includes('0px');
		}, 50); // 0-100 是enter阶段
		setTimeout(() => {
			const transitionStyle = getStyleValue(vm.$refs.collapse1.$el, 'transition');
			expect(transitionStyle).to.equal('all 0s ease 0s');
		}, 200); // 100-300 是正常展示阶段
		setTimeout(() => {
			vm.visible = false;
		}, 300);

		setTimeout(() => {
			const transitionStyle = getStyleValue(vm.$refs.collapse1.$el, 'transition');
			expect(transitionStyle).to.includes('height 0.2s ease-in-out');
		}, 450); // 300-500 是leave阶段
		setTimeout(() => {
			const transitionStyle = getStyleValue(vm.$refs.collapse1.$el, 'transition');
			expect(transitionStyle).to.equal('all 0s ease 0s');
			done();
		}, 700); // 700之后 是leave已完成后
	});

	it('fade', done => {
		vm = createVue({
			template: `
				<div>
					<vc-transition-fade 
						ref="fade"
						:duration="{ enter: 0.1, leave: 0.2 }"
						:delay="{ enter: 0, leave: 0 }"
					>
						<div v-show="visible">这是个有内容的</div>
					</vc-transition-fade>
				</div>
			`,
			components: {
				'vc-transition-fade': Transition.Fade
			},
			data() {
				return {
					visible: false
				};
			}
		});
		vm.visible = true;
		setTimeout(() => {
			expect(vm.$refs.fade.$el.classList.contains('vc-transition-fade')).to.be.true;
		}, 50); // 0-100 是enter阶段
		setTimeout(() => {
			expect(vm.$refs.fade.$el.classList.contains('vc-transition-fade')).to.be.false;
			done();
		}, 200); // 100-300 是正常展示阶段
	});

	it('scale', done => {
		vm = createVue({
			template: `
				<div>
					<vc-transition-scale 
						ref="scale"
						:duration="{ enter: 0.1, leave: 0.2 }"
						:delay="{ enter: 0, leave: 0 }"
					>
						<div v-show="visible">这是个有内容的</div>
					</vc-transition-scale>
				</div>
			`,
			components: {
				'vc-transition-scale': Transition.Scale
			},
			data() {
				return {
					visible: false
				};
			}
		});
		vm.visible = true;
		setTimeout(() => {
			expect(vm.$refs.scale.$el.classList.contains('vc-transition-scale')).to.be.true;
		}, 50); // 0-100 是enter阶段
		setTimeout(() => {
			expect(vm.$refs.scale.$el.classList.contains('vc-transition-scale')).to.be.false;
		}, 200); // 100-300 是正常展示阶段
		setTimeout(() => {
			vm.visible = false;
		}, 300);

		setTimeout(() => {
			expect(vm.$refs.scale.$el.classList.contains('vc-transition-scale')).to.be.true;
		}, 450); // 300-500 是leave阶段
		setTimeout(() => {
			expect(vm.$refs.scale.$el.classList.contains('vc-transition-scale')).to.be.false;
			done();
		}, 700); // 700之后 是leave已完成后
	});

	it('slide', done => {
		vm = createVue({
			template: `
				<div>
					<vc-transition-slide 
						ref="slide"
						:duration="{ enter: 0.1, leave: 0.2 }"
						:delay="{ enter: 0, leave: 0 }"
					>
						<div v-show="visible">这是个有内容的</div>
					</vc-transition-slide>
				</div>
			`,
			components: {
				'vc-transition-slide': Transition.Slide
			},
			data() {
				return {
					visible: false
				};
			}
		});
		vm.visible = true;
		setTimeout(() => {
			expect(vm.$refs.slide.$el.classList.contains('vc-transition-slide')).to.be.true;
		}, 50); // 0-100 是enter阶段
		setTimeout(() => {
			expect(vm.$refs.slide.$el.classList.contains('vc-transition-slide')).to.be.false;
		}, 200); // 100-300 是正常展示阶段
		setTimeout(() => {
			vm.visible = false;
		}, 300);

		setTimeout(() => {
			expect(vm.$refs.slide.$el.classList.contains('vc-transition-slide')).to.be.true;
		}, 450); // 300-500 是leave阶段
		setTimeout(() => {
			expect(vm.$refs.slide.$el.classList.contains('vc-transition-slide')).to.be.false;
			done();
		}, 700); // 700之后 是leave已完成后
	});

	it('zoom', done => {
		vm = createVue({
			template: `
				<div>
					<vc-transition-zoom 
						ref="zoom"
						:duration="{ enter: 0.1, leave: 0.2 }"
						:delay="{ enter: 0, leave: 0 }"
					>
						<div v-show="visible">这是个有内容的</div>
					</vc-transition-zoom>
				</div>
			`,
			components: {
				'vc-transition-zoom': Transition.Zoom
			},
			data() {
				return {
					visible: false
				};
			}
		});
		vm.visible = true;
		setTimeout(() => {
			expect(vm.$refs.zoom.$el.classList.contains('vc-transition-zoom')).to.be.true;
		}, 50); // 0-100 是enter阶段
		setTimeout(() => {
			expect(vm.$refs.zoom.$el.classList.contains('vc-transition-zoom')).to.be.false;
		}, 200); // 100-300 是正常展示阶段
		setTimeout(() => {
			vm.visible = false;
		}, 300);

		setTimeout(() => {
			expect(vm.$refs.zoom.$el.classList.contains('vc-transition-zoom')).to.be.true;
		}, 450); // 300-500 是leave阶段
		setTimeout(() => {
			expect(vm.$refs.zoom.$el.classList.contains('vc-transition-zoom')).to.be.false;
			done();
		}, 700); // 700之后 是leave已完成后
	});
});