using Newtonsoft.Json.Linq;

namespace MembershipService.Features.Core
{
    public interface IEventBusMessageHandler
    {
        void Handle(JObject message);
    }
}