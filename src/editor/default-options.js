import { IS_SERVER } from '../utils/constant';
import { letterSpacing, lineHeight } from './constant';

export default {
	theme: 'snow',
	boundary: IS_SERVER ? null : document.body, 
	modules: {
		toolbar: [
			['bold', 'italic', 'underline', 'strike'],
			['blockquote', 'code-block'],
			[{ 'header': 1 }, { 'header': 2 }],
			[{ 'list': 'ordered' }, { 'list': 'bullet' }],
			[{ 'script': 'sub' }, { 'script': 'super' }],
			[{ 'indent': '-1' }, { 'indent': '+1' }],
			[{ 'direction': 'rtl' }],
			[{ 'size': ['12px', '14px', '16px', '18px', '20px', '22px', '24px', '50px'] }],
			[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
			[{ 'color': [] }, { 'background': [] }],
			[{ 'font': [] }],
			[{ lineHeight }], 
			[{ letterSpacing }], 
			[{ 'align': [] }],
			// ['clean'],
			['link', 'vc-image', 'vc-undo', 'vc-redo']
		],
	},
	placeholder: '请输入内容',
	readOnly: false
};