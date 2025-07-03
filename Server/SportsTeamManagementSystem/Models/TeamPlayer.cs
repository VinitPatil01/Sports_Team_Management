namespace SportsTeamManagementSystem.Models
{
    public class TeamPlayer
    {
        public int TeamId { get; set; }
        public Team Team { get; set; }
        public int PlayerId { get; set; }
        public User Player { get; set; }
    }
}
