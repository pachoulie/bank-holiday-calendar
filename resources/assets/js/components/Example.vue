<template>
    <div class="container">
        <div class="row">
            <div class="panel panel-default">
                <div class="panel-heading">Example Component</div>

                <div id="calendar"></div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .calendar .month-container {
        height: 230px;
    }

    .calendar table.month tr td .day-content {
        padding: 3px 6px;
    }

    .calendar table.month tr td .day-content {
        &.cn-holiday.us-holiday.uk-holiday {
            background-image: linear-gradient(green 33.33%, blue 33.33%, blue 66.66%, red 66.66%);
        }

        &.us-holiday.uk-holiday {
            background: -webkit-linear-gradient(top, green, green 50%, blue 50%, blue);
        }

        &.us-holiday.un-holiday {
            background: -webkit-linear-gradient(top, green, green 50%, red 50%, red);
        }

        &.cn-holiday.uk-holiday {
            background: -webkit-linear-gradient(top, red, red 50%, blue 50%, blue);
        }

        &.us-holiday {
            color: white;
            background-color: green;
            -webkit-border-radius: 15px;
            -moz-border-radius: 15px;
            border-radius: 15px;
        }

        &.uk-holiday {
            color: white;
            background-color: blgue;
            -webkit-border-radius: 15px;
            -moz-border-radius: 15px;
            border-radius: 15px;
        }

        &.cn-holiday {
            color: white;
            background-color: red;
            -webkit-border-radius: 15px;
            -moz-border-radius: 15px;
            border-radius: 15px;
        }
    }
</style>

<script>
    import moment from 'moment';
    import momentHoliday from 'moment-holiday';
    import momentLunar from 'moment-lunar';
    import Calendar from 'bootstrap-year-calendar';

    export default {
        mounted() {
            $('#calendar').calendar({
                    weekStart: 1,
                    customDayRenderer: function (element, date) {
                        // US days
                        checkDateAndMonth(element, date, 'us-holiday', 0, 1);
                        checkNthDayOfMonth(element, date, 'us-holiday', 0, 3, 1);
                        checkNthDayOfMonth(element, date, 'us-holiday', 1, 3, 1);
                        checkHoliday(element, date, 'us-holiday', 'Good Friday');
                        checkLastDayOfMonth(element, date, 'us-holiday', 4);
                        checkDateAndMonth(element, date, 'us-holiday', 6, 4);
                        checkNthDayOfMonth(element, date, 'us-holiday', 8, 1, 1);
                        checkNthDayOfMonth(element, date, 'us-holiday', 9, 2, 1);
                        checkDateAndMonth(element, date, 'us-holiday', 10, 11);
                        checkNthDayOfMonth(element, date, 'us-holiday', 10, 3, 4); //
                        checkDateAndMonth(element, date, 'us-holiday', 11, 25);

                        // UK days
                        checkDateAndMonth(element, date, 'uk-holiday', 0, 1);
                        checkHoliday(element, date, 'uk-holiday', 'Good Friday');
                        checkHoliday(element, date, 'uk-holiday', 'Easter Monday');
                        checkNthDayOfMonth(element, date, 'uk-holiday', 4, 1, 1);
                        checkLastDayOfMonth(element, date, 'uk-holiday', 4);
                        checkLastDayOfMonth(element, date, 'uk-holiday', 7);
                        checkDateAndMonth(element, date, 'uk-holiday', 11, 25);
                        checkDateAndMonth(element, date, 'uk-holiday', 11, 26);

                        // China days
                        let limit = 6;
                        for(let i = 1; i < limit; i++) {
                            console.log(i);
                            let lunarDate = momentLunar().year(moment(date).year()).month(0).date(i).solar();
                            if (lunarDate.day() === 0) {
                                limit++;
                            }
                            checkLunarDateAndMonth(element, date, 'cn-holiday', 0, i);
                        }
                        checkNthDayOfMonth(element, date, 'cn-holiday', 4, 1, 1);

                    },
                    renderEnd: () => {
                        $('#calendar *').attr(this.$options._scopeId, '');
                    }
                }
            );
        }
    }

    function checkDateAndMonth(element, date, selector, month, day) {
        let momentDate = moment(date);
        if (momentDate.month() === month) {
            if (momentDate.day() !== 0 && momentDate.day() !== 6) {
                if (momentDate.date() === day ||
                    momentDate.day() === 1 && momentDate.subtract(1, 'd').date() === day ||
                    momentDate.day() === 5 && momentDate.add(1, 'd').date() === day) {
                    $(element).addClass(selector);
                }
            }
        }
    }

    function checkLunarDateAndMonth(element, date, selector, month, day) {
        let momentDate = moment(date);

        let lunarDate = momentLunar().year(moment(date).year()).month(month).date(day).solar();
        if (momentDate.month() === lunarDate.month()) {
            if (momentDate.day() !== 0) {
                if (momentDate.date() === lunarDate.date() ||
                    momentDate.day() === 1 && momentDate.subtract(1, 'd').date() === lunarDate.date()) {
                    $(element).addClass(selector);
                }
            }
        }
    }

    function checkNthDayOfMonth(element, date, selector, month, nth, day) {
        let momentDate = moment(date);

        if (momentDate.month() === month) {
            let nthDate = _getNth(date, nth, day);
            if (momentDate.day() !== 0 && momentDate.day() !== 6) {
                if (momentDate.date() === nthDate.date() ||
                    momentDate.day() === 1 && momentDate.subtract(1, 'd').date() === nthDate.date() ||
                    momentDate.day() === 5 && momentDate.add(1, 'd').date() === nthDate.date()) {
                    $(element).addClass(selector);
                }
            }
        }
    }

    function checkLastDayOfMonth(element, date, selector, month) {
        let momentDate = moment(date);

        if (momentDate.month() === month) {
            let lastDay = moment(date).endOf('month').startOf('isoweek');
            if (momentDate.day() !== 0 && momentDate.day() !== 6) {
                if (momentDate.date() === lastDay.date() ||
                    momentDate.day() === 1 && momentDate.subtract(1, 'd').date() === lastDay.date() ||
                    momentDate.day() === 5 && momentDate.add(1, 'd').date() === lastDay.date()) {
                    $(element).addClass(selector);
                }
            }
        }
    }

    function checkHoliday(element, date, selector, holiday) {
        let momentDate = moment(date);
        let goodFridayDate = momentHoliday(date).holiday(holiday);

        if (momentDate.month() === goodFridayDate.month()) {
            if (momentDate.day() !== 0 && momentDate.day() !== 6) {
                if (momentDate.date() === goodFridayDate.date() ||
                    momentDate.day() === 1 && momentDate.subtract(1, 'd').date() === goodFridayDate.date() ||
                    momentDate.day() === 5 && momentDate.add(1, 'd').date() === goodFridayDate.date()) {
                    $(element).addClass(selector);
                }
            }
        }
    }

    function _getNth(date, nth, day) {
        let startOfMonth = moment(date).startOf('month').startOf('isoweek');
        let nthDate = moment(date).startOf('month').startOf('isoweek').day(day).add(nth, 'w');
        if (nthDate.month() === startOfMonth.month()) {
            nthDate = nthDate.subtract(1, 'w');
        }

        return nthDate;
    }
</script>
