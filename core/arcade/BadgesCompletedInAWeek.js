// Function to generate the last 7 days in the form of day names
function generateLast7DayNames() {
    const days = [];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(today.getDate() - i); // Subtract i days
        days.push(dayNames[date.getDay()]); // Get day name
    }

    return days.reverse(); // Reverse so today is first
}

// Dynamically initialize the badgesCompletedInAWeek object
function initializeBadgesWithDayNames(dayNames) {
    const badges = {};
    dayNames.forEach(day => {
        badges[day] = 0;
    });
    return badges;
}

// Update badgesCompleted function
function updateBadgesWithDayNames(badgesCompletedInAWeek, date, monthInInteger, year) {
    // Create a Date object for the given input date
    monthInInteger -= 1; // month indexing was started with 0.
    const givenDate = new Date(year, monthInInteger, date);
    const today = new Date();

    // Calculate the difference in days between the given date and today
    const differenceInDays = Math.floor((today - givenDate) / (1000 * 60 * 60 * 24));

    // Ensure the given date is within the last 7 days
    if (differenceInDays >= 0 && differenceInDays < 7) {
        const dayNames = Object.keys(badgesCompletedInAWeek); // ['Tuesday', 'Wednesday', ..., 'Monday']
        const targetDay = dayNames[dayNames.length - 1 - differenceInDays]; // Match the day name dynamically
        badgesCompletedInAWeek[targetDay]++;
    }
}


module.exports = { generateLast7DayNames, initializeBadgesWithDayNames, updateBadgesWithDayNames }