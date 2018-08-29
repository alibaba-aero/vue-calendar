import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import 'dayjs/locale/fa';

dayjs.extend(isBetween);
dayjs.locale('fa');

export { dayjs as default };

export const idate = dayjs;

export const setLocale = (locale) => {
  dayjs.locale(locale);
};
