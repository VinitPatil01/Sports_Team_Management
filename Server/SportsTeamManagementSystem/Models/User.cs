using SportsTeamManagementSystem.Models;

public class User
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public byte[] PasswordHash { get; set; }
    public byte[] PasswordSalt { get; set; }
    public string Role { get; set; } = "Player";
    public string? Bio { get; set; } 
    public string? Position { get; set; } 
    public string? ImageUrl { get; set; } 
    public ICollection<TeamPlayer> TeamPlayers { get; set; }
    public ICollection<Attendance> Attendances { get; set; }
    public ICollection<PerformanceStats> PerformanceStats { get; set; }
}