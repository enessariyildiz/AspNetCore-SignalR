$(document).ready(function () {

    const broadCastMessageToAllClientHubMethodCall = "BroadCastMessageToAllClient";
    const receiveMessageForAllClientClientMethodCall = "ReceiveMessageForAllClient";
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

    //subscribe
    connection.on(receiveMessageForAllClientClientMethodCall, (message) => {
        console.log("Incomming message: ", message);
    })

    var span_client_count = $("#span-connected-client-count");
    connection.on(receiveConnectedClientCountAllClient, (count) => {
        span_client_count.text(count);
        console.log("Connected client count: ", count);
    })

    $("#btn-send-message-all-client").click(function () {
        const message = "hello world";
        connection.invoke(broadCastMessageToAllClientHubMethodCall, message).catch(err => console.error("error", err));
    })
})