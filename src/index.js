document.addEventListener("DOMContentLoaded", () => {
  //get the elements form the html content
  const formSection = document.getElementById("main");
  const inputTask = document.getElementById("task-input");
  const selectPriority = document.getElementById("priority");
  const dueDateInput = document.getElementById("date-input");
  const taskList = document.getElementById("task");

  let tasks = [];

  formSection.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskValue = inputTask.value;
    const priorityValue = selectPriority.value;
    const dueDate = dueDateInput.value;


    let newTask = document.createElement("li");
    newTask.textContent = `${taskValue} - Due Date: ${dueDate}`;

    if (priorityValue === "high-priority") {
      newTask.classList.add("high-priority");
    } 
    else if (priorityValue === "medium-priority") {
      newTask.classList.add("medium-priority");
    } 
    else {
      newTask.classList.add("low-priority");
    }

    taskList.appendChild(newTask);  
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    
    newTask.appendChild(span);
    
    tasks.push({
      element: newTask,
      dueDate: new Date(dueDate),
    })

    inputTask.value = "";
    selectPriority.value = "";
    dueDateInput.value = "";

    checkDueDate(); // check for due dates every time a task is added or removed
  });



  taskList.addEventListener("click", (e) => {
    
    if(e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
    }
    else if(e.target.tagName === "SPAN" || e.target.tagName === "I") {
      e.target.parentElement.remove();
    }
  }, false);

  function checkDueDate() {
    const now = new Date();
    
    tasks.forEach(task => {
      if (task.dueDate < now && !task.element.classList.contains('overdue')) {
        alert(`Task "${task.element.textContent}" is overdue!`);
        task.element.classList.add('overdue'); // Mark as overdue
      }
    });
  }

  setInterval(checkDueDate, 30000);
  
});
