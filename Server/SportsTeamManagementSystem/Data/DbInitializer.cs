using SportsTeamManagementSystem.Models;
using System.Security.Cryptography;
using System.Text;

namespace SportsTeamManagementSystem.Data
{
    public static class DbInitializer
    {
        public static void Initialize(ApplicationDbContext context)
        {
            context.Database.EnsureCreated();

            if (context.Users.Any()) return;

            // Create admin user
            var admin = new User
            {
                Username = "admin",
                Email = "admin@example.com",
                Role = "Admin"
            };

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash("admin123", out passwordHash, out passwordSalt);

            admin.PasswordHash = passwordHash;
            admin.PasswordSalt = passwordSalt;

            context.Users.Add(admin);
            context.SaveChanges();
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using var hmac = new HMACSHA512();
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        }
    }
}
