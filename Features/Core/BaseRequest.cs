using System;

namespace MembershipService.Features.Core
{
    public class BaseRequest 
    {
        public Guid TenantUniqueId { get; set; }
    }
}