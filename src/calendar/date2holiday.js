/* -----------------------------------------------
 1900年至2100年公历转农历、节假日、节气、生肖等
 使用方法：var xx = date2holiday('2017-03-31'); // 返回值看文件后面
 -- 需要 jQuery 支持
-----------------------------------------------*/
const yearBitTable = [43856, 19416, 19168, 42352, 21717, 53856, 55632, 25940, 22191, 39632, 21970, 19168, 42422, 42192, 53840, 53845, 46415, 54944, 44450, 38320, 18807, 18815, 42160, 46261, 27216, 27968, 43860, 11119, 38256, 21234, 18800, 25958, 54432, 59984, 27285, 23263, 11104, 34531, 37615, 51415, 51551, 54432, 55462, 46431, 22176, 42420, 9695, 37584, 53938, 43344, 46423, 27808, 46416, 21333, 19887, 42416, 17779, 21183, 43432, 59728, 27296, 44710, 43856, 19296, 43748, 42352, 21088, 62051, 55632, 23383, 22176, 38608, 19925, 19152, 42192, 54484, 53840, 54616, 46400, 46752, 38310, 38335, 18864, 43380, 42160, 45690, 27216, 27968, 44870, 43872, 38256, 19189, 18800, 25776, 29859, 59984, 27480, 23232, 43872, 38613, 37600, 51552, 55636, 54432, 55888, 30034, 22176, 43959, 9680, 37584, 51893, 43344, 46240, 47780, 44368, 21977, 19360, 42416, 20854, 21183, 43312, 31060, 27296, 44368, 23378, 19296, 42726, 42208, 53856, 60005, 54576, 23200, 30371, 38608, 19195, 19152, 42192, 53430, 53855, 54560, 56645, 46496, 22224, 21938, 18864, 42359, 42160, 43600, 45653, 27951, 44448, 19299, 37759, 18936, 18800, 25776, 26790, 59999, 27424, 42692, 43759, 37600, 53987, 51552, 54615, 54432, 55888, 23893, 22176, 42704, 21972, 21200, 43448, 43344, 46240, 46758, 44368, 21920, 43940, 42416, 21168, 45683, 26928, 29495, 27296, 44368, 19285, 19311, 42352, 21732, 53856, 59752, 54560, 55968, 27302, 22239, 19168, 43476, 42192, 53584, 62034, 54560]; // eslint-disable-line
// 1900-2100各年的24节气日期表
const solarTermsTable = ["9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c3598082c95f8c965cc920f", "97bd0b06bdb0722c965ce1cfcc920f", "b027097bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd0b06bdb0722c965ce1cfcc920f", "b027097bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd0b06bdb0722c965ce1cfcc920f", "b027097bd097c36b0b6fc9274c91aa", "9778397bd19801ec9210c965cc920e", "97b6b97bd19801ec95f8c965cc920f", "97bd09801d98082c95f8e1cfcc920f", "97bd097bd097c36b0b6fc9210c8dc2", "9778397bd197c36c9210c9274c91aa", "97b6b97bd19801ec95f8c965cc920e", "97bd09801d98082c95f8e1cfcc920f", "97bd097bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c91aa", "97b6b97bd19801ec95f8c965cc920e", "97bcf97c3598082c95f8e1cfcc920f", "97bd097bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c3598082c95f8c965cc920f", "97bd097bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c3598082c95f8c965cc920f", "97bd097bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd097bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd097bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd097bd07f595b0b6fc920fb0722", "9778397bd097c36b0b6fc9210c8dc2", "9778397bd19801ec9210c9274c920e", "97b6b97bd19801ec95f8c965cc920f", "97bd07f5307f595b0b0bc920fb0722", "7f0e397bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c920e", "97b6b97bd19801ec95f8c965cc920f", "97bd07f5307f595b0b0bc920fb0722", "7f0e397bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bd07f1487f595b0b0bc920fb0722", "7f0e397bd097c36b0b6fc9210c8dc2", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf7f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf7f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf7f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf7f1487f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c9274c920e", "97bcf7f0e47f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9210c91aa", "97b6b97bd197c36c9210c9274c920e", "97bcf7f0e47f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c920e", "97b6b7f0e47f531b0723b0b6fb0722", "7f0e37f5307f595b0b0bc920fb0722", "7f0e397bd097c36b0b6fc9210c8dc2", "9778397bd097c36b0b70c9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e37f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc9210c8dc2", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e27f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0787b0721", "7f0e27f0e47f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9210c91aa", "97b6b7f0e47f149b0723b0787b0721", "7f0e27f0e47f531b0723b0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9210c8dc2", "977837f0e37f149b0723b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e37f5307f595b0b0bc920fb0722", "7f0e397bd097c35b0b6fc9210c8dc2", "977837f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e37f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc9210c8dc2", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f149b0723b0787b0721", "7f0e27f0e47f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "977837f0e37f14998082b0723b06bd", "7f07e7f0e37f149b0723b0787b0721", "7f0e27f0e47f531b0723b0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "977837f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e37f1487f595b0b0bb0b6fb0722", "7f0e37f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e37f1487f531b0b0bb0b6fb0722", "7f0e37f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e37f1487f531b0b0bb0b6fb0722", "7f0e37f0e37f14898082b072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e37f0e37f14898082b072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e37f0e366aa89801eb072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f149b0723b0787b0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e37f0e366aa89801eb072297c35", "7ec967f0e37f14998082b0723b06bd", "7f07e7f0e47f149b0723b0787b0721", "7f0e27f0e47f531b0723b0b6fb0722", "7f0e37f0e366aa89801eb072297c35", "7ec967f0e37f14998082b0723b06bd", "7f07e7f0e37f14998083b0787b0721", "7f0e27f0e47f531b0723b0b6fb0722", "7f0e37f0e366aa89801eb072297c35", "7ec967f0e37f14898082b0723b02d5", "7f07e7f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e36665b66aa89801e9808297c35", "665f67f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e36665b66a449801e9808297c35", "665f67f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e36665b66a449801e9808297c35", "665f67f0e37f14898082b072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e26665b66a449801e9808297c35", "665f67f0e37f1489801eb072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722"]; // eslint-disable-line
const arrSolarTerms = ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"]; // eslint-disable-line
const h = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const d = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const arrAnimals = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
const k = ["初", "十", "廿", "三十"];
const g = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
const arrChineseMonthTitles = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "腊"];

