using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; // Add this for async operations
using SportsTeamManagementSystem.Data;
using SportsTeamManagementSystem.Models; // Add this for Match model
using SportsTeamManagementSystem.DTOs;

namespace SportsTeamManagement.Controllers // Correct namespace
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
            var matches = await _context.Matches.ToListAsync();
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
    }
}