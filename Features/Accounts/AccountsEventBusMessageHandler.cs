using MembershipService.Features.Core;
using Microsoft.AspNet.SignalR;
using Newtonsoft.Json.Linq;
using System;

namespace MembershipService.Features.Accounts
{
    public interface IAccountsEventBusMessageHandler: IEventBusMessageHandler { }

    public class AccountsEventBusMessageHandler: IAccountsEventBusMessageHandler
    {
        public AccountsEventBusMessageHandler(ICache cache)
        {
            _cache = cache;
        }

        public void Handle(JObject message)
        {
            try
            {
                if ($"{message["type"]}" == AccountsEventBusMessages.AddedOrUpdatedAccountMessage)
                {
                    _cache.Remove(AccountsCacheKeyFactory.Get(new Guid(message["tenantUniqueId"].ToString())));
                }

                if ($"{message["type"]}" == AccountsEventBusMessages.RemovedAccountMessage)
                {
                    _cache.Remove(AccountsCacheKeyFactory.Get(new Guid(message["tenantUniqueId"].ToString())));
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        private readonly ICache _cache;
    }
}
