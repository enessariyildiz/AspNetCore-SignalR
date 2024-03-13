$(document).ready(function () {

    const broadCastMessageToAllClientHubMethodCall = "BroadCastMessageToAllClient";
    const ReceiveMessageForAllClientClientMethodCall = "ReceiveMessageForAllClient";

    const connection = new signalR.HubConnectionBuilder().withUrl("/examplehub").configureLogging(signalR.LogLevel.Information).build();

    function start() {
        connection.start().then(() => console.log("Connected to Hub."));
    }

    try {
        start();
    }
    catch {
        setTimeout(() => start(), 5000);
    }

    connection.on(ReceiveMessageForAllClientClientMethodCall, (message) => {
        console.log("Incomming message: ", message);
    })

    $("#btn-send-message-all-client").click(function () {
        const message = "hello world";
        connection.invoke(broadCastMessageToAllClientHubMethodCall, message).catch(err => console.error("error", err));
    })
})