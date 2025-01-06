// ^-------------------------------- CODE TO SCRAP USER DETAILS IF IT GOT THE WEBPAGE DATA
const scrapUserDetails = ($) => {

    // will store details about the user such as name, leaderboardData, etc.
    let userDetails = {
        "name": "",
        "profileImage": "",
        "memberSince": "",
        "leaderboardPoints": "",
        "leagueImg": "",
        "leagueName": "",
    };

    // ^ for fetching name
    let name = $('.ql-display-small');
    name = name.text().replaceAll('\n', '').trim()
    userDetails["name"] = name

    // ^ for fetching the user img
    let userImg = $('#jump-content >div:first-child .profile-avatar');
    userImg = userImg.attr('src');
    userDetails["profileImage"] = userImg

    // ^ for fetching the user's points
    let memberSince = $('#jump-content >div:first-child .ql-body-large')
    memberSince = memberSince.text().replaceAll('\n', '').trim()
    userDetails["memberSince"] = memberSince

    // ^ for fetching the user's points
    let userPoints = $('#jump-content >div:first-child .profile-league >strong')
    userPoints = userPoints.text().replaceAll('\n', '').trim().split(' ')[0]
    userDetails["leaderboardPoints"] = userPoints

    // ^ for fetching the user's league url
    let leagueImg = $('#jump-content >div:first-child .profile-league >img')
    leagueImg = leagueImg.attr('src')
    userDetails["leagueImg"] = leagueImg;

    // ^ for fetching the user's league name
    let leagueName = $('#jump-content >div:first-child .profile-league >h2')
    leagueName = leagueName.text().replaceAll('\n', '').trim().split(' ')[0]
    userDetails["leagueName"] = leagueName;

    // it returns the userDetails object after modifying in every aspect, putting all the data.
    return userDetails;
}

module.exports = scrapUserDetails;