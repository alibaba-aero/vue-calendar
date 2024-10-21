const localeFa = {
    name: 'fa',
    weekdays: 'یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه'.split('_'),
    weekdaysShort: '\u06CC\u06A9\u200C\u0634\u0646\u0628\u0647_\u062F\u0648\u0634\u0646\u0628\u0647_\u0633\u0647\u200C\u0634\u0646\u0628\u0647_\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647_\u067E\u0646\u062C\u200C\u0634\u0646\u0628\u0647_\u062C\u0645\u0639\u0647_\u0634\u0646\u0628\u0647'.split('_'),
    weekdaysMin: 'ی_د_س_چ_پ_ج_ش'.split('_'),
    weekStart: 6,
    months: 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
    monthsShort: 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
    ordinal: function ordinal (n) {
        return n;
    },
    formats: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd, D MMMM YYYY HH:mm',
    },
    relativeTime: {
        future: 'در %s',
        past: '%s پیش',
        s: 'چند ثانیه',
        m: 'یک دقیقه',
        mm: '%d دقیقه',
        h: 'یک ساعت',
        hh: '%d ساعت',
        d: 'یک روز',
        dd: '%d روز',
        M: 'یک ماه',
        MM: '%d ماه',
        y: 'یک سال',
        yy: '%d سال',
    },
};
/* eslint-disable */

