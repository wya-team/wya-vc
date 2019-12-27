/**
 * TODO: 按需加载的组件如何处理，如echarts
 * 孵化更好的2.0
 */

import { kebabCase } from 'lodash';

// basic
import Artboard from './artboard/index';
import MArtboard from './artboard/index.m';
import Button from './button/index';
import MButton from './button/index.m';
import Calendar from './calendar/index';
import MCalendar from './calendar/index.m';
import Card from './card/index';
import MCard from './card/index.m';
import Carousel from './carousel/index';
import MCarousel from './carousel/index.m';
import Cascader from './cascader/index';
import MCascader from './cascader/index.m';
import Checkbox from './checkbox/index';
import MCheckbox from './checkbox/index.m';
import Clipboard from './clipboard/index';
import MClipboard from './clipboard/index.m';
import Collapse from './collapse/index';
import MCollapse from './collapse/index.m';
import ColorPicker from './color-picker/index';
import MColorPicker from './color-picker/index.m';
import Countdown from './countdown/index';
import MCountdown from './countdown/index.m';
import Customer from './customer/index';
import MCustomer from './customer/index.m';
import DatePicker from './date-picker/index';
import MDatePicker from './date-picker/index.m';
import DebounceClick from './debounce-click/index';
import MDebounceClick from './debounce-click/index.m';
import Drawer from './drawer/index';
import MDrawer from './drawer/index.m';
import Dropdown from './dropdown/index';
import MDropdown from './dropdown/index.m';
import Echarts from './echarts/index';
import MEcharts from './echarts/index.m';
import Editor from './editor/index';
import MEditor from './editor/index.m';
import Expand from './expand/index';
import MExpand from './expand/index.m';
import FilesPicker from './files-picker/index';
import MFilesPicker from './files-picker/index.m';
import Form from './form/index';
import MForm from './form/index.m';
import Fragment from './fragment/index';
import MFragment from './fragment/index.m';
import HtmlImg from './html-img/index';
import MHtmlImg from './html-img/index.m';
import Icon from './icon/index';
import MIcon from './icon/index.m';
import Img from './img/index';
import MImg from './img/index.m';
import ImgsCrop from './imgs-crop/index';
import MImgsCrop from './imgs-crop/index.m';
import ImgsPicker from './imgs-picker/index';
import MImgsPicker from './imgs-picker/index.m';
import ImgsPreview from './imgs-preview/index';
import MImgsPreview from './imgs-preview/index.m';
import ImgsProcessing from './imgs-processing/index';
import MImgsProcessing from './imgs-processing/index.m';
import Input from './input/index';
import MInput from './input/index.m';
import List from './list/index';
import MList from './list/index.m';
import Marquee from './marquee/index';
import MMarquee from './marquee/index.m';
import Message from './message/index';
import MMessage from './message/index.m';
import Modal from './modal/index';
import MModal from './modal/index.m';
import Notice from './notice/index';
import MNotice from './notice/index.m';
import Option from './option/index';
import MOption from './option/index.m';
import Page from './page/index';
import MPage from './page/index.m';
import Paging from './paging/index';
import MPaging from './paging/index.m';
import Picker from './picker/index';
import MPicker from './picker/index.m';
import Popconfirm from './popconfirm/index';
import MPopconfirm from './popconfirm/index.m';
import Popover from './popover/index';
import MPopover from './popover/index.m';
import Popup from './popup/index';
import MPopup from './popup/index.m';
import Portal from './portal/index';
import MPortal from './portal/index.m';
import Print from './print/index';
import MPrint from './print/index.m';
import Progress from './progress/index';
import MProgress from './progress/index.m';
import PullScroll from './pull-scroll/index';
import MPullScroll from './pull-scroll/index.m';
import Radio from './radio/index';
import MRadio from './radio/index.m';
import RecycleList from './recycle-list/index';
import MRecycleList from './recycle-list/index.m';
import Select from './select/index';
import MSelect from './select/index.m';
import Slider from './slider/index';
import MSlider from './slider/index.m';
import SortList from './sort-list/index';
import MSortList from './sort-list/index.m';
import Spin from './spin/index';
import MSpin from './spin/index.m';
import Switch from './switch/index';
import MSwitch from './switch/index.m';
import Table from './table/index';
import MTable from './table/index.m';
import Tabs from './tabs/index';
import MTabs from './tabs/index.m';
import Tag from './tag/index';
import MTag from './tag/index.m';
import Textarea from './textarea/index';
import MTextarea from './textarea/index.m';
import TimePicker from './time-picker/index';
import MTimePicker from './time-picker/index.m';
import Toast from './toast/index';
import MToast from './toast/index.m';
import Touch from './touch/index';
import MTouch from './touch/index.m';
import Transition from './transition/index';
import MTransition from './transition/index.m';
import Tree from './tree/index';
import MTree from './tree/index.m';
import Upload from './upload/index';
import MUpload from './upload/index.m';

// 功能
import Vc, { VcInstance, VcError, VcBasic } from './vc/index';

import * as Utils from './utils/index';

