using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace SportsTeamManagementSystem.DTOs
{
    public class TeamCreateDto
    {
        [Required]
        public string Name { get; set; }

        public string Description { get; set; }
    }

    public class TeamDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
    }

    public class TeamUpdateDto
    {
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class PlayerDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
    }

    public class TeamDetailsDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public List<PlayerDto> Players { get; set; }
    }
}
