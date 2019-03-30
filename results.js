function disableButton(buttonid) {
    document.getElementById(buttonid).disabled = true;
    document.getElementById(buttonid).style.backgroundColor = "gray";
};

function enableButton(buttonid) {
    document.getElementById(buttonid).disabled = false;
    document.getElementById(buttonid).style.backgroundColor = "#00007f";
};

function checkInputs() {
    document.getElementById("divresults").style.display = "none";
    const team1 = document.getElementById("team1").value;
    const team2 = document.getElementById("team2").value;
    const venue = document.getElementById("venue").value.slice(6);
    const tosswinner = document.getElementById("tosswinner").value.slice(5);
    if (!(team1 != team2)) {
        document.getElementById("errortext").innerHTML = "Select two different teams.";
        disableButton("predictprebutton");
        disableButton("predictpostbutton");
        return false;
    }
    if (!(
            (venue == "Bangalore" && ((team1 == "RCB") || (team2 == "RCB"))) ||
            (venue == "Chennai" && ((team1 == "CSK") || (team2 == "CSK"))) ||
            (venue == "Delhi" && ((team1 == "DC") || (team2 == "DC"))) ||
            (venue == "Hyderabad" && ((team1 == "SRH") || (team2 == "SRH"))) ||
            (venue == "Jaipur" && ((team1 == "RR") || (team2 == "RR"))) ||
            (venue == "Kolkata" && ((team1 == "KKR") || (team2 == "KKR"))) ||
            (venue == "Mohali" && ((team1 == "KXIP") || (team2 == "KXIP"))) ||
            (venue == "Mumbai" && ((team1 == "MI") || (team2 == "MI")))
        )) {
        document.getElementById("errortext").innerHTML = "Select home venue for one of the playing teams.";
        disableButton("predictprebutton");
        disableButton("predictpostbutton");
        return false;
    }
    if (!((tosswinner == team1) || (tosswinner == team2))) {
        document.getElementById("errortext").innerHTML = "Choose toss winner from the playing teams";
        disableButton("predictpostbutton");
        return false;
    }
    document.getElementById("errortext").innerHTML = "";
    enableButton("predictprebutton");
    enableButton("predictpostbutton");
    return true;
};

function checkResultsPreToss() {
    const team1 = document.getElementById("team1").value;
    const team2 = document.getElementById("team2").value;
    const venue = document.getElementById("venue").value;

    const net_teamsonly = new brain.NeuralNetwork(); //create neural network
    net_teamsonly.fromJSON(json_teamsonly); //read neural network from JSON
    const string_teamsonly = '{"' + team1 + '": 1,"' + team2 + '": 1,"' + venue + '": 1}'; //create object for running neural network
    document.getElementById("nnresult_teamsonly").innerHTML = "<strong>" + brain.likely(JSON.parse(string_teamsonly), net_teamsonly) + "</strong>"; //run neural network and update string

    const net_teamsvenue = new brain.NeuralNetwork();
    net_teamsvenue.fromJSON(json_teamsvenue);
    const string_teamsvenue = '{"' + team1 + '": 1,"' + team2 + '": 1,"' + venue + '": 1}';
    document.getElementById("nnresult_teamsvenue").innerHTML = "<strong>" + brain.likely(JSON.parse(string_teamsvenue), net_teamsvenue) + "</strong>";

    document.getElementById("nnresult_teamsvenuetoss").innerHTML = "";
    const net_teamsvenuetoss = new brain.NeuralNetwork();
    net_teamsvenuetoss.fromJSON(json_teamsvenuetoss);
    const string_teamsvenuetoss1 = '{"' + team1 + '": 1,"' + team2 + '": 1,"' + venue + '": 1,"' + "Toss_" + team1 + '": 1}';
    const string_teamsvenuetoss2 = '{"' + team1 + '": 1,"' + team2 + '": 1,"' + venue + '": 1,"' + "Toss_" + team2 + '": 1}';
    document.getElementById("nnresult_teamsvenuetoss_pre").innerHTML =
        "&nbsp;&nbsp;If " + team1 + " win toss:  <strong>" + brain.likely(JSON.parse(string_teamsvenuetoss1), net_teamsvenuetoss) + "</strong><br>" +
        "&nbsp;&nbsp;If " + team2 + " win toss:  <strong>" + brain.likely(JSON.parse(string_teamsvenuetoss2), net_teamsvenuetoss) + "</strong>";

    document.getElementById("nnresult_teamsvenuetossdecision").innerHTML = "";
    const net_teamsvenuetossdecision = new brain.NeuralNetwork();
    net_teamsvenuetossdecision.fromJSON(json_teamsvenuetossdecision);
    const string_teamsvenuetoss1bowl = '{"' + team1 + '": 1,"' + team2 + '": 1,"' + venue + '": 1,"' + "Toss_" + team1 + '": 1,"' + "TossDecision_Bowl" + '": 1}';
    const string_teamsvenuetoss1bat = '{"' + team1 + '": 1,"' + team2 + '": 1,"' + venue + '": 1,"' + "Toss_" + team1 + '": 1,"' + "TossDecision_Bat" + '": 1}';
    const string_teamsvenuetoss2bowl = '{"' + team1 + '": 1,"' + team2 + '": 1,"' + venue + '": 1,"' + "Toss_" + team2 + '": 1,"' + "TossDecision_Bowl" + '": 1}';
    const string_teamsvenuetoss2bat = '{"' + team1 + '": 1,"' + team2 + '": 1,"' + venue + '": 1,"' + "Toss_" + team2 + '": 1,"' + "TossDecision_Bat" + '": 1}';
    document.getElementById("nnresult_teamsvenuetossdecision_pre").innerHTML =
        "&nbsp;&nbsp;If " + team1 + " win toss and bowl: <strong>" + brain.likely(JSON.parse(string_teamsvenuetoss1bowl), net_teamsvenuetossdecision) + "</strong><br>" +
        "&nbsp;&nbsp;If " + team1 + " win toss and bat:  <strong>" + brain.likely(JSON.parse(string_teamsvenuetoss1bat), net_teamsvenuetossdecision) + "</strong><br>" +
        "&nbsp;&nbsp;If " + team2 + " win toss and bowl:  <strong>" + brain.likely(JSON.parse(string_teamsvenuetoss2bowl), net_teamsvenuetossdecision) + "</strong><br>" +
        "&nbsp;&nbsp;If " + team2 + " win toss and bat:  <strong>" + brain.likely(JSON.parse(string_teamsvenuetoss2bat), net_teamsvenuetossdecision) + "</strong>";

    document.getElementById("divresults").style.display = "block";
};