export { default as Extends } from './extends/index';

const Components = {
	// components
	Artboard,
	MArtboard,
	Button,
	MButton,
	Calendar,
	MCalendar,
	Card,
	MCard,
	Carousel,
	MCarousel,
	Cascader,
	MCascader,
	Checkbox,
	MCheckbox,
	Clipboard,
	MClipboard,
	Collapse,
	MCollapse,
	ColorPicker,
	MColorPicker,
	Countdown,
	MCountdown,
	Customer,
	MCustomer,
	DatePicker,
	MDatePicker,
	DebounceClick,
	MDebounceClick,
	Drawer,
	MDrawer,
	Dropdown,
	MDropdown,
	Echarts,
	MEcharts,
	Editor,
	MEditor,
	Expand,
	MExpand,
	FilesPicker,
	MFilesPicker,
	Form,
	MForm,
	Fragment,
	MFragment,
	HtmlImg,
	MHtmlImg,
	Icon,
	MIcon,
	Img,
	MImg,
	ImgsCrop,
	MImgsCrop,
	ImgsPicker,
	MImgsPicker,
	ImgsPreview,
	MImgsPreview,
	ImgsProcessing,
	MImgsProcessing,
	Input,
	MInput,
	List,
	MList,
	Marquee,
	MMarquee,
	Notice,
	MNotice,
	Option,
	MOption,
	Page,
	MPage,
	Paging,
	MPaging,
	Picker,
	MPicker,
	Popconfirm,
	MPopconfirm,
	Popover,
	MPopover,
	Popup,
	MPopup,
	Print,
	MPrint,
	Progress,
	MProgress,
	PullScroll,
	MPullScroll,
	Radio,
	MRadio,
	RecycleList,
	MRecycleList,
	Select,
	MSelect,
	Slider,
	MSlider,
	SortList,
	MSortList,
	Spin,
	MSpin,
	Switch,
	MSwitch,
	Table,
	MTable,
	Tabs,
	MTabs,
	Tag,
	MTag,
	Textarea,
	MTextarea,
	TimePicker,
	MTimePicker,
	Touch,
	MTouch,
	Transition,
	MTransition,
	Tree,
	MTree,
	Upload,
	MUpload
};

const install = (Vue, opts = {}) => {
	Vue.use(Vc, opts);

	Object.keys(Components).forEach(key => {
		let comp = kebabCase(key);
		comp = comp.includes('m-') ? `vc${comp}` : `vc-${comp}`;
		// TODO: 如Input.Number -> vc-input-number, 需要额外处理
		Vue.component(comp, Components[key]);
	});
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue, window.VcOptions);
}

export {
	Vc,
	VcInstance,
	VcBasic,
	VcError,
	Utils,

	// components
	Artboard,
	MArtboard,
	Button,
	MButton,
	Calendar,
	MCalendar,
	Card,
	MCard,
	Carousel,
	MCarousel,
	Cascader,
	MCascader,
	Checkbox,
	MCheckbox,
	Clipboard,
	MClipboard,
	Collapse,
	MCollapse,
	ColorPicker,
	MColorPicker,
	Countdown,
	MCountdown,
	Customer,
	MCustomer,
	DatePicker,
	MDatePicker,
	DebounceClick,
	MDebounceClick,
	Drawer,
	MDrawer,
	Dropdown,
	MDropdown,
	Echarts,
	MEcharts,
	Editor,
	MEditor,
	Expand,
	MExpand,
	FilesPicker,
	MFilesPicker,
	Form,
	MForm,
	Fragment,
	MFragment,
	HtmlImg,
	MHtmlImg,
	Icon,
	MIcon,
	Img,
	MImg,
	ImgsCrop,
	MImgsCrop,
	ImgsPicker,
	MImgsPicker,
	ImgsPreview,
	MImgsPreview,
	ImgsProcessing,
	MImgsProcessing,
	Input,
	MInput,
	List,
	MList,
	Marquee,
	MMarquee,
	Notice,
	MNotice,
	Option,
	MOption,
	Page,
	MPage,
	Paging,
	MPaging,
	Picker,
	MPicker,
	Popconfirm,
	MPopconfirm,
	Popover,
	MPopover,
	Popup,
	MPopup,
	Print,
	MPrint,
	Progress,
	MProgress,
	PullScroll,
	MPullScroll,
	Radio,
	MRadio,
	RecycleList,
	MRecycleList,
	Select,
	MSelect,
	Slider,
	MSlider,
	SortList,
	MSortList,
	Spin,
	MSpin,
	Switch,
	MSwitch,
	Table,
	MTable,
	Tabs,
	MTabs,
	Tag,
	MTag,
	Textarea,
	MTextarea,
	TimePicker,
	MTimePicker,
	Touch,
	MTouch,
	Transition,
	MTransition,
	Tree,
	MTree,
	Upload,
	MUpload,

	// 弹层
	Message,
	MMessage,
	Modal,
	MModal,
	Portal,
	MPortal,
	Toast,
	MToast
};

export default {
	version: '2.0.0',
	install
};

