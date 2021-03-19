import Vue from 'vue';
import { kebabCase, merge } from 'lodash';

// basic
import Alert from './alert/index';
import MAlert from './alert/index.m';
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
import Divider from './divider/index';
import MDivider from './divider/index.m';
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
import Rate from './rate/index';
import MRate from './rate/index.m';
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
import Steps from './steps/index';
import MSteps from './steps/index.m';
import Switch from './switch/index';
import MSwitch from './switch/index.m';
import Table from './table/index';
import MTable from './table/index.m';
import Tabs from './tabs/index';
import MTabs from './tabs/index.m';
import Tag from './tag/index';
import MTag from './tag/index.m';
import Text from './text/index';
import MText from './text/index.m';
import Textarea from './textarea/index';
import MTextarea from './textarea/index.m';
import Timeline from './timeline/index';
import MTimeline from './timeline/index.m';
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
import UploadPicker from './upload-picker/index';
import MUploadPicker from './upload-picker/index.m';

// 功能
import Vc, { VcInstance, VcError, VcBasic } from './vc/index';

import * as Utils from './utils/index';

import Extends from './extends/index';

const Components = {
	// components
	Alert,
	MAlert,
	Artboard,
	MArtboard,
	Button,
	MButton,
	ButtonGroup: Button.Group,
	MButtonGroup: MButton.Group,
	Calendar,
	MCalendar,
	Card,
	MCard,
	Carousel,
	MCarousel,
	CarouselItem: Carousel.Item,
	MCarouselItem: MCarousel.Item,
	Cascader,
	MCascader,
	MCascaderView: MCascader.View,
	Checkbox,
	MCheckbox,
	CheckboxGroup: Checkbox.Group,
	MCheckboxGroup: MCheckbox.Group,
	Clipboard,
	MClipboard,
	Collapse,
	MCollapse,
	CollapseItem: Collapse.Item,
	MCollapseItem: MCollapse.Item,
	ColorPicker,
	MColorPicker,
	Countdown,
	MCountdown,
	Customer,
	MCustomer,
	DatePicker,
	MDatePicker,
	MDatePickerView: MDatePicker.View,
	DebounceClick,
	MDebounceClick,
	Divider,
	MDivider,
	Drawer,
	MDrawer,
	Dropdown,
	MDropdown,
	DropdownItem: Dropdown.Item,
	MDropdownItem: MDropdown.Item,
	DropdownMenu: Dropdown.Menu,
	MDropdownMenu: MDropdown.Menu,
	Echarts,
	MEcharts,
	Editor,
	MEditor,
	EditorView: Editor.View,
	MEditorView: MEditor.View,
	Expand,
	MExpand,
	FilesPicker,
	MFilesPicker,
	Form,
	MForm,
	FormItem: Form.Item,
	MFormItem: MForm.Item,
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
	InputNumber: Input.Number,
	MInputNumber: MInput.Number,
	InputSearch: Input.Search,
	MInputSearch: MInput.Search,
	List,
	MList,
	ListItem: List.Item,
	MListItem: MList.Item,
	Marquee,
	MMarquee,
	Modal,
	MModal,
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
	PickerView: Picker.View,
	MPickerView: MPicker.View,
	PickerPopup: Picker.Popup,
	MPickerPopup: MPicker.Popup,
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
	RadioGroup: Radio.Group,
	MRadioGroup: MRadio.Group,
	Rate,
	MRate,
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
	Steps,
	MSteps,
	StepsItem: Steps.Item,
	MStepsItem: Steps.Item,
	StepsBar: Steps.Bar,
	MStepsBar: Steps.Bar,
	Switch,
	MSwitch,
	Table,
	MTable,
	Tabs,
	MTabs,
	TabsPane: Tabs.Pane,
	MTabsPane: MTabs.Pane,
	Tag,
	MTag,
	Text,
	MText,
	Textarea,
	MTextarea,
	Timeline,
	MTimeline,
	TimelineItem: Timeline.Item,
	MTimelineItem: Timeline.Item,
	TimePicker,
	MTimePicker,
	Touch,
	MTouch,
	Transition,
	MTransition,
	TransitionFade: Transition.Fade,
	MTransitionFade: MTransition.Fade,
	TransitionScale: Transition.Scale,
	MTransitionScale: MTransition.Scale,
	TransitionSlide: Transition.Slide,
	MTransitionSlide: MTransition.Slide,
	TransitionZoom: Transition.Zoom,
	MTransitionZoom: MTransition.Zoom,
	TransitionCollapse: Transition.Collapse,
	MTransitionCollapse: MTransition.Collapse,
	Tree,
	MTree,
	TreeSelect: Tree.Select,
	MTreeSelect: MTree.Select,
	Upload,
	MUpload,
	UploadPicker,
	MUploadPicker
};

