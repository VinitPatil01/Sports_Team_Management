Goal: Generate a full-stack application with:

Frontend: React + Tailwind CSS

Backend: ASP.NET Core (.NET 7/8) with Entity Framework Core for database operations

Based on the following API specification.

🔐 Authentication & Authorization APIs
POST /api/auth/register — Register player/admin

POST /api/auth/login — Login with credentials

POST /api/auth/logout — Invalidate session/token

GET /api/auth/me — Get current user profile

Roles: Player, Admin

👤 User Profile Management
GET /api/users/{id} — Get user profile

PUT /api/users/{id} — Update profile (bio, position, image)

GET /api/users — List all users (admin-only)

🏆 Team Management
POST /api/teams — Create team (admin-only)

GET /api/teams — Get all teams

GET /api/teams/{id} — Team details

PUT /api/teams/{id} — Edit team

DELETE /api/teams/{id} — Delete team

➕ Team Membership
POST /api/teams/{teamId}/add-player — Add player

DELETE /api/teams/{teamId}/remove-player/{playerId} — Remove player

GET /api/teams/{teamId}/players — List players in a team

📅 Match Scheduling & Management
POST /api/matches — Schedule new match

GET /api/matches — List matches

GET /api/matches/{id} — Match details

PUT /api/matches/{id} — Update match

DELETE /api/matches/{id} — Cancel match

🧾 Attendance Tracking
POST /api/attendance — Mark attendance

GET /api/attendance?teamId=X&date=YYYY-MM-DD — Get attendance list

GET /api/attendance/player/{playerId} — View individual attendance

📊 Performance Statistics
POST /api/stats — Add performance stats (admin-only)

GET /api/stats/player/{id} — Player performance summary

GET /api/stats/team/{id} — Team performance overview

Stats include: goals, assists, fouls, minutes played, etc.

📌 Requirements for the codebase:
Frontend (React + Tailwind):

Pages and reusable components for authentication (login/register), user profile, team CRUD, match scheduling, attendance tracking, and performance statistics.

Forms for CRUD operations, with client-side validation.

Routing with React Router.

State management with Redux or Context API.

Responsive design with Tailwind.

Backend (ASP.NET Core):

REST API controllers matching the endpoints above.

Models and Entity Framework Core migrations for:

User (with role: Player, Admin)

Team

Match

Attendance

PerformanceStats

Authentication with JWT-based tokens.

Authorization for role-based access control (e.g., admin-only routes).

Database: SQL Server (or SQLite for local dev).

Dependency Injection, Repository Pattern, and AutoMapper (if needed).

General:

Seed sample data for players, admins, teams, and matches.

API documentation with Swagger.

.env-based configuration for DB connection strings.