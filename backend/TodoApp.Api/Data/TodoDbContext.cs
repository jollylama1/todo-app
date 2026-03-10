using Microsoft.EntityFrameworkCore;
using TodoApp.Api.Models;

namespace TodoApp.Api.Data;

public class TodoDbContext : DbContext
{
    public TodoDbContext(DbContextOptions<TodoDbContext> options) : base(options)
    {
    }

    public DbSet<TaskItem> Tasks => Set<TaskItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<TaskItem>(entity =>
        {
            entity.ToTable("tasks");
            entity.HasKey(t => t.Id);

            entity.Property(t => t.Id)
                .HasColumnName("id");

            entity.Property(t => t.Title)
                .HasColumnName("title")
                .HasMaxLength(256)
                .IsRequired();

            entity.Property(t => t.Description)
                .HasColumnName("description")
                .HasMaxLength(2000);

            entity.Property(t => t.DueDate)
                .HasColumnName("due_date")
                .HasColumnType("timestamp with time zone");

            entity.Property(t => t.IsCompleted)
                .HasColumnName("is_completed")
                .HasDefaultValue(false);

            entity.Property(t => t.CompletedAt)
                .HasColumnName("completed_at");

            entity.Property(t => t.CreatedAt)
                .HasColumnName("created_at")
                .HasDefaultValueSql("NOW()");
        });
    }
}

