const regexDate = (date) => {
    if (date.length === 10) {
        return validateYMD(date);
    } else if (date.length === 7) {
        return validateYM(date);
    } else {
        return validateY(date);
    }
}

const validateYMD = (date) => {
    const regexYMD = /((?:14|15|16|17|18|19|20)[0-9][0-9])-\b(0?[1-9]|1[012])\b-\b(0?[1-9]|[12][0-9]|3[01])\b/;
    let isValidate = regexYMD.test(date);

    if (isValidate) {
        //YYYY-MM-DD
        const year = getYear(date);
        const month = getMonth(date);
        const day = getDay(date);

        if ((month === 4 || month === 6 || month === 9 || month === 11) && day === 31) {
            isValidate = false;
        } else if (month === 2) {
            if (day === 30 || day === 31) {
                isValidate = false;
            } else if (day === 29) {  // leap year? feb 29 days.
                if (!isLeapYear(year)) {
                    isValidate = false;
                }
            }
        }
    }
    return isValidate;
}

const validateYM = (date) => {
    const regexYM = /((?:14|15|16|17|18|19|20)[0-9][0-9])-\b(0?[1-9]|1[012])\b/;
    return regexYM.test(date);
}

const validateY = (date) => {
    const regexY = /((?:14|15|16|17|18|19|20)[0-9][0-9])/;
    return regexY.test(date);
}

const compareDates = (lowDate, highDate) => {
    const highYear = getYear(highDate);
    const highMonth = getMonth(highDate);
    const highDay = getDay(highDate);
    const lowYear = getYear(lowDate);
    const lowMonth = getMonth(lowDate);
    const lowDay = getDay(lowDate);

    if (lowDate.length === 10 && highDate.length === 10) {
        if ((highYear > lowYear)
            || ((highYear === lowYear) && (highMonth > lowMonth))
            || ((highYear === lowYear) && (highMonth === lowMonth) && (highDay >= lowDay))) {
            return true;
        } else {
            return false;
        }
    } else if (lowDate.length === 7 || highDate.length === 7) {
        if ((highYear > lowYear)
            || ((highYear === lowYear) && (highMonth >= lowMonth))) {
            return true;
        } else {
            return false;
        }
    } else {
        if (highYear >= lowYear) {
            return true;
        } else {
            return false;
        }
    }
}

const getYear = (date) => {
    return parseInt(date.substr(0, 4));
}


const getMonth = (date) => {
    return parseInt(date.slice(5, 7));
}


const getDay = (date) => {
    return parseInt(date.substr(8, 9));
}

const isLeapYear = (year) => {
    return (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
}

const regex = {
    regexDate,
    compareDates
};

module.exports = regex;