const fnLunar = {
	yearDataCache: {},
	getDate(u) {
		let x = Math.ceil((u - new Date(1899, 1, 11)) / 86400000);
		let w = 1899;
		let s;
		let r;
		let q;
		let t;
		let v;
		for (; w < 2100 && x > 0; w++) {
			s = this.getYearDays(w);
			x -= s;
		}
		x < 0 && (x += s, w--);
		q = w;
		r = this.getLeapMonth(q) || false;
		for (w = 1; w <= 12; w++) {
			s = this.getMonthDays(q, w);
			if (r === true) {
				r = false;
				w--;
				s = this.getLeapDays(q);
				if (x < s) {
					t = true;
				}
			}
			if (r === w) {
				r = true;
			}
			if (x < s) {
				v = s === 30;
				break;
			}
			x -= s;
		}
		return {
			lunarYear: q,
			lunarMonth: w,
			lunarDay: x + 1,
			isLeap: t,
			isBigMonth: v
		};
	},
	// 返回农历年一整年的总天数
	getYearDays(q) {
		let r;
		let t = this.yearDataCache;
		if (t[q]) {
			return t[q];
		}
		let s = 348;
		let u = yearBitTable[q - 1899];
		for (r = 32768; r > 8; r >>= 1) {
			s += r & u ? 1 : 0;
		}
		s += this.getLeapDays(q);
		t[q] = s;
		return s;
	},
	// 返回农历年闰月的天数 若该年没有闰月则返回0
	getLeapDays(q) {
		return this.getLeapMonth(q) ? (yearBitTable[q - 1899 + 1] & 15 === 15 ? 30 : 29) : 0; // eslint-disable-line   
	},
	// 返回农历年闰月是哪个月；若年没有闰月 则返回0
	getLeapMonth(r) {
		let q = yearBitTable[r - 1899] & 15;
		return q == 15 ? 0 : q;
	},
	// 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用 getLeapDays 方法
	getMonthDays(y, m) {
		return (yearBitTable[y - 1899] & (65536 >> m)) ? 30 : 29;
	}
};

