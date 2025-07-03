using AutoMapper;
using SportsTeamManagementSystem.DTOs;
using SportsTeamManagementSystem.Models;

namespace SportsTeamManagementSystem.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserProfileDto>();
            CreateMap<TeamCreateDto, Team>();
            CreateMap<Team, TeamDto>();
            CreateMap<MatchCreateDto, Match>();
            CreateMap<Match, MatchDto>();
        }
    }
}
