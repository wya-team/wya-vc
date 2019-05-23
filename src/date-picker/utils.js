import { Utils } from '@wya/utils';
/**
 * YMDHm: Month与Minutes冲突 -> M, m
 */
export const date2value = (v, format = 'YMDHm') => {
	if (!v) return;
	
	let target = {
		Y: v.getFullYear() + '',
		M: v.getMonth() * 1 + 1 + '',
		D: v.getDate() + '',
		H: v.getHours() + '',
		m: v.getMinutes() + '',
	};
	let typeArr = typeof format === 'string' ? format.split('') : format; // 'YMDHm'

	let result = typeArr.map(item => Utils.preZero(target[item]));

	return result;
};

export const value2date = (v = []) => {
	let result = [];
	for (let i = 0; i < 5 - v.length; i++) {
		result.push(false);
	}
	result = [...v, ...result];
	const target = {
		Y: result[0] || new Date().getFullYear(),
		M: result[1] || new Date().getMonth() * 1 + 1,
		D: result[2] || new Date().getDate(),
		H: result[3] || '00',
		m: result[4] || '00',
	};
	return new Date(
		target.Y, 
		target.M * 1 - 1, 
		target.D, 
		target.H, 
		target.m
	);
};

export const parseMode = (value) => {
	let mode;
	switch (value) {
		case 'datetime':
			mode = 'YMDHm';
			break;
		case 'date':
			mode = 'YMD';
			break;
		case 'time':
			mode = 'Hm';
			break;
		case 'yearmonth':
			mode = 'YM';
			break;
		case 'year':
			mode = 'Y';
			break;
		case 'month':
			mode = 'M';
			break;
		default:
			mode = value;
			break;
	}

	return mode;
};