// 农历1900-2100的闰大小信息 return: hex 2 DateTime
let getLeapYearTime = function (year, doubleMonth) {
	let v = solarTermsTable[year - 1900];
	let hex = [];
	let s = 0;
	let q;
	for (; s < 30; s += 5) {
		q = (+("0x" + v.substr(s, 5))).toString();
		hex.push(q.substr(0, 1));
		hex.push(q.substr(1, 2));
		hex.push(q.substr(3, 1));
		hex.push(q.substr(4, 2));
	}
	return new Date(year, parseInt(doubleMonth / 2, 10), hex[doubleMonth]);
};
// 阴历相关计算函数(获得数字年份/月份/日期 等)
let fnLunarDate = {
	calculate(q) {
		return h[q % 10] + d[q % 12];
	},
	getGzYear(r, s, q) {
		return this.calculate(s - 1900 + 36 - (q === s ? 0 : 1));
	},
	getGzMonth(q, r, s) {
		let t = getLeapYearTime(r, q.getMonth() * 2);
		return this.calculate((r - 1900) * 12 + s + 12 - (q < t ? 1 : 0));
	},
	getGzDay(q) {
		return this.calculate(Math.ceil(q / 86400000 + 25567 + 10));
	}
};
// 节假日（除夕不在下列，需要动态计算）
let oFestivals = {
	t0101: "t,春节 ", // t 开头的是中国传统节日
	t0115: "t,元宵节",
	t0202: "t,龙头节",
	t0505: "t,端午节",
	t0707: "t,七夕节",
	t0715: "t,中元节",
	t0815: "t,中秋节",
	t0909: "t,重阳节",
	t1001: "t,寒衣节",
	t1015: "t,下元节",
	t1208: "t,腊八节",
	t1223: "t,小年",
	"0202": "i,湿地日,1996",
	"0308": "i,妇女节,1975",
	// "0315": "i,消费者权益日,1983",
	"0401": "i,愚人节,1564",
	"0422": "i,地球日,1990",
	"0501": "i,劳动节,1889",
	"0512": "i,护士节,1912",
	// "0518": "i,博物馆日,1977",
	"0605": "i,环境日,1972",
	// "0623": "i,奥林匹克日,1948",
	// "1020": "i,骨质疏松日,1998",
	// "1117": "i,学生日,1942",
	// "1201": "i,艾滋病日,1988",
	"0101": "h,元旦",
	"0312": "h,植树节,1979",
	"0504": "h,青年节,1939",
	"0601": "h,儿童节,1950",
	"0701": "h,建党节,1941",
	"0801": "h,建军节,1933",
	// "0903": "h,抗战胜利日,1945",
	"0910": "h,教师节,1985",
	"1001": "h,国庆节,1949",
	"1224": "c,平安夜",
	"1225": "c,圣诞节",
	"0214": "a,情人节",
	extra: { // 前2位: 月份，第3位: 第几个星期，第4位: 星期几
		"0520": "i,母亲节,1913",
		"0630": "a,父亲节",
		"1144": "a,感恩节"
	}
};
const zeroPad = (num) => { // 填充零
	return num < 10 ? "0" + num : num;
};
const getFestival = (oDate, lunarInfo) => {
	let _year = oDate.getFullYear();
	let _month = oDate.getMonth() + 1;
	let _date = oDate.getDate();
	let _day = oDate.getDay();
	let _week = Math.ceil(_date / 7);
	let _extra = zeroPad(_month) + _week + _day;
	let _traditional = "t" + zeroPad(lunarInfo.lunarMonth) + zeroPad(lunarInfo.lunarDay);
	let _normal = zeroPad(_month) + zeroPad(_date);
	let arrHolidays = [];
	let item;
	if (lunarInfo.lunarMonth === 12 && lunarInfo.lunarDay === (lunarInfo.isBigMonth ? 30 : 29)) {
		arrHolidays.push("t,除夕");
	}
	arrHolidays = arrHolidays.concat([oFestivals.extra[_extra], oFestivals[_normal], oFestivals[_traditional]]);
	let i = 0;
	for (; i < arrHolidays.length; i++) {
		if (arrHolidays[i]) {
			item = arrHolidays[i].split(",");
			if (item[2] && _year < item[2]) {
				arrHolidays[i] = null;
				continue; // eslint-disable-line
			}
			arrHolidays[i] = {
				type: item[0],
				desc: item[1],
				value: item[1]
			};
		}
	}
	arrHolidays.sort((a, b) => { // 按 type 字母倒序排列(靠后的字母权重高，会排到前面)
		if (a && b) {
			return b.type.charCodeAt(0) - a.type.charCodeAt(0);
		}
		return !a ? 1 : -1;
	});
	return arrHolidays.filter((item) => item); // eslint-disable-line
};

