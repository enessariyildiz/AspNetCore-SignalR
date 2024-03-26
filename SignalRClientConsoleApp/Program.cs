using Microsoft.AspNetCore.SignalR.Client;
using SignalRClientConsoleApp;

Console.WriteLine("SignalR Console Client");

var connection = new HubConnectionBuilder().WithUrl("https://localhost:7008/exampleTypeSafeHub").Build();

connection.StartAsync().ContinueWith((result) =>
{
    Console.WriteLine(result.IsCompletedSuccessfully ? "Connected" : "Connection failed");
});

connection.On<Product>("ReceiveTypedMessageForAllClient", (product) =>
{
    Console.WriteLine($"Receive message: {product.Id}-{product.Name}-{product.Price}");
});

Console.ReadKey();

