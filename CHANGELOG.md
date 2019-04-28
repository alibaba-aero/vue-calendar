# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.6.0"></a>
# [0.6.0](https://github.com/alibaba-aero/vue-calendar/compare/v0.5.1...v0.6.0) (2019-04-28)


### Features

* month name as slot ([f4b039c](https://github.com/alibaba-aero/vue-calendar/commit/f4b039c))


* Merge pull request #2 from SasanFarrokh/master ([cab477e](https://github.com/alibaba-aero/vue-calendar/commit/cab477e)), closes [#2](https://github.com/alibaba-aero/vue-calendar/issues/2)


### BREAKING CHANGES

* remove monthTitleFormat and introduce named slot month-title



<a name="0.5.1"></a>
## [0.5.1](https://github.com/alibaba-aero/vue-calendar/compare/v0.5.0...v0.5.1) (2019-01-08)


### Bug Fixes

* clear click event, optimize month render ([bb24ea6](https://github.com/alibaba-aero/vue-calendar/commit/bb24ea6))



<a name="0.5.0"></a>
# [0.5.0](https://github.com/alibaba-aero/vue-calendar/compare/v0.4.1...v0.5.0) (2018-12-21)


### Bug Fixes

* **calendar:** remove unused computed value ([aa1763c](https://github.com/alibaba-aero/vue-calendar/commit/aa1763c))
* improve support for gregory calendar ([3ad3c3c](https://github.com/alibaba-aero/vue-calendar/commit/3ad3c3c))


### Features

* Change default calendar from jalali to gregorian ([1620af4](https://github.com/alibaba-aero/vue-calendar/commit/1620af4))
* localize week day names ([ad53e9b](https://github.com/alibaba-aero/vue-calendar/commit/ad53e9b))


### BREAKING CHANGES

* from now on vue-calendars default calendar is gregorian
if you want to show jalali dates just create a dayjs object and change its calendar
and pass this object as `date` props to vue-calendar
`const date = dayjs().calendar('jalali')`
for more information see jalaliday docs:
https://www.npmjs.com/package/jalaliday



<a name="0.4.1"></a>
## [0.4.1](https://github.com/alibaba-aero/vue-calendar/compare/v0.4.0...v0.4.1) (2018-11-24)


### Bug Fixes

* **month:** calculate enable dates within min-date and max-date ([b933ede](https://github.com/alibaba-aero/vue-calendar/commit/b933ede))
* **month.vue:** change vuec-7col columns class (prevent conflict with bootstrap) ([b1ce8a8](https://github.com/alibaba-aero/vue-calendar/commit/b1ce8a8))



<a name="0.4.0"></a>
# [0.4.0](https://github.com/alibaba-aero/vue-calendar/compare/v0.3.1...v0.4.0) (2018-11-21)


### Bug Fixes

* **month:** render remaining days of lmonths last week ([b1327ec](https://github.com/alibaba-aero/vue-calendar/commit/b1327ec))


### Features

* **calendar:** add month title format prop ([e9458b1](https://github.com/alibaba-aero/vue-calendar/commit/e9458b1))



<a name="0.3.1"></a>
## [0.3.1](https://github.com/alibaba-aero/vue-calendar/compare/v0.3.0...v0.3.1) (2018-11-18)


### Bug Fixes

* **calendar:** day of week slot ([8d5704e](https://github.com/alibaba-aero/vue-calendar/commit/8d5704e))



<a name="0.3.0"></a>
# [0.3.0](https://github.com/alibaba-aero/vue-calendar/compare/v0.2.2...v0.3.0) (2018-11-18)


### Features

* add slot to modify day of week name ([a582cc9](https://github.com/alibaba-aero/vue-calendar/commit/a582cc9))



<a name="0.2.1"></a>
## [0.2.1](https://github.com/alibaba-aero/vue-calendar/compare/v0.2.0...v0.2.1) (2018-10-06)


### Bug Fixes

* remove unused props ([8903fdd](https://github.com/alibaba-aero/vue-calendar/commit/8903fdd))
* render custom template in day slot ([231d57c](https://github.com/alibaba-aero/vue-calendar/commit/231d57c))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/alibaba-aero/vue-calendar/compare/v0.1.1...v0.2.0) (2018-10-02)


### Features

* support days customization using slot ([2c9f085](https://github.com/alibaba-aero/vue-calendar/commit/2c9f085))



<a name="0.1.1"></a>
## [0.1.1](https://github.com/alibaba-aero/vue-calendar/compare/v0.1.0...v0.1.1) (2018-09-05)


### Bug Fixes

* package main file ([0b71532](https://github.com/alibaba-aero/vue-calendar/commit/0b71532))



<a name="0.1.0"></a>
# 0.1.0 (2018-09-05)


### Bug Fixes

* export dayjs ([462171b](https://github.com/alibaba-aero/vue-calendar/commit/462171b))


### Features

* remove moment-jalaali ([1b652ad](https://github.com/alibaba-aero/vue-calendar/commit/1b652ad))
* Use Dayjs [#1](https://github.com/alibaba-aero/vue-calendar/issues/1) ([bc854ec](https://github.com/alibaba-aero/vue-calendar/commit/bc854ec))