const init = (oDate) => {
	let _year = oDate.getFullYear();
	let _month = oDate.getMonth() + 1;
	let _date = oDate.getDate();
	let doubleMonth = (_month - 1) * 2;
	let s = getLeapYearTime(_year, doubleMonth);
	let q;
	let solarTerm = "";
	let holiday = ''; // eslint-disable-line
	if (_date != s.getDate()) {
		q = getLeapYearTime(_year, doubleMonth + 1);
		if (_date == q.getDate()) {
			solarTerm = arrSolarTerms[doubleMonth + 1];
		}
	} else {
		solarTerm = arrSolarTerms[doubleMonth];
	}
	let lunarInfo = fnLunar.getDate(oDate);
	let weekDay = oDate.getDay();
	let festivals = getFestival(oDate, lunarInfo);
	// console.log(festivals.length ? festivals[0].value : solarTerm ? solarTerm : '');
	return {
		animal: arrAnimals[(lunarInfo.lunarYear - 4) % 12], // 生肖
		gzDate: fnLunarDate.getGzDay(oDate), // 阴历日期
		gzMonth: fnLunarDate.getGzMonth(oDate, _year, _month), // 阴历月份
		gzYear: fnLunarDate.getGzYear(oDate, _year, lunarInfo.lunarYear), // 阴历年份
		lunarYear: lunarInfo.lunarYear, // 阴历数字年份
		lunarMonth: lunarInfo.lunarMonth, // 阴历数字月份
		lunarDate: lunarInfo.lunarDay, // 阴历数字日期
		lMonth: (lunarInfo.isLeap ? "闰" : "") + arrChineseMonthTitles[lunarInfo.lunarMonth - 1], // 阴历月份数字对应汉字月份
		// 阴历日期数字对应汉字日期
		lDate: lunarInfo.lunarDay % 10 == 0 ? ["初十", "二十", "三十"][lunarInfo.lunarDay / 10 - 1] : k[parseInt(lunarInfo.lunarDay / 10, 10)] + g[parseInt(lunarInfo.lunarDay % 10, 10)], // eslint-disable-line   
		solarTerm, // 节气
		// festival: function() { // 没啥用
		//    return getFestival(oDate, lunarInfo);
		// },
		festivals, // 获取对应的节假日
		isBigMonth: lunarInfo.isBigMonth, // 阴历: 30天为true, 29天为false
		oDate, // 公历日期对象
		weekDay, // 公历一周中的第几天，从0开始(0表示周日)
		cnWeekDay: "日一二三四五六".charAt(weekDay), // 公历星期几
		holiday: festivals.length ? festivals[0].value : solarTerm || '' // 如果有多个节假日，返回一个(有节日则返回权重最高的一个，没有的话就返回节气，再没有就返回空值)
	};
};

const date2holiday = (dateStr) => {
	let oDate = new Date(dateStr.replace(/\-/g, '/')); // eslint-disable-line   
	return init(oDate);
};

export default date2holiday;