
function onLoad() {
    ChooseWeekly();
}

function Parse() {
    let request = new XMLHttpRequest();
    request.open("GET", "./data.json", false);
    request.send(null);
    let data = JSON.parse(request.responseText);
    return data;
}

function HandlingData(timeframe) {
    let data = Parse();

    data.forEach(item => {
        let title = item.title.replace(/\s+/g, '').toLowerCase();
        let currentStr = "";
        let previousStr = "";

        switch (timeframe) {
            case "daily": {
                currentStr = item.timeframes.daily.current;
                previousStr = "Day - " + item.timeframes.daily.previous;
                break;
            }
            case "weekly": {
                currentStr = item.timeframes.weekly.current;
                previousStr = "Week - " + item.timeframes.weekly.previous;
                break;
            }
            case "monthly": {
                currentStr = item.timeframes.monthly.current;
                previousStr = "Month - " + item.timeframes.monthly.previous;
                break;
            }
        }

        currentStr += "hrs";
        previousStr += "hrs";

        document.getElementById(title + "-timeframe-current").innerHTML = currentStr;
        document.getElementById(title + "-timeframe-previous").innerHTML = previousStr;
    });
}

function ChooseDaily() {
    HandlingData("daily");
    DeactivateButton();
    document.getElementById("daily-button").classList.add("active-button");
}

function ChooseWeekly() {
    HandlingData("weekly");
    DeactivateButton();
    document.getElementById("weekly-button").classList.add("active-button");
}

function ChooseMonthly() {
    HandlingData("monthly");
    DeactivateButton();
    document.getElementById("monthly-button").classList.add("active-button");
}

function DeactivateButton() {
    document.getElementsByClassName("active-button")[0].classList.remove("active-button");
}