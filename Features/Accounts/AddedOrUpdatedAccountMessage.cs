using MembershipService.Model;
using MembershipService.Features.Core;
using System;

namespace MembershipService.Features.Accounts
{

    public class AddedOrUpdatedAccountMessage : BaseEventBusMessage
    {
        public AddedOrUpdatedAccountMessage(Account account, Guid correlationId, Guid tenantId)
        {
            Payload = new { Entity = account, CorrelationId = correlationId };
            TenantUniqueId = tenantId;
        }
        public override string Type { get; set; } = AccountsEventBusMessages.AddedOrUpdatedAccountMessage;        
    }
}
