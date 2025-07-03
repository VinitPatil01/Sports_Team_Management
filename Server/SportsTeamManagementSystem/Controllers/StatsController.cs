using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsTeamManagementSystem.Data;
using SportsTeamManagementSystem.Models;

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
        public async Task<IActionResult> AddStats([FromBody] PerformanceStats stats)
        {
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
    }

}
