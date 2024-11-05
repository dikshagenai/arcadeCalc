
const calculateFacilitatorMilestone = function async(badgesDuringFacilitatorEvent) {

    let result = {
        milestoneBonusPoints: 0,
        milestoneEarned: "NaN"
    };

    if ((badgesDuringFacilitatorEvent["gameBadges"] >= 6 && badgesDuringFacilitatorEvent["triviaBadges"] >= 8 && badgesDuringFacilitatorEvent["skillBadges"] >= 42) || (badgesDuringFacilitatorEvent["gameBadges"] >= 4 && badgesDuringFacilitatorEvent["triviaBadges"] >= 4 && badgesDuringFacilitatorEvent["skillBadges"] >= 44)) {

        // ! If user has completed both milestone he will get max. points.
        if ((badgesDuringFacilitatorEvent["gameBadges"] >= 6 && badgesDuringFacilitatorEvent["triviaBadges"] >= 8 && badgesDuringFacilitatorEvent["skillBadges"] >= 42) && (badgesDuringFacilitatorEvent["gameBadges"] >= 4 && badgesDuringFacilitatorEvent["triviaBadges"] >= 4 && badgesDuringFacilitatorEvent["skillBadges"] >= 44)) {
            result['milestoneBonusPoints'] += 30
            result["milestoneEarned"] = "Ultimate Milestone - (2)"
        }

        else if (badgesDuringFacilitatorEvent["gameBadges"] >= 6 && badgesDuringFacilitatorEvent["triviaBadges"] >= 8 && badgesDuringFacilitatorEvent["skillBadges"] >= 42) {
            result['milestoneBonusPoints'] += 25
            result["milestoneEarned"] = "Ultimate Milestone - (1)"
        }

        else if (badgesDuringFacilitatorEvent["gameBadges"] >= 4 && badgesDuringFacilitatorEvent["triviaBadges"] >= 4 && badgesDuringFacilitatorEvent["skillBadges"] >= 44) {
            result['milestoneBonusPoints'] += 30
            result["milestoneEarned"] = "Ultimate Milestone - (2)"
        }
        else {
            result['milestoneBonusPoints'] += 0;
            result["milestoneEarned"] = "NaN"
        }

    }

    else if ((badgesDuringFacilitatorEvent["gameBadges"] >= 5 && badgesDuringFacilitatorEvent["triviaBadges"] >= 6 && badgesDuringFacilitatorEvent["skillBadges"] >= 28) || (badgesDuringFacilitatorEvent["gameBadges"] >= 3 && badgesDuringFacilitatorEvent["triviaBadges"] >= 3 && badgesDuringFacilitatorEvent["skillBadges"] >= 30)) {

        // ! If user has completed both milestone he will get max. points.
        if ((badgesDuringFacilitatorEvent["gameBadges"] >= 5 && badgesDuringFacilitatorEvent["triviaBadges"] >= 6 && badgesDuringFacilitatorEvent["skillBadges"] >= 28) && (badgesDuringFacilitatorEvent["gameBadges"] >= 3 && badgesDuringFacilitatorEvent["triviaBadges"] >= 3 && badgesDuringFacilitatorEvent["skillBadges"] >= 30)) {
            result['milestoneBonusPoints'] += 19
            result["milestoneEarned"] = "Milestone 3 - (2)"
        }

        else if (badgesDuringFacilitatorEvent["gameBadges"] >= 5 && badgesDuringFacilitatorEvent["triviaBadges"] >= 6 && badgesDuringFacilitatorEvent["skillBadges"] >= 28) {
            result['milestoneBonusPoints'] += 15
            result["milestoneEarned"] = "Milestone 3 - (1)"
        }

        else if (badgesDuringFacilitatorEvent["gameBadges"] >= 3 && badgesDuringFacilitatorEvent["triviaBadges"] >= 3 && badgesDuringFacilitatorEvent["skillBadges"] >= 30) {
            result['milestoneBonusPoints'] += 19
            result["milestoneEarned"] = "Milestone 3 - (2)"
        }
        else {
            result['milestoneBonusPoints'] += 0;
            result["milestoneEarned"] = "NaN"
        }

    }

    else if ((badgesDuringFacilitatorEvent["gameBadges"] >= 3 && badgesDuringFacilitatorEvent["triviaBadges"] >= 4 && badgesDuringFacilitatorEvent["skillBadges"] >= 18) || (badgesDuringFacilitatorEvent["gameBadges"] >= 2 && badgesDuringFacilitatorEvent["triviaBadges"] >= 2 && badgesDuringFacilitatorEvent["skillBadges"] >= 20)) {


        // ! If user has completed both milestone he will get max. points.
        if ((badgesDuringFacilitatorEvent["gameBadges"] >= 3 && badgesDuringFacilitatorEvent["triviaBadges"] >= 4 && badgesDuringFacilitatorEvent["skillBadges"] >= 18) && (badgesDuringFacilitatorEvent["gameBadges"] >= 2 && badgesDuringFacilitatorEvent["triviaBadges"] >= 2 && badgesDuringFacilitatorEvent["skillBadges"] >= 20)) {
            result['milestoneBonusPoints'] += 11
            result["milestoneEarned"] = "Milestone 2 - (2)"
        }


        else if (badgesDuringFacilitatorEvent["gameBadges"] >= 3 && badgesDuringFacilitatorEvent["triviaBadges"] >= 4 && badgesDuringFacilitatorEvent["skillBadges"] >= 18) {
            result['milestoneBonusPoints'] += 9
            result["milestoneEarned"] = "Milestone 2 - (1)"
        }

        else if (badgesDuringFacilitatorEvent["gameBadges"] >= 2 && badgesDuringFacilitatorEvent["triviaBadges"] >= 2 && badgesDuringFacilitatorEvent["skillBadges"] >= 20) {
            result['milestoneBonusPoints'] += 11
            result["milestoneEarned"] = "Milestone 2 - (2)"
        }
        else {
            result['milestoneBonusPoints'] += 0;
            result["milestoneEarned"] = "NaN"
        }

    }

    else if ((badgesDuringFacilitatorEvent["gameBadges"] >= 2 && badgesDuringFacilitatorEvent["triviaBadges"] >= 2 && badgesDuringFacilitatorEvent["skillBadges"] >= 8) || (badgesDuringFacilitatorEvent["gameBadges"] >= 1 && badgesDuringFacilitatorEvent["triviaBadges"] >= 1 && badgesDuringFacilitatorEvent["skillBadges"] >= 10)) {


        // ! If user has completed both milestone he will get max. points.
        if ((badgesDuringFacilitatorEvent["gameBadges"] >= 2 && badgesDuringFacilitatorEvent["triviaBadges"] >= 2 && badgesDuringFacilitatorEvent["skillBadges"] >= 8) && (badgesDuringFacilitatorEvent["gameBadges"] >= 1 && badgesDuringFacilitatorEvent["triviaBadges"] >= 1 && badgesDuringFacilitatorEvent["skillBadges"] >= 10)) {
            result['milestoneBonusPoints'] += 3
            result["milestoneEarned"] = "Milestone 1 - (2)"
        }

        if (badgesDuringFacilitatorEvent["gameBadges"] >= 2 && badgesDuringFacilitatorEvent["triviaBadges"] >= 2 && badgesDuringFacilitatorEvent["skillBadges"] >= 8) {
            result['milestoneBonusPoints'] += 2
            result["milestoneEarned"] = "Milestone 1 - (1)"
        }

        else if (badgesDuringFacilitatorEvent["gameBadges"] >= 1 && badgesDuringFacilitatorEvent["triviaBadges"] >= 1 && badgesDuringFacilitatorEvent["skillBadges"] >= 10) {
            result['milestoneBonusPoints'] += 3
            result["milestoneEarned"] = "Milestone 1 - (2)"
        }
        else {
            result['milestoneBonusPoints'] += 0;
            result["milestoneEarned"] = "NaN"
        }

    }

    // * Nothing
    else {
        result['milestoneBonusPoints'] += 0;
        result["milestoneEarned"] = "NaN"
    }

    return result;

}

module.exports = calculateFacilitatorMilestone;