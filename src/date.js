import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import jalaliday from 'jalaliday';

dayjs.extend(isBetween);
dayjs.extend(jalaliday);

export { dayjs as default };
