$(document).ready(function () {

    const broadCastMessageToAllClientHubMethodCall = "BroadCastMessageToAllClient";
    const receiveMessageForAllClientClientMethodCall = "ReceiveMessageForAllClient";

    const broadCastMessageToCallerClient = "BroadCastMessageToCallerClient";
    const receiveMessageForCallerClient = "ReceiveMessageForCallerClient";

    const broadCastMessageToOthersClient = "BroadCastMessageToOthersClient";
    const receiveMessageForOthersClient = "ReceiveMessageForOthersClient";

    const receiveConnectedClientCountAllClient = "ReceiveConnectedClientCountAllClient";

    const connection = new signalR.HubConnectionBuilder().withUrl("/exampleTypeSafeHub").configureLogging(signalR.LogLevel.Information).build();

    function start() {
        connection.start().then(() => console.log("Connected to Hub."));
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

    $("#connectionId").html(`Connection Id : ${connection.connectionId}`);

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

    $("#btn-send-message-all-client").click(function () {
        const message = "hello world";
        connection.invoke(broadCastMessageToAllClientHubMethodCall, message).catch(err => console.error("error", err));
    })

    $("#btn-send-message-caller-client").click(function () {
        const message = "hello world";
        connection.invoke(broadCastMessageToCallerClient, message).catch(err => console.error("error", err));
    })

    $("#btn-send-message-others-client").click(function () {
        const message = "hello world";
        connection.invoke(broadCastMessageToOthersClient, message).catch(err => console.error("error", err));
    })
})