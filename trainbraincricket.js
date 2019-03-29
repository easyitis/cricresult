function startTraining() {
    document.getElementById("nnstats_teamsonly").innerHTML = "Training...";
    document.getElementById("nnstats_teamsvenue").innerHTML = "Training...";
    document.getElementById("nnstats_teamsvenuetoss").innerHTML = "Training...";
    document.getElementById("nnstats_teamsvenuetossdecision").innerHTML = "Training...";

    const config = {
        log: true, // true to use console.log, when a function is supplied it is used
        logPeriod: 10, // iterations between logging out
        learningRate: 0.99,
        momentum: 0.6,
        // iterations: 20
    };

    const test_teamsonly = {
        CSK: 1,
        RCB: 1
    };

    const test_teamsvenue = {
        RR: 1,
        KXIP: 1,
        Venue_Jaipur: 1
    };

    const test_teamsvenuetoss = {
        RR: 1,
        KXIP: 1,
        Venue_Jaipur: 1,
        Toss_RR: 1
    };

    const test_teamsvenuetossdecision = {
        RR: 1,
        KXIP: 1,
        Venue_Jaipur: 1,
        Toss_RR: 1,
        TossDecision_Bowl: 1
    };

    trainbraincricket(teamsonlyData, test_teamsonly, config, "nnstats_teamsonly", "json_teamsonly");
    trainbraincricket(teamsvenueData, test_teamsvenue, config, "nnstats_teamsvenue", "json_teamsvenue");
    trainbraincricket(teamsvenuetossData, test_teamsvenuetoss, config, "nnstats_teamsvenuetoss", "json_teamsvenuetoss");
    trainbraincricket(teamsvenuetossdecisionData, test_teamsvenuetossdecision, config, "nnstats_teamsvenuetossdecision", "json_teamsvenuetossdecision");
};

function trainbraincricket(trainingData, testData, trainConfig, statsElement, jsonElement) {
    const cricketnet = new brain.NeuralNetwork(); //create neural network
    const trainingstats = cricketnet.train(trainingData, trainConfig); //train neural network
    console.log(trainingstats); //log training stats
    console.log(cricketnet.run(testData)); //log test run
    // document.getElementById(statsElement).innerHTML = brain.likely(testData, cricketnet);
    document.getElementById(statsElement).innerHTML = JSON.stringify(trainingstats); //write stats
    const netJSON = cricketnet.toJSON(); //create JSON for neural network
    document.getElementById(jsonElement).innerHTML = JSON.stringify(netJSON); //write JSON for neural network
};