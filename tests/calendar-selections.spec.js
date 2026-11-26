const Vue = require('vue');
const { dayjs, VuecCalendar, VuecMonth } = require('..');

const Calendar = Vue.extend(VuecCalendar);
const Month = Vue.extend(VuecMonth);

afterEach(() => dayjs.calendar('gregory'));

test.each([
    ['jalali', ['1400/02/31', '1400/03/29']],
    ['gregory', ['2021/05/31', '2021/06/19']],
])('selects day keys across two months in the %s calendar', (calendar, selections) => {
    dayjs.calendar(calendar);
    const view = new Calendar({
        propsData: { date: dayjs('2021-05-02'), visibleMonths: 2, selections },
    });

    const selected = view.months.flatMap(({ date, selections: selection }) => {
        const month = new Month({ propsData: { date, selection } });
        return month.days.filter(day => day.selected).map(day => day.key);
    });
    expect(selected).toEqual(selections);
});
