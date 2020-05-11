import { createVue, destroyVM, wait } from '@tests/helper';
import Echarts from '..';

let getOptions = () => {
	let data = [];

	for (let i = 0; i <= 360; i++) {
		let t = i / 180 * Math.PI;
		let r = Math.sin(2 * t) * Math.cos(2 * t);
		data.push([r, i]);
	}

	return {
		title: {
			text: '极坐标双数值轴'
		},
		legend: {
			data: ['line']
		},
		polar: {
			center: ['50%', '54%']
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross'
			}
		},
		angleAxis: {
			type: 'value',
			startAngle: 0
		},
		radiusAxis: {
			min: 0
		},
		series: [
			{
				coordinateSystem: 'polar',
				name: 'line',
				type: 'line',
				showSymbol: false,
				data
			}
		],
		animationDuration: 2000
	};
};
const DEFAULT_OPTIONS = getOptions();

describe('Echarts', () => {
	it('basic', () => {
		expect(!!Echarts).to.equal(true);
	});

	it('options', async () => {
		let vm = createVue({
			render(h) {
				return (
					<div style={{ width: 800, height: 800 }}>
						<Echarts options={DEFAULT_OPTIONS}/>
					</div>
				);
			}
		});

		// echarts 按需加载需要花费一定时间
		await wait(0.2);
		destroyVM(vm);
	});
});