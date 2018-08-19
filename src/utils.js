import moment from 'moment-jalaali';

moment.loadPersian({
  dialect: 'persian-modern',
});

/**
 * Persian numeric characters
 */
export const PERSIAN_DIGITS = [
  '۰',
  '۱',
  '۲',
  '۳',
  '۴',
  '۵',
  '۶',
  '۷',
  '۸',
  '۹',
];

/**
 * Arabic numeric characters
 */
export const ARABIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
/**
 * Character code of Persian zero char
 */
export const PERSIAN_ZERO_CHAR_CODE = PERSIAN_DIGITS[0].charCodeAt(0);

/**
 * Character code of Arabic zero char
 */
export const ARABIC_ZERO_CHAR_CODE = ARABIC_DIGITS[0].charCodeAt(0);

export function toNumeric(value) {
  return String(value).replace(/[^-\d]/g, '');
}

export function toPersianDigits(value) {
  return String(value).replace(/[0-9]/g, w => PERSIAN_DIGITS[parseInt(w)]);
}

export function toEnglishDigits(value) {
  return String(value)
    .replace(/[۰-۹]/g, w => w.charCodeAt(0) - PERSIAN_ZERO_CHAR_CODE)
    .replace(/[٠-٩]/g, w => w.charCodeAt(0) - ARABIC_ZERO_CHAR_CODE);
}

function getFormat(format) {
  switch (format) {
    case 'jalaliDateTime':
      // This filter returns a Jalali date time format like : 12:31 1396/11/4
      return 'HH:mm jYYYY/jM/jD';
    case 'jalaliDate':
      // This filter returns a Jalali date in the following format : 1396/11/4
      return 'jYYYY/jM/jD';
    default:
      return format;
  }
}

export function formatDate(date, format = 'jalaliDate', toPersian = true) {
  let formattedDate = '';

  if (date) {
    formattedDate = moment(date).format(getFormat(format));
  }

  if (toPersian) {
    formattedDate = toPersianDigits(formattedDate);
  }

  return formattedDate;
}

export function weekDays() {
  return [
    'شنبه',
    '۱ شنبه',
    '۲ شنبه',
    '۳ شنبه',
    '۴ شنبه',
    '۵ شنبه',
    'جمعه',
  ];
}