function checkResultsPostToss() {
    const team1 = document.getElementById("team1").value;
    const team2 = document.getElementById("team2").value;
    const venue = document.getElementById("venue").value;
    const tosswinner = document.getElementById("tosswinner").value;
    const tossdecision = document.getElementById("tossdecision").value;

    const net_teamsonly = new brain.NeuralNetwork(); //create neural network
    net_teamsonly.fromJSON(json_teamsonly); //read neural network from JSON
    const string_teamsonly = '{"' + team1 + '": 1,"' + team2 + '": 1,"' + venue + '": 1}'; //create object for running neural network
    document.getElementById("nnresult_teamsonly").innerHTML = "<strong>" + brain.likely(JSON.parse(string_teamsonly), net_teamsonly) + "</strong>"; //run neural network and update string

    const net_teamsvenue = new brain.NeuralNetwork();
    net_teamsvenue.fromJSON(json_teamsvenue);
    const string_teamsvenue = '{"' + team1 + '": 1,"' + team2 + '": 1,"' + venue + '": 1}';
    document.getElementById("nnresult_teamsvenue").innerHTML = "<strong>" + brain.likely(JSON.parse(string_teamsvenue), net_teamsvenue) + "</strong>";

    document.getElementById("nnresult_teamsvenuetoss_pre").innerHTML = "";
    const net_teamsvenuetoss = new brain.NeuralNetwork();
    net_teamsvenuetoss.fromJSON(json_teamsvenuetoss);
    const string_teamsvenuetoss = '{"' + team1 + '": 1,"' + team2 + '": 1,"' + venue + '": 1,"' + tosswinner + '": 1}';
    document.getElementById("nnresult_teamsvenuetoss").innerHTML = "<strong>" + brain.likely(JSON.parse(string_teamsvenuetoss), net_teamsvenuetoss) + "</strong>";

    document.getElementById("nnresult_teamsvenuetossdecision_pre").innerHTML = "";
    const net_teamsvenuetossdecision = new brain.NeuralNetwork();
    net_teamsvenuetossdecision.fromJSON(json_teamsvenuetossdecision);
    const string_teamsvenuetossdecision = '{"' + team1 + '": 1,"' + team2 + '": 1,"' + venue + '": 1,"' + tosswinner + '": 1,"' + tossdecision + '": 1}';
    document.getElementById("nnresult_teamsvenuetossdecision").innerHTML = "<strong>" + brain.likely(JSON.parse(string_teamsvenuetossdecision), net_teamsvenuetossdecision) + "</strong>";

    document.getElementById("divresults").style.display = "block";
};
