"use strict";

var GULP_ROOT_PATH = process.cwd();

module.exports = function() {
    return {
        WWW_PATH: GULP_ROOT_PATH + '\\www\\',
        APP_PATH: GULP_ROOT_PATH + '\\app\\',
        STYLES_PATH: GULP_ROOT_PATH + '\\app\\styles\\',
        TMP_PATH: GULP_ROOT_PATH + '\\app\\.tmp\\'
    }
}();


