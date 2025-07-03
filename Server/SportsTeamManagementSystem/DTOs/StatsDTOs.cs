namespace SportsTeamManagementSystem.DTOs
{
    public class PerformanceStatsDto
    {
        public int PlayerId { get; set; }
        public int MatchId { get; set; }
        public int Goals { get; set; }
        public int Assists { get; set; }
        public int Fouls { get; set; }
        public int MinutesPlayed { get; set; }
    }

    public class PlayerStatsInTeamDto
    {
        public int Id { get; set; }
        public int PlayerId { get; set; }
        public string Username { get; set; }
        public int Goals { get; set; }
        public int Assists { get; set; }
        public int Fouls { get; set; }
        public int MinutesPlayed { get; set; }
    }

    public class TeamStatsSummaryDto
    {
        public int TeamId { get; set; }
        public string TeamName { get; set; }
        public int TotalGoals { get; set; }
        public int TotalAssists { get; set; }
        public int TotalFouls { get; set; }
        public int TotalMinutesPlayed { get; set; }
    }

    public class PerformanceStatsUpdateDto
    {
        public int Id { get; set; }
        public int PlayerId { get; set; }
        public int MatchId { get; set; }
        public int Goals { get; set; }
        public int Assists { get; set; }
        public int Fouls { get; set; }
        public int MinutesPlayed { get; set; }
    }
}
