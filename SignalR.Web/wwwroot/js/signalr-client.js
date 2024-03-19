$(document).ready(function () {

    const broadCastMessageToAllClientHubMethodCall = "BroadCastMessageToAllClient";
    const receiveMessageForAllClientClientMethodCall = "ReceiveMessageForAllClient";

    const broadCastMessageToCallerClient = "BroadCastMessageToCallerClient";
    const receiveMessageForCallerClient = "ReceiveMessageForCallerClient";

    const broadCastMessageToOthersClient = "BroadCastMessageToOthersClient";
    const receiveMessageForOthersClient = "ReceiveMessageForOthersClient";

    const broadcastMessageToIndividualClient = "BroadcastMessageToIndividualClient";
    const receiveMessageForIndividualClient = "ReceiveMessageForIndividualClient";

    const receiveConnectedClientCountAllClient = "ReceiveConnectedClientCountAllClient";

    const connection = new signalR.HubConnectionBuilder().withUrl("/exampleTypeSafeHub").configureLogging(signalR.LogLevel.Information).build();

    function start() {
        connection.start().then(() => {
            console.log("Connected to Hub.");
            $("#connectionId").html(`Connection Id : ${connection.connectionId}`);
        });
    }

    try {
        start();
    }
    catch {
        setTimeout(() => start(), 5000);
    }

    const span_client_count = $("#span-connected-client-count");
    connection.on(receiveConnectedClientCountAllClient, (count) => {
        span_client_count.text(count);
        console.log("Connected client count: ", count);
    })

    //subscribe
    connection.on(receiveMessageForAllClientClientMethodCall, (message) => {
        console.log("Incomming message: ", message);
    })

    connection.on(receiveMessageForCallerClient, (message) => {
        console.log("(Caller) Incomming message: ", message);
    })

    connection.on(receiveMessageForOthersClient, (message) => {
        console.log("(Others) Incomming message: ", message);
    })

    connection.on(receiveMessageForIndividualClient, (message) => {
        console.log("(Individual) Incomming message: ", message);
    })

    $("#btn-send-message-all-client").click(function () {
        const message = "hello world";
        connection.invoke(broadCastMessageToAllClientHubMethodCall, message).catch(err => console.error("error", err));
        console.log("Message sended!");

    })

    $("#btn-send-message-caller-client").click(function () {
        const message = "hello world";
        connection.invoke(broadCastMessageToCallerClient, message).catch(err => console.error("error", err));
        console.log("Message sended!");
    })

    $("#btn-send-message-others-client").click(function () {
        const message = "hello world";
        connection.invoke(broadCastMessageToOthersClient, message).catch(err => console.error("error", err));
        console.log("Message sended!");
    })

    $("#btn-send-message-individual-client").click(function () {
        const message = "Hello world";
        const connectionId = $("#text-connectionId").val();
        connection.invoke(broadcastMessageToIndividualClient, connectionId, message).catch(err => console.error("error", err))
        console.log("Message sended!");
    })
})