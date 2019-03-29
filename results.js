function checkresults() {
    const team1 = document.getElementById("team1").value;
    const team2 = document.getElementById("team2").value;
    const venue = document.getElementById("venue").value;
    const toss = document.getElementById("toss").value;
    const tossdecision = document.getElementById("tossdecision").value;

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
    const string_teamsvenuetoss = '{"' + team1 + '": 1,"' + team2 + '": 1,"' + venue + '": 1,"' + toss + '": 1}';
    document.getElementById("nnresult_teamsvenuetoss").innerHTML = brain.likely(JSON.parse(string_teamsvenuetoss), net_teamsvenuetoss);

    const net_teamsvenuetossdecision = new brain.NeuralNetwork();
    net_teamsvenuetossdecision.fromJSON(json_teamsvenuetossdecision);
    const string_teamsvenuetossdecision = '{"' + team1 + '": 1,"' + team2 + '": 1,"' + venue + '": 1,"' + toss + '": 1,"' + tossdecision + '": 1}';
    document.getElementById("nnresult_teamsvenuetossdecision").innerHTML = brain.likely(JSON.parse(string_teamsvenuetossdecision), net_teamsvenuetossdecision);

    document.getElementById("divresults").style.display = "block";
};