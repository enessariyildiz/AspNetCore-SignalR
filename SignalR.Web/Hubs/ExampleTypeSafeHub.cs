
using Microsoft.AspNetCore.SignalR;

namespace SignalR.Web.Hubs
{
    public class ExampleTypeSafeHub : Hub<IExampleTypeSafeHub>
    {
        private static int ConnectedClientCount = 0;
        public async Task BroadCastMessageToAllClient(string message)
        {
            await Clients.All.ReceiveMessageForAllClient(message);
        }

        public async Task BroadCastMessageToCallerClient(string message)
        {
            await Clients.Caller.ReceiveMessageForCallerClient(message);
        }

        public async Task BroadCastMessageToOthersClient(string message)
        {
            await Clients.Others.ReceiveMessageForOthersClient(message);
        }

        public async Task BroadcastMessageToIndividualClient(string connectionId, string message)
        {
            await Clients.Client(connectionId).ReceiveMessageForIndividualClient(message);
        }

        public async Task BroadcastMessageToGroupClient(string groupName, string message)
        {
            await Clients.Group(groupName).ReceiveMessageForGroupClients(message);
        }

        public async Task AddGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            await Clients.Caller.ReceiveMessageForCallerClient($"{groupName} you joined the group!");

            //first method
            //await Clients.Others.ReceiveMessageForOthersClient($"User({Context.ConnectionId}) {groupName} joined the group!");

            //second method
            await Clients.Group(groupName).ReceiveMessageForGroupClients($"User({Context.ConnectionId}) {groupName} joined the group!");
        }

        public async Task RemoveGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            await Clients.Caller.ReceiveMessageForCallerClient($"{groupName} you left the group!");
            //await Clients.Others.ReceiveMessageForOthersClient($"User({Context.ConnectionId}) {groupName} left the group!");

            //second method
            await Clients.Group(groupName).ReceiveMessageForGroupClients($"User({Context.ConnectionId}) {groupName} left the group!");
        }

        public override async Task OnConnectedAsync()
        {
            ConnectedClientCount++;
            await Clients.All.ReceiveConnectedClientCountAllClient(ConnectedClientCount);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            ConnectedClientCount--;
            await Clients.All.ReceiveConnectedClientCountAllClient(ConnectedClientCount);
            await base.OnDisconnectedAsync(exception);
        }
    }
}
