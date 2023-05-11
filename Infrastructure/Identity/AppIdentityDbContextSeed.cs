using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager){
            if(!userManager.Users.Any()){
                var user = new AppUser
                {
                    DisplayName = "Ricardo",
                    Email = "rlatigano@gmail.com",
                    UserName = "rlatigano@gmail.com",
                    Address = new Address
                    {
                        FirstName ="Ricardo",
                        LastName = "Latigano",
                        Street ="barrio el Huaico Mza 513 casa 17",
                        City ="Salta",
                        State ="Salta",
                        ZipCode = "4400"
                    }

                };
                await userManager.CreateAsync(user,"Pa$$w0rd");
            }
        }
    }
}