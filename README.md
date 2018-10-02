# Vue Calendar

## Installation
```
yarn add @alibaba-aero/vue-calendar
```

## Usage
```html
<template>
    <vuec-calendar/>
</template>

<script>
import { VuecCalendar } from '@alibaba-aero/vue-calendar';
// Import calendar styles
import '@alibaba-aero/vue-calendar/dist/vue-calendar.min.css';

export default {
    components: {
        VuecCalendar
    }
}
</script>
```

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
- `selections` - Array - []

### month

- `selectable`: Boolean - false
- `min-date`: Object/String - null
- `max-date`: Object/String - null
- `date`: Object - [required]
- (??) `adapter`: Function - {}
- `selection`: Array - []
- `show-title`: Boolean - true
- `title`: String - ''

### day

- `data`: Object - {}
- `index`: Number - [required]
- `date`: Object - null
- `disabled`: Boolean - false
- `selected`: Boolean - false
- `selectable`: Boolean - false
