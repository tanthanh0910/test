/**
 *
 * @param dateString // format "MM/DD/YYYY"
 * @returns {string}
 */
function getDayName(dateString) {
    const [date, options] = [new Date(dateString), {weekday: 'long'}];
    return new Intl.DateTimeFormat('en-Us', options).format(date);
}

Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

/**
 *
 * @param startDate, // format "MM/DD/YYYY"
 * @param stopDate, // format "MM/DD/YYYY"
 * @returns //example: {*['12/20/2021', '12/21/2021']}
 */
function getDates(startDate, stopDate) {
    let dateArray = [];
    let currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date(currentDate));
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}

/**
 *
 * @param startDateFormat // format "MM/DD/YYYY"
 * @param endDateFormat // format "MM/DD/YYYY"
 */
function getOutDateNamesOfWeek(startDateFormat, endDateFormat) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const date1 = new Date(startDateFormat);
    const date2 = new Date(endDateFormat);

    
    let dateArray = getDates(date1, date2);
    let dayNames = [];

    for (i = 0; i < dateArray.length; i++) {
        dayNames.push(getDayName(moment(dateArray[i]).format('MM/DD/YYYY')))
    }

    let uniqueDayNames = [...new Set(dayNames)];
    Array.prototype.diff = function (a) {
        return this.filter(function (i) {
            return a.indexOf(i) < 0;
        });
    };

    return  days.diff(uniqueDayNames);
}