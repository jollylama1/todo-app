using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApp.Api.Data;
using TodoApp.Api.Models;

namespace TodoApp.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly TodoDbContext _dbContext;

    public TasksController(TodoDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    // 1. Display a list of tasks
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasks()
    {
        // Placeholder implementation: returns all tasks from the database.
        // You can refine filtering, ordering, and DTOs later.
        var tasks = await _dbContext.Tasks
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();

        return Ok(tasks);
    }

    // 2. Add a new task
    public class CreateTaskRequest
    {
        public string Title { get; set; } = string.Empty;
    }

    [HttpPost]
    public async Task<ActionResult<TaskItem>> CreateTask([FromBody] CreateTaskRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Title))
        {
            return BadRequest("Title is required.");
        }

        var task = new TaskItem
        {
            Title = request.Title
        };

        _dbContext.Tasks.Add(task);
        await _dbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTasks), new { id = task.Id }, task);
    }

    // 3. Mark a task as complete
    [HttpPut("{id:int}/complete")]
    public async Task<ActionResult<TaskItem>> MarkComplete(int id)
    {
        var task = await _dbContext.Tasks.FindAsync(id);

        if (task is null)
        {
            return NotFound();
        }

        if (!task.IsCompleted)
        {
            task.IsCompleted = true;
            await _dbContext.SaveChangesAsync();
        }

        return Ok(task);
    }
}

