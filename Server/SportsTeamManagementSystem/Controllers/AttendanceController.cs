using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsTeamManagementSystem.Data;
using SportsTeamManagementSystem.Models;
using SportsTeamManagementSystem.DTOs;

namespace SportsTeamManagementSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AttendanceController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AttendanceController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> MarkAttendance([FromBody] AttendanceCreateDto dto)
        {
            var attendance = new Attendance
            {
                PlayerId = dto.PlayerId,
                MatchId = dto.MatchId,
                IsPresent = dto.IsPresent,
                AttendanceDate = dto.AttendanceDate
            };
            await _context.Attendances.AddAsync(attendance);
            await _context.SaveChangesAsync();
            return Ok(attendance);
        }

        [HttpGet]
        public async Task<IActionResult> GetTeamAttendance([FromQuery] int teamId, [FromQuery] DateTime date)
        {
            var attendances = await _context.Attendances
                .Where(a => a.Match.MatchDate.Date == date.Date &&
                             (a.Match.HomeTeamId == teamId || a.Match.AwayTeamId == teamId))
                .ToListAsync();
            return Ok(attendances);
        }

        [HttpGet("player/{playerId}")]
        public async Task<IActionResult> GetPlayerAttendance(int playerId)
        {
            var data = await _context.Attendances.Where(a => a.PlayerId == playerId).ToListAsync();
            return Ok(data);
        }
    }
}
