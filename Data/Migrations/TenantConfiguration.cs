using System.Data.Entity.Migrations;
using MembershipService.Data;
using MembershipService.Model;
using System;

namespace MembershipService.Migrations
{
    public class TenantConfiguration
    {
        public static void Seed(MembershipServiceContext context) {

            context.Tenants.AddOrUpdate(x => x.Name, new Tenant()
            {
                Name = "Default",
                UniqueId = new Guid("489902a0-a39d-4556-94b4-544d33d5ff5b")
            });

            context.SaveChanges();
        }
    }
}
