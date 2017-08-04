window._ = require('lodash');

try {
    window.$ = window.jQuery = require('jquery');

    require('bootstrap-sass');
} catch (e) {}

window.calendar = require('bootstrap-year-calendar');
window.axios = require('axios');