function _slicedToArray (arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles (arr) {
    if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit (arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);

            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally {
        try {
            if (!_n && _i.return != null) _i.return();
        } finally {
            if (_d) throw _e;
        }
    }

    return _arr;
}

function _nonIterableRest () {
    throw new TypeError('Invalid attempt to destructure non-iterable instance');
}

/* eslint-disable */

/*
 JavaScript functions for the Fourmilab Calendar Converter
 by John Walker  --  September, MIM
 http://www.fourmilab.ch/documents/calendar/
 This program is in the public domain.
 */

/*  MOD  --  Modulus function which works for non-integers.  */
var $floor = Math.floor;

function mod(a, b) {
  return a - b * $floor(a / b);
} //  LEAP_GREGORIAN  --  Is a given year in the Gregorian calendar a leap year ?


function lg(year) {
  return year % 4 == 0 && !(year % 100 == 0 && year % 400 != 0);
} //  GREGORIAN_TO_JD  --  Determine Julian day number from Gregorian calendar date
// GREGORIAN_EPOCH


var GE = 1721425.5;

function gregorianToJulian(year, month, day) {
  if (month <= 2) {
    year -= 1;
    month += 12;
  }
  var A = Math.floor(year / 100);
  var B = 2 - A + Math.floor(A / 4);
  var JD =
    Math.floor(365.25 * (year + 4716)) +
    Math.floor(30.6001 * (month + 1)) +
    day +
    B -
    1524.5;
  return JD;
} //  JD_TO_GREGORIAN  --  Calculate Gregorian calendar date from Julian day


function julianToGregorian(jd) {
  jd = jd + 0.5;
  var Z = Math.floor(jd);
  var F = jd - Z;
  var A = Z;
  if (Z >= 2299161) {
    var alpha = Math.floor((Z - 1867216.25) / 36524.25);
    A = Z + 1 + alpha - Math.floor(alpha / 4);
  }
  var B = A + 1524;
  var C = Math.floor((B - 122.1) / 365.25);
  var D = Math.floor(365.25 * C);
  var E = Math.floor((B - D) / 30.6001);
  var day = B - D - Math.floor(30.6001 * E) + F;
  var month = E < 14 ? E - 1 : E - 13;
  var year = month > 2 ? C - 4716 : C - 4715;

  return [Math.floor(year), Math.floor(month), Math.floor(day)];
} // PERSIAN_EPOCH


var PE = 1948320.5; //  PERSIAN_TO_JD  --  Determine Julian day from Persian date

function persianToJulian(jy, jm, jd) {
  var g_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var j_days_in_month = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

  function div(a, b) {
    return Math.floor(a / b);
  }

  jy -= 979;
  var j_day_no = 365 * jy + div(jy, 33) * 8 + div((jy % 33) + 3, 4);
  for (var i = 0; i < jm - 1; ++i) {
    j_day_no += j_days_in_month[i];
  }
  j_day_no += jd - 1;

  var g_day_no = j_day_no + 79;

  var gy = 1600 + 400 * div(g_day_no, 146097);
  g_day_no = g_day_no % 146097;

  var leap = true;
  if (g_day_no >= 36525) {
    g_day_no--;
    gy += 100 * div(g_day_no, 36524);
    g_day_no = g_day_no % 36524;

    if (g_day_no >= 365) {
      g_day_no++;
    } else {
      leap = false;
    }
  }

  gy += 4 * div(g_day_no, 1461);
  g_day_no %= 1461;

  if (g_day_no >= 366) {
    leap = false;
    g_day_no--;
    gy += div(g_day_no, 365);
    g_day_no = g_day_no % 365;
  }

  for (i = 0; g_day_no >= g_days_in_month[i] + (i == 1 && leap); i++) {
    g_day_no -= g_days_in_month[i] + (i == 1 && leap);
  }
  var gm = i + 1;
  var gd = g_day_no + 1;

  return gregorianToJulian(gy, gm, gd);
} //  JD_TO_PERSIAN  --  Calculate Persian date from Julian day


function julianToPersian(jd) {
  jd = jd + 0.5;
  var Z = Math.floor(jd);
  var F = jd - Z;
  var A = Z;
  if (Z >= 2299161) {
    var alpha = Math.floor((Z - 1867216.25) / 36524.25);
    A = Z + 1 + alpha - Math.floor(alpha / 4);
  }
  var B = A + 1524;
  var C = Math.floor((B - 122.1) / 365.25);
  var D = Math.floor(365.25 * C);
  var E = Math.floor((B - D) / 30.6001);
  var day = B - D - Math.floor(30.6001 * E) + F;
  var month = E < 14 ? E - 1 : E - 13;
  var year = month > 2 ? C - 4716 : C - 4715;

  return gregorianToJalali(year, month, day);
}

function gregorianToJalali(gYear, gMonth, gDay) {
  var g_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var j_days_in_month = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

  function div(a, b) {
    return Math.floor(a / b);
  }

  var gy = gYear - 1600;
  var gm = gMonth - 1;
  var gd = gDay - 1;

  var g_day_no =
    365 * gy + div(gy + 3, 4) - div(gy + 99, 100) + div(gy + 399, 400);
  for (var i = 0; i < gm; ++i) g_day_no += g_days_in_month[i];
  if (gm > 1 && ((gYear % 4 == 0 && gYear % 100 != 0) || gYear % 400 == 0))
    g_day_no++;
  g_day_no += gd;

  var j_day_no = g_day_no - 79;

  var j_np = div(j_day_no, 12053);
  j_day_no %= 12053;

  var jy = 979 + 33 * j_np + 4 * div(j_day_no, 1461);
  j_day_no %= 1461;

  if (j_day_no >= 366) {
    jy += div(j_day_no - 1, 365);
    j_day_no = (j_day_no - 1) % 365;
  }

  for (var j = 0; j < 11 && j_day_no >= j_days_in_month[j]; ++j)
    j_day_no -= j_days_in_month[j];
  var jm = j + 1;
  var jd = j_day_no + 1;
  return [jy, jm, jd];
}

var jdate = {
  J: function J(y, m, d) {
    return julianToPersian(gregorianToJulian(y, m, d));
  },
  G: function G(y, m, d) {
    return julianToGregorian(persianToJulian(y, m, d));
  }
};

var REGEX_PARSE = /^(\d{4})[-/]?(\d{1,2})[-/]?(\d{0,2})(.*)?$/;
var REGEX_FORMAT = /\[.*?\]|jY{2,4}|jM{1,4}|jD{1,2}|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;
var DATE = 'date';
var D = 'day';
var M = 'month';
var Y = 'year';
var W = 'week';
var FORMAT_DEFAULT = 'YYYY-MM-DDTHH:mm:ssZ';
var fa = {
  jmonths: 'فروردین_اردیبهشت_خرداد_تیر_مرداد_شهریور_مهر_آبان_آذر_دی_بهمن_اسفند'.split('_')
};

var plugin = (function (o, Dayjs, dayjs) {
  var proto = Dayjs.prototype;
  var U = proto.$utils();
  
  // If the plugin already has been added to Dayjs don't add it again.
  // Adding it again will cause the old prototypes to become lost
  if (proto.InitJalali) return;

  var $isJalali = function $isJalali(v) {
    return v.$C === 'jalali';
  };

  var $prettyUnit = U.prettyUnit || U.p;
  var $isUndefined = U.isUndefined || U.u;
  var $padStart = U.padStart || U.s;
  var $monthDiff = U.monthDiff || U.m;
  var $absFloor = U.absFloor || U.a;

  var wrapperOfTruth = function wrapperOfTruth(action) {
    return function () {
      var unsure = action.bind(this).apply(void 0, arguments);
      unsure.$C = this.$C;

      if (unsure.isJalali()) {
        unsure.InitJalali();
      }

      return unsure;
    };
  }; // keep calendar on date manipulation


  proto.startOf = wrapperOfTruth(proto.startOf);
  proto.endOf = wrapperOfTruth(proto.endOf);
  proto.add = wrapperOfTruth(proto.add);
  proto.subtract = wrapperOfTruth(proto.subtract);
  proto.set = wrapperOfTruth(proto.set);
  var oldParse = proto.parse;
  var oldInit = proto.init;
  var oldStartOf = proto.startOf;
  var old$Set = proto.$set;
  var oldAdd = proto.add;
  var oldFormat = proto.format;
  var oldDiff = proto.diff;
  var oldYear = proto.year;
  var oldMonth = proto.month;
  var oldDate = proto.date;
  var oldDaysInMonth = proto.daysInMonth;
  var oldToArray = proto.toArray;
  dayjs.$C = 'gregory'; // First Day Of Week

  dayjs.$fdow = 6; // 0: sunday, ...

  dayjs.calendar = function (calendar) {
    dayjs.$C = calendar;
    return dayjs;
  };

  proto.calendar = function (calendar) {
    var that = this.clone();
    that.$C = calendar;

    if (that.isJalali()) {
      that.InitJalali();
    }

    return that;
  };

  proto.isJalali = function () {
    return $isJalali(this);
  };

  dayjs.en.jmonths = 'Farvardin_Ordibehesht_Khordaad_Tir_Mordaad_Shahrivar_Mehr_Aabaan_Aazar_Dey_Bahman_Esfand'.split('_');
  dayjs.locale('fa', Object.assign({}, localeFa, {}, fa), true);

  var wrapper = function wrapper(date, instance) {
    return dayjs(date, {
      locale: instance.$L,
      utc: instance.$u,
      calendar: instance.$C
    });
  };

  proto.init = function () {
    var cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    oldInit.bind(this)(cfg);

    if (this.isJalali()) {
      this.InitJalali();
    }
  };

  proto.parse = function (cfg) {
    var reg;
    this.$C = cfg.calendar || this.$C || dayjs.$C; // eslint-disable-next-line no-cond-assign

    if (cfg.jalali && typeof cfg.date === 'string' && /.*[^Z]$/i.test(cfg.date) // looking for a better way
    && (reg = cfg.date.match(REGEX_PARSE))) {
      // 1397-08-08 or 13970808
      var _jdate$G = jdate.G(parseInt(reg[1], 10), parseInt(reg[2], 10), parseInt(reg[3] || 1, 10)),
          _jdate$G2 = _slicedToArray(_jdate$G, 3),
          y = _jdate$G2[0],
          m = _jdate$G2[1],
          d = _jdate$G2[2];

      cfg.date = "".concat(y, "-").concat(m, "-").concat(d).concat(reg[4] || '');
    }

    return oldParse.bind(this)(cfg);
  };

  proto.InitJalali = function () {
    var _jdate$J = jdate.J(this.$y, this.$M + 1, this.$D),
        _jdate$J2 = _slicedToArray(_jdate$J, 3),
        jy = _jdate$J2[0],
        jm = _jdate$J2[1],
        jd = _jdate$J2[2];

    this.$jy = jy;
    this.$jM = jm - 1;
    this.$jD = jd;
  };

  proto.startOf = function (units, startOf) {
    var _this = this;

    // startOf -> endOf
    if (!$isJalali(this)) {
      return oldStartOf.bind(this)(units, startOf);
    }

    var isStartOf = !$isUndefined(startOf) ? startOf : true;
    var unit = $prettyUnit(units);

    var instanceFactory = function instanceFactory(d, m) {
      var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _this.$jy;

      var _jdate$G3 = jdate.G(y, m + 1, d),
          _jdate$G4 = _slicedToArray(_jdate$G3, 3),
          gy = _jdate$G4[0],
          gm = _jdate$G4[1],
          gd = _jdate$G4[2];

      var ins = wrapper(new Date(gy, gm - 1, gd), _this);
      return (isStartOf ? ins : ins.endOf(D)).$set('hour', 1); // prevent daylight saving issue in safari
    };

    var WModifier = (this.$W + (7 - dayjs.$fdow)) % 7;

    switch (unit) {
      case Y:
        return isStartOf ? instanceFactory(1, 0) : instanceFactory(0, 0, this.$jy + 1);

      case M:
        return isStartOf ? instanceFactory(1, this.$jM) : instanceFactory(0, (this.$jM + 1) % 12, this.$jy + parseInt((this.$jM + 1) / 12, 10));

      case W:
        return isStartOf ? instanceFactory(this.$jD - WModifier, this.$jM) : instanceFactory(this.$jD + (6 - WModifier), this.$jM);

      default:
        return oldStartOf.bind(this)(units, startOf);
    }
  };

  proto.$set = function (units, _int) {
    var _this2 = this;

    if (!$isJalali(this)) {
      return old$Set.bind(this)(units, _int);
    }

    var unit = $prettyUnit(units);

    var instanceFactory = function instanceFactory(d, m) {
      var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _this2.$jy;

      var _jdate$G5 = jdate.G(y, m + 1, d),
          _jdate$G6 = _slicedToArray(_jdate$G5, 3),
          gy = _jdate$G6[0],
          gm = _jdate$G6[1],
          gd = _jdate$G6[2];

      _this2.$d.setFullYear(gy);

      _this2.$d.setMonth(gm - 1);

      _this2.$d.setDate(gd);

      return _this2;
    };

    switch (unit) {
      case DATE:
      case D:
        instanceFactory(_int, this.$jM);
        break;

      case M:
        instanceFactory(this.$jD, _int);
        break;

      case Y:
        instanceFactory(this.$jD, this.$jM, _int);
        break;

      default:
        return old$Set.bind(this)(units, _int);
    }

    this.init();
    return this;
  };

  proto.add = function (number, units) {
    var _this3 = this;

    if (!$isJalali(this)) {
      return oldAdd.bind(this)(number, units);
    }

    number = Number(number); // eslint-disable-line no-param-reassign
    // units === 'ms' hard code here, will update in next release

    var unit = units && (units.length === 1 || units === 'ms') ? units : $prettyUnit(units);

    var instanceFactory = function instanceFactory(u, n) {
      var date = _this3.set(DATE, 1).set(u, n + number);

      return date.set(DATE, Math.min(_this3.$jD, date.daysInMonth()));
    };

    if (['M', M].indexOf(unit) > -1) {
      var n = this.$jM + number;
      var y = n < 0 ? -Math.ceil(-n / 12) : parseInt(n / 12, 10);
      var d = this.$jD;
      var x = this.set(D, 1).add(y, Y).set(M, n - y * 12);
      return x.set(D, Math.min(x.daysInMonth(), d));
    }

    if (['y', Y].indexOf(unit) > -1) {
      return instanceFactory(Y, this.$jy);
    }

    if (['d', D].indexOf(unit) > -1) {
      var date = new Date(this.$d);
      date.setDate(date.getDate() + number);
      return wrapper(date, this);
    }

    return oldAdd.bind(this)(number, units);
  };

  proto.format = function (formatStr, localeObject) {
    var _this4 = this;

    if (!$isJalali(this)) {
      return oldFormat.bind(this)(formatStr, localeObject);
    }

    var str = formatStr || FORMAT_DEFAULT;
    var locale = localeObject || this.$locale();
    var jmonths = locale.jmonths;
    return str.replace(REGEX_FORMAT, function (match) {
      if (match.indexOf('[') > -1) return match.replace(/\[|\]/g, '');

      switch (match) {
        case 'YY':
          return String(_this4.$jy).slice(-2);

        case 'YYYY':
          return String(_this4.$jy);

        case 'M':
          return String(_this4.$jM + 1);

        case 'MM':
          return $padStart(_this4.$jM + 1, 2, '0');

        case 'MMM':
          return jmonths[_this4.$jM].slice(0, 3);

        case 'MMMM':
          return jmonths[_this4.$jM];

        case 'D':
          return String(_this4.$jD);

        case 'DD':
          return $padStart(_this4.$jD, 2, '0');

        default:
          return oldFormat.bind(_this4)(match, localeObject);
      }
    });
  };

  proto.diff = function (input, units, _float) {
    if (!$isJalali(this)) {
      return oldDiff.bind(this)(input, units, _float);
    }

    var unit = $prettyUnit(units);
    var that = dayjs(input);
    var result = $monthDiff(this, that);

    switch (unit) {
      case Y:
        result /= 12;
        break;

      case M:
        break;

      default:
        // milliseconds
        return oldDiff.bind(this)(input, units, _float);
    }

    return _float ? result : $absFloor(result);
  };

  proto.$g = function (input, get, set) {
    if ($isUndefined(input)) return this[get];
    return this.set(set, input);
  };

  proto.year = function (input) {
    if (!$isJalali(this)) {
      return oldYear.bind(this)(input);
    }

    return this.$g(input, '$jy', Y);
  };

  proto.month = function (input) {
    if (!$isJalali(this)) {
      return oldMonth.bind(this)(input);
    }

    return this.$g(input, '$jM', M);
  };

  proto.date = function (input) {
    if (!$isJalali(this)) {
      return oldDate.bind(this)(input);
    }

    return this.$g(input, '$jD', D);
  };

  proto.daysInMonth = function () {
    if (!$isJalali(this)) {
      return oldDaysInMonth.bind(this)();
    }

    return this.endOf(M).$jD;
  };
  /**
   * toArray function moved to official plugin
   * Check function existence before override
   */


  if (oldToArray) {
    proto.toArray = function () {
      if (!$isJalali(this)) {
        return oldToArray.bind(this)();
      }

      return [this.$jy, this.$jM, this.$jD, this.$H, this.$m, this.$s, this.$ms];
    };
  }

  proto.clone = function () {
    return wrapper(this.toDate(), this);
  };
});

export default plugin;
