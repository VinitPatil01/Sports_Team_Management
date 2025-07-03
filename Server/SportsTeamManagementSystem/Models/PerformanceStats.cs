namespace SportsTeamManagementSystem.Models
{
    public class PerformanceStats
    {
        public int Id { get; set; }
        public int PlayerId { get; set; }
        public User Player { get; set; }
        public int MatchId { get; set; }
        public Match Match { get; set; }
        public int Goals { get; set; }
        public int Assists { get; set; }
        public int Fouls { get; set; }
        public int MinutesPlayed { get; set; }
    }
}
