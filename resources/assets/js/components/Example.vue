<template>
    <div class="container">
        <div class="row">
            <div class="panel panel-default">
                <div class="panel-heading">Bank holidays</div>

                <div id="calendar"></div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .container {
        width: 600px;
        .legends {
            span {
                width: 15px;
                height: 15px;
                -webkit-border-radius: 15px;
                -moz-border-radius: 15px;
                border-radius: 15px;
            }
        }
    }

    .calendar .month-container {
        height: 230px;
    }

    .calendar table.month tr td .day-content {
        padding: 3px 6px;
    }

    .calendar table.month tr td .day-content {
        &.us-holiday, &.uk-holiday, &.cn-holiday, &.jp-holiday {
            -webkit-border-radius: 15px;
            -moz-border-radius: 15px;
            border-radius: 15px;
        }

        &.us-holiday.uk-holiday.eu-holiday {
            background-image: linear-gradient(green 33.33%, blue 33.33%, blue 66.66%, yellow 66.66%);
            &.cn-holiday {
                border: 1px solid black
            }
        }

        &.eu-holiday.uk-holiday {
            background: -webkit-linear-gradient(top, yellow, yellow 50%, blue 50%, blue);
        }

        &.us-holiday.uk-holiday {
            background: -webkit-linear-gradient(top, green, green 50%, blue 50%, blue);
        }

        &.jp-holiday.uk-holiday {
            background: -webkit-linear-gradient(top, red, red 50%, blue 50%, blue);
        }

        &.jp-holiday.us-holiday {
            background: -webkit-linear-gradient(top, red, red 50%, green 50%, green);
        }

        &.eu-holiday {
            color: black;
            background-color: yellow;
        }

        &.us-holiday {
            color: white;
            background-color: green;
        }

        &.uk-holiday {
            color: white;
            background-color: blue;
        }

        &.jp-holiday {
            color: white;
            background-color: red;
        }

        &.cn-holiday {
            border: 1px solid black;
        }
    }
</style>

<script>
    import axios from 'axios';
    import moment from 'moment';
    import Calendar from '../../vendor/bootstrap-year-calendar/js/bootstrap-year-calendar';

    export default {
        data() {
            return {
                calendar: null,
                chinaHolidays: null,
                japanHolidays: null,
                unitedKingdomHolidays: null,
                usaHolidays: null
            }
        },
        methods: {
            getHolidayData(currentYear) {
                function getHolidays(country) {
                    return axios.get(`http://kayaposoft.com/enrico/json/v1.0/index.php`, {
                        params: {
                            action: 'getPublicHolidaysForYear',
                            country: country,
                            year: currentYear
                        }
                    })
                }

                axios.all([getHolidays('chn'), getHolidays('jpn'), getHolidays('eng'), getHolidays('usa')])
                    .then(axios.spread((china, japan, unitedKingdom, usa) => {
                        this.chinaHolidays = china.data.slice(0, -1);
                        this.japanHolidays = japan.data;
                        this.unitedKingdomHolidays = unitedKingdom.data;
                        this.usaHolidays = usa.data;
                        this.calendar.data('calendar').setCustomDayRenderer(this.customDayRenderer)
                    }));
            },
            customDayRenderer(element, date) {
                this.chinaHolidays.forEach(holiday => {
                    if (holiday.englishName !== 'Spring Festival (Chinese New Year\'s Eve)') {
                        if (checkDateAndMonth(date, holiday.date.month - 1, holiday.date.day, true)) {
                            $(element).addClass('cn-holiday');
                            return false;
                        }
                    }
                });

                this.japanHolidays.forEach(holiday => {
                    if (holiday.englishName !== 'Foundation Day') {
                        if (checkDateAndMonth(date, holiday.date.month - 1, holiday.date.day)) {
                            $(element).addClass('jp-holiday');
                            return false;
                        }
                    }
                });

                this.unitedKingdomHolidays.forEach(holiday => {
                    if (checkDateAndMonth(date, holiday.date.month - 1, holiday.date.day)) {
                        if (holiday.englishName === 'Good Friday') {
                            $(element).addClass('uk-holiday us-holiday');
                        } else {
                            $(element).addClass('uk-holiday');
                        }
                        return false;
                    }
                });
                if (checkDateAndMonth(date, 11, 22)) {
                    $(element).addClass('uk-holiday');
                }
                if (checkDateAndMonth(date, 11, 29)) {
                    $(element).addClass('uk-holiday');
                }

                this.usaHolidays.forEach(holiday => {
                    if (checkDateAndMonth(date, holiday.date.month - 1, holiday.date.day)) {
                        $(element).addClass('us-holiday');
                        return false;
                    }
                });
                if (checkDateAndMonth(date, 6, 3)) {
                    $(element).addClass('us-holiday');
                }
            }
        },
        mounted() {
            this.calendar = $('#calendar');
            this.calendar.calendar({
                    weekStart: 1,
                    renderEnd: () => {
                        $('#calendar *').attr(this.$options._scopeId, '');
                    }
                }
            );
            this.calendar.yearChanged(({ currentYear }) => {
                this.getHolidayData(currentYear);
            });
            this.getHolidayData(moment().year());
        }
    }

    function checkDateAndMonth(date, month, day, isSaturdayOff) {
        let momentDate = moment(date);
        if (momentDate.month() === month) {
            if (momentDate.day() !== 0 && (!isSaturdayOff || momentDate.day() !== 6)) {
                if (momentDate.date() === day ||
                    momentDate.day() === 1 && momentDate.subtract(1, 'd').date() === day ||
                    isSaturdayOff && momentDate.day() === 5 && momentDate.add(1, 'd').date() === day) {
                    return true;
                }
            }
        }
        return false
    }
</script>
