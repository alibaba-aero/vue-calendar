# Alibaba Calendar

## Components

### range-input

- `theme`: String - default
- `mobile`: Boolean - false
- `selectable`: Boolean - false
- `data`: Object - {}
- `min-date`: Object/String - null
- `max-date`: Object/String - null
- `visible-months`: Number - 1
- `selection-mode`: String - single
- `value`: Object - {}
- `open`: Boolean - false
- `format`: String - jYYYY/jM/jD

### calendar

- `theme`: String - default
- `selectable`: Boolean - false
- `data`: Object - {}
- `min-date`: Object/String - null
- `max-date`: Object/String - null
- `visible-months`: Number - 1
- `show-previous-weeks`: Boolean - true
- `show-navigation`: Boolean - true
- `date`: Object - moment()
- `day-view`:  Object - DefaultDayView
- `selections` - Array - []

### month

- `selectable`: Boolean - false
- `min-date`: Object/String - null
- `max-date`: Object/String - null
- `day-view`: Object - DefaultDayView
- `date`: Object - [required]
- (??) `adapter`: Function - {}
- `selection`: Array - []
- `show-title`: Boolean - true
- `title`: String - ''

### day

- `day-view`: Object - null
- `data`: Object - {}
- `index`: Number - [required]
- `date`: Object - null
- `disabled`: Boolean - false
- `selected`: Boolean - false
- `selectable`: Boolean - false


### default-day

- `data`: Object - null
- `date`: Object - null
