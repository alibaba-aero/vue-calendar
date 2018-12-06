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
