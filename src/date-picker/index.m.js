import { Func } from './mobile/core';

import MDatePicker from './mobile/date-picker';
import MDatePickerView from './mobile/date-picker-view';

MDatePicker.open = Func.popup;
MDatePicker.View = MDatePickerView;

export default MDatePicker;
