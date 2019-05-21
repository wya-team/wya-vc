import { Func } from './mobile/core';

import MPicker from './mobile/picker';
import MPickerView from './mobile/picker-view';
import MPickerPopup from './mobile/picker-popup';

// 方法
MPicker.open = Func.popup;

// 组件
MPicker.View = MPickerView;
MPicker.Popup = MPickerPopup;

export default MPicker;

