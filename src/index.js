document.addEventListener("DOMContentLoaded", () => {
  // Get elements from HTML
  const formSection = document.getElementById("main");
  const inputTask = document.getElementById("task-input");
  const selectPriority = document.getElementById("priority");
  const dueDateInput = document.getElementById("date-input");
  const taskList = document.getElementById("task");
  const sortButton = document.getElementById("sort-btn");

  let tasks = [];

  // Event listener for form submission
  formSection.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get input values
    const taskValue = inputTask.value;
    const priorityValue = selectPriority.value;
    const dueDate = dueDateInput.value;

    // Create a task object
    const task = {
      taskDescription: taskValue,
      priority: priorityValue,
      dueDate: new Date(dueDate),
    };

    // Add task to tasks array
    tasks.push(task);

    // Render the task in the DOM
    renderTasks();

    // Clear the input fields
    inputTask.value = "";
    selectPriority.value = "";
    dueDateInput.value = "";
  });

  // Event listener for sort button click
  sortButton.addEventListener("click", function() {
    sortTasksByPriority();
    renderTasks(); // Re-render the tasks after sorting
  });

  // Function to sort tasks by priority
  function sortTasksByPriority() {
    tasks.sort((a, b) => {
      const priorityLevels = { high: 1, medium: 2, low: 3 };
      return priorityLevels[a.priority] - priorityLevels[b.priority];
    });
  }

  // Function to render tasks in the DOM
  function renderTasks() {
    // Clear the current task list
    taskList.innerHTML = "";

    // Loop through tasks array and add them to the DOM
    tasks.forEach((task) => {
      let newTask = document.createElement("li");
      newTask.textContent = `${task.taskDescription} - Due Date: ${task.dueDate.toLocaleDateString()}`;

      if (task.priority === "high") {
        newTask.classList.add("high-priority");
      } else if (task.priority === "medium") {
        newTask.classList.add("medium-priority");
      } else {
        newTask.classList.add("low-priority");
      }

      let span = document.createElement("span");
      span.innerHTML = "\u00d7";
      newTask.appendChild(span);

      taskList.appendChild(newTask);
    });
  }

  // Delete functionality
  taskList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
    }
  }, false);
});
