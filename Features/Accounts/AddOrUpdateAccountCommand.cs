using MediatR;
using MembershipService.Data;
using MembershipService.Model;
using MembershipService.Features.Core;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Data.Entity;

namespace MembershipService.Features.Accounts
{
    public class AddOrUpdateAccountCommand
    {
        public class Request : BaseRequest, IRequest<Response>
        {
            public AccountApiModel Account { get; set; }            
			public Guid CorrelationId { get; set; }
        }

        public class Response { }

        public class Handler : IAsyncRequestHandler<Request, Response>
        {
            public Handler(MembershipServiceContext context, IEventBus bus)
            {
                _context = context;
                _bus = bus;
            }

            public async Task<Response> Handle(Request request)
            {
                var entity = await _context.Accounts
                    .Include(x => x.Tenant)
                    .SingleOrDefaultAsync(x => x.Id == request.Account.Id && x.Tenant.UniqueId == request.TenantUniqueId);
                
                if (entity == null) {
                    var tenant = await _context.Tenants.SingleAsync(x => x.UniqueId == request.TenantUniqueId);
                    _context.Accounts.Add(entity = new Account() { TenantId = tenant.Id });
                }

                entity.Name = request.Account.Name;
                
                await _context.SaveChangesAsync();

                _bus.Publish(new AddedOrUpdatedAccountMessage(entity, request.CorrelationId, request.TenantUniqueId));

                return new Response();
            }

            private readonly MembershipServiceContext _context;
            private readonly IEventBus _bus;
        }
    }
}
