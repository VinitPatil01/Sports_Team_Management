namespace SportsTeamManagementSystem.Models
{
    public class Attendance
    {
        public int Id { get; set; }
        public int PlayerId { get; set; }
        public User Player { get; set; }
        public int MatchId { get; set; }
        public Match Match { get; set; }
        public bool IsPresent { get; set; }
        public DateTime AttendanceDate { get; set; } = DateTime.UtcNow;
    }
}
