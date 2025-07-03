namespace SportsTeamManagementSystem.DTOs
{
    public class AttendanceDto
    {
        public int PlayerId { get; set; }
        public int MatchId { get; set; }
        public bool IsPresent { get; set; }
        public DateTime AttendanceDate { get; set; } = DateTime.UtcNow;
    }
}
