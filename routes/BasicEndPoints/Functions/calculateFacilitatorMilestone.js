
const calculateFacilitatorMilestone = function async(ArcadeBadgesStatus) {

    if ((ArcadeBadgesStatus["Game Badges"] >= 6 && ArcadeBadgesStatus["Trivia Badges"] >= 8 && ArcadeBadgesStatus["Skill Badges"] >= 42) || (ArcadeBadgesStatus["Game Badges"] >= 4 && ArcadeBadgesStatus["Trivia Badges"] >= 4 && ArcadeBadgesStatus["Skill Badges"] >= 44)) {
        if (ArcadeBadgesStatus["Game Badges"] >= 6 && ArcadeBadgesStatus["Trivia Badges"] >= 8 && ArcadeBadgesStatus["Skill Badges"] >= 42) {
            ArcadeBadgesStatus["Facilitator BONUS"] += 25
            ArcadeBadgesStatus["Milestone Earned"] = "Ultimate Milestone - (1)"
        }

        else if (ArcadeBadgesStatus["Game Badges"] >= 4 && ArcadeBadgesStatus["Trivia Badges"] >= 4 && ArcadeBadgesStatus["Skill Badges"] >= 44) {
            ArcadeBadgesStatus["Facilitator BONUS"] += 30
            ArcadeBadgesStatus["Milestone Earned"] = "Ultimate Milestone - (2)"
        }
        else {
            ArcadeBadgesStatus["Facilitator BONUS"] += 0;
            ArcadeBadgesStatus["Milestone Earned"] = "NaN"
        }

    }

    else if ((ArcadeBadgesStatus["Game Badges"] >= 5 && ArcadeBadgesStatus["Trivia Badges"] >= 6 && ArcadeBadgesStatus["Skill Badges"] >= 28) || (ArcadeBadgesStatus["Game Badges"] >= 3 && ArcadeBadgesStatus["Trivia Badges"] >= 3 && ArcadeBadgesStatus["Skill Badges"] >= 30)) {

        if (ArcadeBadgesStatus["Game Badges"] >= 5 && ArcadeBadgesStatus["Trivia Badges"] >= 6 && ArcadeBadgesStatus["Skill Badges"] >= 28) {
            ArcadeBadgesStatus["Facilitator BONUS"] += 15
            ArcadeBadgesStatus["Milestone Earned"] = "Milestone 3 - (1)"
        }

        else if (ArcadeBadgesStatus["Game Badges"] >= 3 && ArcadeBadgesStatus["Trivia Badges"] >= 3 && ArcadeBadgesStatus["Skill Badges"] >= 30) {
            ArcadeBadgesStatus["Facilitator BONUS"] += 19
            ArcadeBadgesStatus["Milestone Earned"] = "Milestone 3 - (2)"
        }
        else {
            ArcadeBadgesStatus["Facilitator BONUS"] += 0;
            ArcadeBadgesStatus["Milestone Earned"] = "NaN"
        }

    }

    else if ((ArcadeBadgesStatus["Game Badges"] >= 3 && ArcadeBadgesStatus["Trivia Badges"] >= 4 && ArcadeBadgesStatus["Skill Badges"] >= 18) || (ArcadeBadgesStatus["Game Badges"] >= 2 && ArcadeBadgesStatus["Trivia Badges"] >= 2 && ArcadeBadgesStatus["Skill Badges"] >= 20)) {

        if (ArcadeBadgesStatus["Game Badges"] >= 3 && ArcadeBadgesStatus["Trivia Badges"] >= 4 && ArcadeBadgesStatus["Skill Badges"] >= 18) {
            ArcadeBadgesStatus["Facilitator BONUS"] += 9
            ArcadeBadgesStatus["Milestone Earned"] = "Milestone 2 - (1)"
        }

        else if (ArcadeBadgesStatus["Game Badges"] >= 2 && ArcadeBadgesStatus["Trivia Badges"] >= 2 && ArcadeBadgesStatus["Skill Badges"] >= 20) {
            ArcadeBadgesStatus["Facilitator BONUS"] += 11
            ArcadeBadgesStatus["Milestone Earned"] = "Milestone 2 - (2)"
        }
        else {
            ArcadeBadgesStatus["Facilitator BONUS"] += 0;
            ArcadeBadgesStatus["Milestone Earned"] = "NaN"
        }

    }

    else if ((ArcadeBadgesStatus["Game Badges"] >= 2 && ArcadeBadgesStatus["Trivia Badges"] >= 2 && ArcadeBadgesStatus["Skill Badges"] >= 8) || (ArcadeBadgesStatus["Game Badges"] >= 1 && ArcadeBadgesStatus["Trivia Badges"] >= 1 && ArcadeBadgesStatus["Skill Badges"] >= 10)) {

        if (ArcadeBadgesStatus["Game Badges"] >= 2 && ArcadeBadgesStatus["Trivia Badges"] >= 2 && ArcadeBadgesStatus["Skill Badges"] >= 8) {
            ArcadeBadgesStatus["Facilitator BONUS"] += 2
            ArcadeBadgesStatus["Milestone Earned"] = "Milestone 1 - (1)"
        }

        else if (ArcadeBadgesStatus["Game Badges"] >= 1 && ArcadeBadgesStatus["Trivia Badges"] >= 1 && ArcadeBadgesStatus["Skill Badges"] >= 10) {
            ArcadeBadgesStatus["Facilitator BONUS"] += 3
            ArcadeBadgesStatus["Milestone Earned"] = "Milestone 1 - (2)"
        }
        else {
            ArcadeBadgesStatus["Facilitator BONUS"] += 0;
            ArcadeBadgesStatus["Milestone Earned"] = "NaN"
        }

    }

    // * Nothing
    else {
        ArcadeBadgesStatus["Facilitator BONUS"] += 0;
        ArcadeBadgesStatus["Milestone Earned"] = "NaN"
    }

    return ArcadeBadgesStatus;

}

module.exports = calculateFacilitatorMilestone;