using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsTeamManagementSystem.Data;
using SportsTeamManagementSystem.Models;
using SportsTeamManagementSystem.DTOs;

namespace SportsTeamManagementSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StatsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StatsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> AddStats([FromBody] PerformanceStatsDto dto)
        {
            var stats = new PerformanceStats
            {
                PlayerId = dto.PlayerId,
                MatchId = dto.MatchId,
                Goals = dto.Goals,
                Assists = dto.Assists,
                Fouls = dto.Fouls,
                MinutesPlayed = dto.MinutesPlayed
            };
            await _context.PerformanceStats.AddAsync(stats);
            await _context.SaveChangesAsync();
            return Ok(stats);
        }

        [HttpGet("player/{id}")]
        public async Task<IActionResult> GetPlayerStats(int id)
        {
            var stats = await _context.PerformanceStats.Where(s => s.PlayerId == id).ToListAsync();
            return Ok(stats);
        }

        [HttpGet("team/{id}")]
        public async Task<IActionResult> GetTeamStats(int id)
        {
            var stats = await _context.PerformanceStats
                .Where(s => s.Match.HomeTeamId == id || s.Match.AwayTeamId == id)
                .ToListAsync();
            return Ok(stats);
        }

        [HttpGet("teams/summary")]
        public async Task<IActionResult> GetAllTeamsStatsSummary()
        {
            var teams = await _context.Teams.Include(t => t.TeamPlayers).ToListAsync();
            var result = new List<TeamStatsSummaryDto>();
            foreach (var team in teams)
            {
                var playerIds = team.TeamPlayers.Select(tp => tp.PlayerId).ToList();
                var stats = await _context.PerformanceStats.Where(s => playerIds.Contains(s.PlayerId)).ToListAsync();
                result.Add(new TeamStatsSummaryDto
                {
                    TeamId = team.Id,
                    TeamName = team.Name,
                    TotalGoals = stats.Sum(s => s.Goals),
                    TotalAssists = stats.Sum(s => s.Assists),
                    TotalFouls = stats.Sum(s => s.Fouls),
                    TotalMinutesPlayed = stats.Sum(s => s.MinutesPlayed)
                });
            }
            return Ok(result);
        }

        [HttpGet("team/{teamId}/players")]
        public async Task<IActionResult> GetPlayerStatsForTeam(int teamId)
        {
            var team = await _context.Teams.Include(t => t.TeamPlayers).ThenInclude(tp => tp.Player).FirstOrDefaultAsync(t => t.Id == teamId);
            if (team == null) return NotFound();
            var playerStats = new List<PlayerStatsInTeamDto>();
            foreach (var tp in team.TeamPlayers)
            {
                var stats = await _context.PerformanceStats.Where(s => s.PlayerId == tp.PlayerId).ToListAsync();
                playerStats.Add(new PlayerStatsInTeamDto
                {
                    Id = stats.FirstOrDefault()?.Id ?? 0,
                    PlayerId = tp.PlayerId,
                    Username = tp.Player.Username,
                    Goals = stats.Sum(s => s.Goals),
                    Assists = stats.Sum(s => s.Assists),
                    Fouls = stats.Sum(s => s.Fouls),
                    MinutesPlayed = stats.Sum(s => s.MinutesPlayed)
                });
            }
            return Ok(playerStats);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStats(int id, [FromBody] PerformanceStatsUpdateDto dto)
        {
            if (id != dto.Id) return BadRequest();
            var stats = await _context.PerformanceStats.FindAsync(id);
            if (stats == null) return NotFound();
            stats.PlayerId = dto.PlayerId;
            stats.MatchId = dto.MatchId;
            stats.Goals = dto.Goals;
            stats.Assists = dto.Assists;
            stats.Fouls = dto.Fouls;
            stats.MinutesPlayed = dto.MinutesPlayed;
            await _context.SaveChangesAsync();
            return Ok(stats);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStats(int id)
        {
            var stats = await _context.PerformanceStats.FindAsync(id);
            if (stats == null) return NotFound();
            _context.PerformanceStats.Remove(stats);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
