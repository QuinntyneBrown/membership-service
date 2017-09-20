using MediatR;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using MembershipService.Features.Core;

namespace MembershipService.Features.Accounts
{
    [Authorize]
    [RoutePrefix("api/accounts")]
    public class AccountController : BaseApiController
    {
        public AccountController(IMediator mediator)
            :base(mediator) { }

        [Route("add")]
        [HttpPost]
        [ResponseType(typeof(AddOrUpdateAccountCommand.Response))]
        public async Task<IHttpActionResult> Add(AddOrUpdateAccountCommand.Request request) => Ok(await Send(request));

        [Route("update")]
        [HttpPut]
        [ResponseType(typeof(AddOrUpdateAccountCommand.Response))]
        public async Task<IHttpActionResult> Update(AddOrUpdateAccountCommand.Request request) => Ok(await Send(request));
        
        [Route("get")]
        [AllowAnonymous]
        [HttpGet]
        [ResponseType(typeof(GetAccountsQuery.Response))]
        public async Task<IHttpActionResult> Get() => Ok(await Send(new GetAccountsQuery.Request()));

        [Route("getById")]
        [HttpGet]
        [ResponseType(typeof(GetAccountByIdQuery.Response))]
        public async Task<IHttpActionResult> GetById([FromUri]GetAccountByIdQuery.Request request) => Ok(await Send(request));

        [Route("remove")]
        [HttpDelete]
        [ResponseType(typeof(RemoveAccountCommand.Response))]
        public async Task<IHttpActionResult> Remove([FromUri]RemoveAccountCommand.Request request) => Ok(await Send(request));

    }
}
