using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; 
using SportsTeamManagementSystem.Data;
using SportsTeamManagementSystem.DTOs;
using SportsTeamManagementSystem.Models;
using SportsTeamManagementSystem.Data;
using SportsTeamManagementSystem.DTOs;
using SportsTeamManagementSystem.Models;

namespace SportsTeamManagement.Controllers 
{
    [ApiController]
    [Route("api/teams")]
    public class TeamsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TeamsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> CreateTeam([FromBody] TeamCreateDto dto)
        {
            var team = new Team { Name = dto.Name, Description = dto.Description };
            await _context.Teams.AddAsync(team);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTeam), new { id = team.Id }, team);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTeams()
        {
            var teams = await _context.Teams.ToListAsync();
            return Ok(teams);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTeam(int id)
        {
            var team = await _context.Teams
                .Include(t => t.TeamPlayers)
                    .ThenInclude(tp => tp.Player)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (team == null) return NotFound();

            var dto = new TeamDetailsDto
            {
                Id = team.Id,
                Name = team.Name,
                Description = team.Description,
                CreatedDate = team.CreatedDate,
                Players = team.TeamPlayers.Select(tp => new PlayerDto
                {
                    Id = tp.Player.Id,
                    Name = tp.Player.Username,
                    Email = tp.Player.Email
                }).ToList()
            };

            return Ok(dto);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTeam(int id, [FromBody] TeamUpdateDto dto)
        {
            var team = await _context.Teams.FindAsync(id);
            if (team == null) return NotFound();

            team.Name = dto.Name;
            team.Description = dto.Description;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeam(int id)
        {
            var team = await _context.Teams.FindAsync(id);
            if (team == null) return NotFound();

            _context.Teams.Remove(team);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("{teamId}/add-player")]
        public async Task<IActionResult> AddPlayer(int teamId, [FromQuery] int playerId)
        {
            // Check if team exists
            var team = await _context.Teams.FindAsync(teamId);
            if (team == null) return NotFound("Team not found");

            // Check if player exists
            var player = await _context.Users.FindAsync(playerId);
            if (player == null) return NotFound("Player not found");

            // Check if already in team
            var exists = await _context.TeamPlayers
                .AnyAsync(tp => tp.TeamId == teamId && tp.PlayerId == playerId);

            if (exists) return BadRequest("Player already in team");

            await _context.TeamPlayers.AddAsync(new TeamPlayer
            {
                TeamId = teamId,
                PlayerId = playerId
            });

            await _context.SaveChangesAsync();
            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{teamId}/remove-player/{playerId}")]
        public async Task<IActionResult> RemovePlayer(int teamId, int playerId)
        {
            var teamPlayer = await _context.TeamPlayers
                .FirstOrDefaultAsync(tp => tp.TeamId == teamId && tp.PlayerId == playerId);

            if (teamPlayer == null) return NotFound();

            _context.TeamPlayers.Remove(teamPlayer);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("{teamId}/players")]
        public async Task<IActionResult> GetPlayers(int teamId)
        {
            var players = await _context.TeamPlayers
                .Where(tp => tp.TeamId == teamId)
                .Include(tp => tp.Player)  // Eager load player data
                .Select(tp => tp.Player)
                .ToListAsync();

            return Ok(players);
        }
    }
}