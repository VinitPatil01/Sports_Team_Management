using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; 
using SportsTeamManagementSystem.Data;
using SportsTeamManagementSystem.Models; 
using SportsTeamManagementSystem.DTOs;

namespace SportsTeamManagement.Controllers 
{
    [ApiController]
    [Route("api/matches")]
    public class MatchesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MatchesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateMatch([FromBody] MatchCreateDto dto)
        {
            var homeTeamExists = await _context.Teams.AnyAsync(t => t.Id == dto.HomeTeamId);
            var awayTeamExists = await _context.Teams.AnyAsync(t => t.Id == dto.AwayTeamId);

            if (!homeTeamExists || !awayTeamExists)
                return BadRequest("One or both team IDs do not exist.");

            var match = new Match
            {
                MatchDate = dto.MatchDate,
                Location = dto.Location,
                HomeTeamId = dto.HomeTeamId,
                AwayTeamId = dto.AwayTeamId
            };
            await _context.Matches.AddAsync(match);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMatch), new { id = match.Id }, match);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllMatches()
        {
            var matches = await _context.Matches
                .Include(m => m.HomeTeam)
                .Include(m => m.AwayTeam)
                .Select(m => new MatchListDto
                {
                    Id = m.Id,
                    MatchDate = m.MatchDate,
                    Location = m.Location,
                    HomeTeamId = m.HomeTeamId,
                    HomeTeamName = m.HomeTeam != null ? m.HomeTeam.Name : string.Empty,
                    AwayTeamId = m.AwayTeamId,
                    AwayTeamName = m.AwayTeam != null ? m.AwayTeam.Name : string.Empty
                })
                .ToListAsync();
            return Ok(matches);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMatch(int id)
        {
            var match = await _context.Matches.FindAsync(id);
            return match == null ? NotFound() : Ok(match);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMatch(int id, [FromBody] MatchUpdateDto dto)
        {
            var match = await _context.Matches.FindAsync(id);
            if (match == null) return NotFound();

            match.Location = dto.Location;
            match.MatchDate = dto.MatchDate;
            match.HomeTeamId = dto.HomeTeamId;
            match.AwayTeamId = dto.AwayTeamId;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMatch(int id)
        {
            var match = await _context.Matches.FindAsync(id);
            if (match == null) return NotFound();

            _context.Matches.Remove(match);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("player/{playerId}")]
        public async Task<IActionResult> GetMatchesForPlayer(int playerId)
        {
            
            var teamIds = await _context.TeamPlayers
                .Where(tp => tp.PlayerId == playerId)
                .Select(tp => tp.TeamId)
                .ToListAsync();

            
            var matches = await _context.Matches
                .Where(m => teamIds.Contains(m.HomeTeamId) || teamIds.Contains(m.AwayTeamId))
                .Include(m => m.HomeTeam)
                .Include(m => m.AwayTeam)
                .ToListAsync();

            var result = matches.Select(m => new PlayerMatchDto
            {
                Id = m.Id,
                MatchDate = m.MatchDate,
                Location = m.Location,
                HomeTeamId = m.HomeTeamId,
                HomeTeamName = m.HomeTeam != null ? m.HomeTeam.Name : string.Empty,
                AwayTeamId = m.AwayTeamId,
                AwayTeamName = m.AwayTeam != null ? m.AwayTeam.Name : string.Empty
            }).ToList();

            return Ok(result);
        }
    }
}