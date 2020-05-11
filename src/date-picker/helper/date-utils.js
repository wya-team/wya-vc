export const modifyDate = (date, y, m, d) => {
	return new Date(y, m, d, date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
};
  
export const getFirstDayOfMonth = (date) => {
	const temp = new Date(date.getTime());
	temp.setDate(1);
	let day = temp.getDay();
	day = (day === 0 ? 7 : day);
	return day;
};

/**
 * 获取当天00:00:00的时间戳
 * @param {*} date 
 */
export const clearTime = (date) => {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};
  
export const getDateTimestamp = (time) => {
	if (typeof time === 'number' || typeof time === 'string') {
		return clearTime(new Date(time)).getTime();
	} else if (time instanceof Date) {
		return clearTime(time).getTime();
	} else {
		return NaN;
	}
};

/**
 * 
 * @param {*} year 
 * @param {*} month 0,1,2,3,4,5,6,7,8,9,10,11
 */
export const getDayCountOfMonth = (year, month) => {
	if (month === 3 || month === 5 || month === 8 || month === 10) {
	  return 30;
	}
  
	if (month === 1) {
		if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
			return 29;
		} else {
			return 28;
		}
	}
  
	return 31;
};

export const changeYearMonthAndClampDate = (date, year, month) => {
	// clamp date to the number of days in `year`, `month`
	// eg: (2010-1-31, 2010, 2) => 2010-2-28
	const monthDate = Math.min(date.getDate(), getDayCountOfMonth(year, month));
	return modifyDate(date, year, month, monthDate);
};

export const prevDate = (date, amount = 1) => {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate() - amount);
};
  
export const nextDate = (date, amount = 1) => {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
};
  
export const getStartDateOfMonth = (year, month) => {
	const result = new Date(year, month, 1);
	const day = result.getDay();
	if (day === 0) {
	  return prevDate(result, 7);
	} else {
	  return prevDate(result, day);
	}
};

export const prevMonth = (date) => {
	const year = date.getFullYear();
	const month = date.getMonth();
	return month === 0
	  ? changeYearMonthAndClampDate(date, year - 1, 11)
	  : changeYearMonthAndClampDate(date, year, month - 1);
};
  
export const nextMonth = (date) => {
	const year = date.getFullYear();
	const month = date.getMonth();
	return month === 11
	  ? changeYearMonthAndClampDate(date, year + 1, 0)
	  : changeYearMonthAndClampDate(date, year, month + 1);
};
  
export const prevYear = (date, amount = 1) => {
	const year = date.getFullYear();
	const month = date.getMonth();
	return changeYearMonthAndClampDate(date, year - amount, month);
};
  
export const nextYear = (date, amount = 1) => {
	const year = date.getFullYear();
	const month = date.getMonth();
	return changeYearMonthAndClampDate(date, year + amount, month);
};

export const getDateOfTime = (date, time = {}) => {
	let year = date.getFullYear();
	let month = date.getMonth();
	let day = date.getDate();
	let hours = time.hours >= 0 ? time.hours : date.getHours();
	let minutes = time.minutes >= 0 ? time.minutes : date.getMinutes();
	let seconds = time.seconds >= 0 ? time.seconds : date.getSeconds();
	return new Date(year, month, day, hours, minutes, seconds);
};