const install = ($Vue, opts = {}) => {

	// 给vc.browser.js打包使用
	if (typeof window !== 'undefined') {
		$Vue = $Vue || window.Vue || Vue;
		window.Vue = $Vue;
	}

	$Vue.use(Vc, opts);
	Object.keys(Components).forEach(key => {
		let comp = kebabCase(key);
		comp = comp.includes('m-') ? `vc${comp}` : `vc-${comp}`;
		$Vue.component(comp, Components[key]);
	});
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue, window.VcOptions);
}

// extra
exports.Vc = Vc;
exports.VcInstance = VcInstance;
exports.VcBasic = VcBasic;
exports.VcError = VcError;
exports.Utils = Utils;
exports.Extends = Extends;

// component
exports.Alert = Artboard;
exports.MAlert = Artboard;
exports.Artboard = MArtboard;
exports.MArtboard = MArtboard;
exports.Button = Button;
exports.MButton = MButton;
exports.ButtonGroup = Button.Group;
exports.MButtonGroup = MButton.Group;
exports.Calendar = Calendar;
exports.MCalendar = MCalendar;
exports.Card = Card;
exports.MCard = MCard;
exports.Carousel = Carousel;
exports.MCarousel = MCarousel;
exports.CarouselItem = Carousel.Item;
exports.MCarouselItem = MCarousel.Item;
exports.Cascader = Cascader;
exports.MCascader = MCascader;
exports.MCascaderView = MCascader.View;
exports.Checkbox = Checkbox;
exports.MCheckbox = MCheckbox;
exports.CheckboxGroup = Checkbox.Group;
exports.MCheckboxGroup = MCheckbox.Group;
exports.Clipboard = Clipboard;
exports.MClipboard = MClipboard;
exports.Collapse = Collapse;
exports.MCollapse = MCollapse;
exports.CollapseItem = Collapse.Item;
exports.MCollapseItem = MCollapse.Item;
exports.ColorPicker = ColorPicker;
exports.MColorPicker = MColorPicker;
exports.Countdown = Countdown;
exports.MCountdown = MCountdown;
exports.Customer = Customer;
exports.MCustomer = MCustomer;
exports.DatePicker = DatePicker;
exports.MDatePicker = MDatePicker;
exports.MDatePickerView = MDatePicker.View;
exports.DebounceClick = DebounceClick;
exports.MDebounceClick = MDebounceClick;
exports.Divider = Divider;
exports.MDivider = MDivider;
exports.Drawer = Drawer;
exports.MDrawer = MDrawer;
exports.Dropdown = Dropdown;
exports.MDropdown = MDropdown;
exports.DropdownItem = Dropdown.Item;
exports.MDropdownItem = MDropdown.Item;
exports.DropdownMenu = Dropdown.Menu;
exports.MDropdownMenu = MDropdown.Menu;
exports.Echarts = Echarts;
exports.MEcharts = MEcharts;
exports.Editor = Editor;
exports.MEditor = MEditor;
exports.EditorView = Editor.View;
exports.MEditorView = MEditor.View;
exports.Expand = Expand;
exports.MExpand = MExpand;
exports.FilesPicker = FilesPicker;
exports.MFilesPicker = MFilesPicker;
exports.Form = Form;
exports.MForm = MForm;
exports.FormItem = Form.Item;
exports.MFormItem = MForm.Item;
exports.Fragment = Fragment;
exports.MFragment = MFragment;
exports.HtmlImg = HtmlImg;
exports.MHtmlImg = MHtmlImg;
exports.Icon = Icon;
exports.MIcon = MIcon;
exports.Img = Img;
exports.MImg = MImg;
exports.ImgsCrop = ImgsCrop;
exports.MImgsCrop = MImgsCrop;
exports.ImgsPicker = ImgsPicker;
exports.MImgsPicker = MImgsPicker;
exports.ImgsPreview = ImgsPreview;
exports.MImgsPreview = MImgsPreview;
exports.ImgsProcessing = ImgsProcessing;
exports.MImgsProcessing = MImgsProcessing;
exports.Input = Input;
exports.MInput = MInput;
exports.InputNumber = Input.Number;
exports.MInputNumber = MInput.Number;
exports.InputSearch = Input.Search;
exports.MInputSearch = MInput.Search;
exports.List = List;
exports.MList = MList;
exports.ListItem = List.Item;
exports.MListItem = MList.Item;
exports.Marquee = Marquee;
exports.MMarquee = MMarquee;
exports.Notice = Notice;
exports.MNotice = MNotice;
exports.Option = Option;
exports.MOption = MOption;
exports.Page = Page;
exports.MPage = MPage;
exports.Paging = Paging;
exports.MPaging = MPaging;
exports.Picker = Picker;
exports.MPicker = MPicker;
exports.PickerView = Picker.View;
exports.MPickerView = MPicker.View;
exports.PickerPopup = Picker.Popup;
exports.MPickerPopup = MPicker.Popup;
exports.Popconfirm = Popconfirm;
exports.MPopconfirm = MPopconfirm;
exports.Popover = Popover;
exports.MPopover = MPopover;
exports.Popup = Popup;
exports.MPopup = MPopup;
exports.Print = Print;
exports.MPrint = MPrint;
exports.Progress = Progress;
exports.MProgress = MProgress;
exports.PullScroll = PullScroll;
exports.MPullScroll = MPullScroll;
exports.Radio = Radio;
exports.MRadio = MRadio;
exports.RadioGroup = Radio.Group;
exports.MRadioGroup = MRadio.Group;
exports.Rate = Rate;
exports.MRate = MRate;
exports.RecycleList = RecycleList;
exports.MRecycleList = MRecycleList;
exports.Select = Select;
exports.MSelect = MSelect;
exports.Slider = Slider;
exports.MSlider = MSlider;
exports.SortList = SortList;
exports.MSortList = MSortList;
exports.Spin = Spin;
exports.MSpin = MSpin;
exports.Steps = Steps;
exports.MSteps = MSteps;
exports.StepsItem = Steps.Item;
exports.MStepsItem = MSteps.Item;
exports.StepsBar = Steps.Bar;
exports.MStepsBar = MSteps.Bar;
exports.Switch = Switch;
exports.MSwitch = MSwitch;
exports.Table = Table;
exports.MTable = MTable;
exports.Tabs = Tabs;
exports.MTabs = MTabs;
exports.TabsPane = Tabs.Pane;
exports.MTabsPane = MTabs.Pane;
exports.Tag = Tag;
exports.MTag = MTag;
exports.Text = Text;
exports.MText = MText;
exports.Textarea = Textarea;
exports.MTextarea = MTextarea;
exports.Timeline = Timeline;
exports.MTimeline = MTimeline;
exports.TimelineItem = Timeline.Item;
exports.MTimelineItem = MTimeline.Item;
exports.TimePicker = TimePicker;
exports.MTimePicker = MTimePicker;
exports.Touch = Touch;
exports.MTouch = MTouch;
exports.Transition = Transition;
exports.MTransition = MTransition;
exports.TransitionFade = Transition.Fade;
exports.MTransitionFade = MTransition.Fade;
exports.TransitionScale = Transition.Scale;
exports.MTransitionScale = MTransition.Scale;
exports.TransitionSlide = Transition.Slide;
exports.MTransitionSlide = MTransition.Slide;
exports.TransitionZoom = Transition.Zoom;
exports.MTransitionZoom = MTransition.Zoom;
exports.TransitionCollapse = Transition.Collapse;
exports.MTransitionCollapse = MTransition.Collapse;
exports.Tree = Tree;
exports.MTree = MTree;
exports.TreeSelect = Tree.Select;
exports.MTreeSelect = MTree.Select;
exports.Upload = Upload;
exports.MUpload = MUpload;
exports.UploadPicker = UploadPicker;
exports.MUploadPicker = MUploadPicker;
// 弹
exports.Message = Message;
exports.MMessage = MMessage;
exports.Modal = Modal;
exports.MModal = MModal;
exports.Portal = Portal;
exports.MPortal = MPortal;
exports.Toast = Toast;
exports.MToast = MToast;

// 用于打包映射
exports.version = '__VC_VERSION__';
exports.install = install;

export default merge(
	{ 
		version: '__VC_VERSION__', 
		install
	},
	{
		Vc,
		VcInstance,
		VcBasic,
		VcError,
		Utils,
		Extends
	},
	{
		Message,
		MMessage,
		Modal,
		MModal,
		Portal,
		MPortal,
		Toast,
		MToast,
	},
	Components
);

