namespace SportsTeamManagementSystem.DTOs
{
    public class MatchCreateDto
    {
        public DateTime MatchDate { get; set; }
        public string Location { get; set; }
        public int HomeTeamId { get; set; }
        public int AwayTeamId { get; set; }
    }

    public class MatchDto
    {
        public int Id { get; set; }
        public DateTime MatchDate { get; set; }
        public string Location { get; set; }
        public int HomeTeamId { get; set; }
        public int AwayTeamId { get; set; }
    }

    public class MatchUpdateDto
    {
        public int Id { get; set; }
        public DateTime MatchDate { get; set; }
        public string Location { get; set; }
        public int HomeTeamId { get; set; }
        public int AwayTeamId { get; set; }
    }
}
