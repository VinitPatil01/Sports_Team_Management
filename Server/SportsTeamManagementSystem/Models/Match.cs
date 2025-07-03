namespace SportsTeamManagementSystem.Models
{
    public class Match
    {
        public int Id { get; set; }
        public DateTime MatchDate { get; set; }
        public string Location { get; set; }
        public int HomeTeamId { get; set; }
        public Team HomeTeam { get; set; }
        public int AwayTeamId { get; set; }
        public Team AwayTeam { get; set; }

        public ICollection<Attendance> Attendances { get; set; }
        public ICollection<PerformanceStats> PerformanceStats { get; set; }
    }
}
