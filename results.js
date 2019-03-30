function disablePredictButton() {
    document.getElementById("predictbutton").disabled = true;
    document.getElementById("predictbutton").style.backgroundColor = "gray";
};

function enablePredictButton() {
    document.getElementById("predictbutton").disabled = false;
    document.getElementById("predictbutton").style.backgroundColor = "#00007f";
};

function checkInputs() {
    const team1 = document.getElementById("team1").value;
    const team2 = document.getElementById("team2").value;
    const venue = document.getElementById("venue").value.slice(6);
    const tosswinner = document.getElementById("tosswinner").value.slice(5);
    if (!(team1 != team2)) {
        document.getElementById("errortext").innerHTML = "Select two different teams.";
        disablePredictButton();
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
        disablePredictButton();
        return false;
    }
    if (!((tosswinner == team1) || (tosswinner == team2))) {
        document.getElementById("errortext").innerHTML = "Choose toss winner from the playing teams";
        disablePredictButton();
        return false;
    }
    document.getElementById("errortext").innerHTML = "";
    enablePredictButton();
    return true;
};

function checkresults() {
    const team1 = document.getElementById("team1").value;
    const team2 = document.getElementById("team2").value;
    const venue = document.getElementById("venue").value;
    const tosswinner = document.getElementById("tosswinner").value;
    const tossdecision = document.getElementById("tossdecision").value;

    // if (checkInputs())

    // {
    const net_teamsonly = new brain.NeuralNetwork(); //create neural network
    net_teamsonly.fromJSON(json_teamsonly); //read neural network from JSON
    const string_teamsonly = '{"' + team1 + '": 1,"' + team2 + '": 1,"' + venue + '": 1}'; //create object for running neural network
    document.getElementById("nnresult_teamsonly").innerHTML = brain.likely(JSON.parse(string_teamsonly), net_teamsonly); //run neural network and update string

    const net_teamsvenue = new brain.NeuralNetwork();
    net_teamsvenue.fromJSON(json_teamsvenue);
    const string_teamsvenue = '{"' + team1 + '": 1,"' + team2 + '": 1,"' + venue + '": 1}';
    document.getElementById("nnresult_teamsvenue").innerHTML = brain.likely(JSON.parse(string_teamsvenue), net_teamsvenue);

    const net_teamsvenuetoss = new brain.NeuralNetwork();
    net_teamsvenuetoss.fromJSON(json_teamsvenuetoss);
    const string_teamsvenuetoss = '{"' + team1 + '": 1,"' + team2 + '": 1,"' + venue + '": 1,"' + tosswinner + '": 1}';
    document.getElementById("nnresult_teamsvenuetoss").innerHTML = brain.likely(JSON.parse(string_teamsvenuetoss), net_teamsvenuetoss);

    const net_teamsvenuetossdecision = new brain.NeuralNetwork();
    net_teamsvenuetossdecision.fromJSON(json_teamsvenuetossdecision);
    const string_teamsvenuetossdecision = '{"' + team1 + '": 1,"' + team2 + '": 1,"' + venue + '": 1,"' + tosswinner + '": 1,"' + tossdecision + '": 1}';
    document.getElementById("nnresult_teamsvenuetossdecision").innerHTML = brain.likely(JSON.parse(string_teamsvenuetossdecision), net_teamsvenuetossdecision);

    document.getElementById("divresults").style.display = "block";
    // }
};
