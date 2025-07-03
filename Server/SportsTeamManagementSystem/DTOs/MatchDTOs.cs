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

    public class PlayerMatchDto
    {
        public int Id { get; set; }
        public DateTime MatchDate { get; set; }
        public string Location { get; set; }
        public int HomeTeamId { get; set; }
        public string HomeTeamName { get; set; }
        public int AwayTeamId { get; set; }
        public string AwayTeamName { get; set; }
    }

    public class MatchListDto
    {
        public int Id { get; set; }
        public DateTime MatchDate { get; set; }
        public string Location { get; set; }
        public int HomeTeamId { get; set; }
        public string HomeTeamName { get; set; }
        public int AwayTeamId { get; set; }
        public string AwayTeamName { get; set; }
    }
}
