using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SportsTeamManagementSystem.Data;
using SportsTeamManagementSystem.DTOs;
using SportsTeamManagementSystem.Helpers;
using SportsTeamManagementSystem.Models;
using SportsTeamManagementSystem.Repository;
using SportsTeamManagementSystem.DTOs;
using SportsTeamManagementSystem.Helpers;
using SportsTeamManagementSystem.Models;
using SportsTeamManagementSystem.Repository;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace SportsTeamManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepo;
        private readonly IConfiguration _config;

        public AuthController(IAuthRepository authRepo, IConfiguration config)
        {
            _authRepo = authRepo;
            _config = config;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDto userDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (await _authRepo.UserExists(userDto.Username))
                return BadRequest("Username already exists");

            if (userDto.Password.Length < 8)
                return BadRequest("Password must be at least 8 characters");

            if (!userDto.Password.Any(char.IsDigit))
                return BadRequest("Password must contain at least one digit");

            if (!userDto.Password.Any(char.IsUpper))
                return BadRequest("Password must contain at least one uppercase letter");

            var user = new User
            {
                Username = userDto.Username,
                Email = userDto.Email,
                Role = userDto.Role ?? "Player"
            };

            var createdUser = await _authRepo.Register(user, userDto.Password);
            return StatusCode(201, new { message = "User registered successfully!" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto loginDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var user = await _authRepo.Login(loginDto.Username, loginDto.Password);
                if (user == null)
                    return Unauthorized("Invalid credentials");

                var token = JwtHelper.GenerateJwtToken(user, _config);
                return Ok(new { token });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> GetCurrentUser()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
            {
                return Unauthorized("Invalid token");
            }

            var user = await _authRepo.GetUser(userId);
            if (user == null)
                return NotFound("User not found");

            return Ok(new
            {
                user.Id,
                user.Username,
                user.Email,
                user.Role,
                user.Bio,
                user.Position,
                user.ImageUrl
            });
        }

        [Authorize]
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            return Ok(new { message = "Logged out successfully. Please delete your token." });
        }
    }
}