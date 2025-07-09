using Microsoft.EntityFrameworkCore;
using gymfit_backend.Models;

namespace gymfit_backend.Data
{
    public class GymFitContext : DbContext
    {
        public GymFitContext(DbContextOptions<GymFitContext> options) : base(options) {}

        public DbSet<User> Users { get; set; }
        public DbSet<Trainer> Trainers { get; set; }
    }
}