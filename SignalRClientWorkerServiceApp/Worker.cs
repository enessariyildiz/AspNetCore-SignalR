using Microsoft.AspNetCore.SignalR.Client;

namespace SignalRClientWorkerServiceApp
{
    public class Worker : BackgroundService
    {
        private readonly ILogger<Worker> logger;
        private HubConnection? connection;
        private readonly IConfiguration configuration;

        public Worker(ILogger<Worker> logger, IConfiguration configuration)
        {
            logger = logger;
            this.configuration = configuration;
        }
        public override Task StartAsync(CancellationToken cancellationToken)
        {
            connection = new HubConnectionBuilder().WithUrl(configuration.GetSection("SignalR")["Hub"]!).Build();

            connection?.StartAsync().ContinueWith((result) =>
            {
                logger.LogInformation(result.IsCompletedSuccessfully ? "Connected" : "Connected Failed!");
            });

            return base.StartAsync(cancellationToken);
        }

        public override async Task StopAsync(CancellationToken cancellationToken)
        {
            await connection!.StopAsync(cancellationToken);
            await connection!.DisposeAsync();
            base.StopAsync(cancellationToken);
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            connection.On<Product>("ReceiveTypedMessageForAllClient", (product) =>
            {
                logger.LogInformation($"Receive message: {product.Id}-{product.Name}-{product.Price}");
            });

            return Task.CompletedTask;
        }
    }
}
