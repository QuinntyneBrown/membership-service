using MediatR;
using MembershipService.Data;
using MembershipService.Features.Core;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Data.Entity;

namespace MembershipService.Features.Accounts
{
    public class GetAccountsQuery
    {
        public class Request : BaseRequest, IRequest<Response> { }

        public class Response
        {
            public ICollection<AccountApiModel> Accounts { get; set; } = new HashSet<AccountApiModel>();
        }

        public class Handler : IAsyncRequestHandler<Request, Response>
        {
            public Handler(MembershipServiceContext context, ICache cache)
            {
                _context = context;
                _cache = cache;
            }

            public async Task<Response> Handle(Request request)
            {
                var accounts = await _context.Accounts
                    .Include(x => x.Tenant)
                    .Where(x => x.Tenant.UniqueId == request.TenantUniqueId )
                    .ToListAsync();

                return new Response()
                {
                    Accounts = accounts.Select(x => AccountApiModel.FromAccount(x)).ToList()
                };
            }

            private readonly MembershipServiceContext _context;
            private readonly ICache _cache;
        }
    }
}
