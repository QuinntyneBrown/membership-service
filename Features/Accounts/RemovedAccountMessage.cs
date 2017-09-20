using MembershipService.Features.Core;
using System;

namespace MembershipService.Features.Accounts
{
    public class RemovedAccountMessage : BaseEventBusMessage
    {
        public RemovedAccountMessage(int accountId, Guid correlationId, Guid tenantId)
        {
            Payload = new { Id = accountId, CorrelationId = correlationId };
            TenantUniqueId = tenantId;
        }
        public override string Type { get; set; } = AccountsEventBusMessages.RemovedAccountMessage;        
    }
}
