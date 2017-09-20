using MediatR;
using MembershipService.Data;
using MembershipService.Model;
using MembershipService.Features.Core;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Data.Entity;

namespace MembershipService.Features.Profiles
{
    public class AddOrUpdateProfileCommand
    {
        public class Request : BaseRequest, IRequest<Response>
        {
            public ProfileApiModel Profile { get; set; }            
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
                var entity = await _context.Profiles
                    .Include(x => x.Tenant)
                    .SingleOrDefaultAsync(x => x.Id == request.Profile.Id && x.Tenant.UniqueId == request.TenantUniqueId);
                
                if (entity == null) {
                    var tenant = await _context.Tenants.SingleAsync(x => x.UniqueId == request.TenantUniqueId);
                    _context.Profiles.Add(entity = new Profile() { TenantId = tenant.Id });
                }

                entity.Name = request.Profile.Name;
                
                await _context.SaveChangesAsync();

                _bus.Publish(new AddedOrUpdatedProfileMessage(entity, request.CorrelationId, request.TenantUniqueId));

                return new Response();
            }

            private readonly MembershipServiceContext _context;
            private readonly IEventBus _bus;
        }
    }
}
