// Load saved tasks when page opens
console.log("JavaScript loaded");
window.onload = function() {

    loadTasks();

};



// Add new task

function addTask() {

    let input = document.getElementById("taskInput");

    let taskText = input.value.trim();


    if(taskText === "") {

        alert("Please enter a task");

        return;

    }


    let priority = document.getElementById("priority").value;

    let dueDate = document.getElementById("dueDate").value;


    createTask(taskText, false, priority, dueDate);


    saveTasks();


    input.value = "";

}



// Create task element

function createTask(taskText, completed = false, priority = "Medium", dueDate = "") {

    let li = document.createElement("li");


    let span = document.createElement("span");

    span.textContent = taskText;


    if(completed){

        span.classList.add("completed");

    }


    span.onclick = function(){

        span.classList.toggle("completed");


        saveTasks();

updateCounter();

    };



    // Priority label
    let priorityTag = document.createElement("small");

    priorityTag.textContent = priority;



    priorityTag.classList.add("priority");



    if(priority === "High"){

        priorityTag.classList.add("high");

    }

    else if(priority === "Medium"){

        priorityTag.classList.add("medium");

    }

    else{

        priorityTag.classList.add("low");

    }

        // Due date label
    let dateTag = document.createElement("small");

dateTag.classList.add("date");


    if(dueDate){

        dateTag.textContent = "📅 " + dueDate;

    }



    // Edit button
    let editButton = document.createElement("button");

    editButton.textContent = "Edit";



    editButton.onclick = function(){

        let newTask = prompt("Edit task:", span.textContent);


        if(newTask !== null && newTask.trim() !== ""){

            span.textContent = newTask;

            saveTasks();

        }

    };



    // Delete button
    let deleteButton = document.createElement("button");

    deleteButton.textContent = "Delete";

    deleteButton.classList.add("delete-btn");



    deleteButton.onclick = function(){

        li.remove();

        saveTasks();

        updateCounter();

    };



    li.appendChild(span);

li.appendChild(priorityTag);

li.appendChild(dateTag);

li.appendChild(editButton);

li.appendChild(deleteButton);



    document.getElementById("taskList").appendChild(li);

    updateCounter();

}



// Save tasks to browser storage

function saveTasks(){

    let tasks = [];


    document.querySelectorAll("#taskList li").forEach(function(task){


        tasks.push({

            text: task.querySelector("span").textContent,

            completed: task.querySelector("span").classList.contains("completed"),

            priority: task.querySelector(".priority").textContent,

            dueDate: task.querySelector(".date").textContent.replace("📅 ", "")

        });


    });


    localStorage.setItem("tasks", JSON.stringify(tasks));

}





// Load saved tasks

function loadTasks(){

    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];


    savedTasks.forEach(function(task){

        createTask(
            task.text,
            task.completed,
            task.priority,
            task.dueDate
        );

    });

}
// Dark Mode

let darkButton = document.getElementById("darkModeBtn");


darkButton.addEventListener("click", function(){

    document.body.classList.toggle("dark");


    if(document.body.classList.contains("dark")){

        darkButton.textContent = "☀️ Light Mode";

    } else {

        darkButton.textContent = "🌙 Dark Mode";

    }

});
let searchInput = document.getElementById("searchInput");


searchInput.addEventListener("input", function(){

    let searchText = searchInput.value.toLowerCase();


    let tasks = document.querySelectorAll("#taskList li");


    tasks.forEach(function(task){

        let text = task.querySelector("span").textContent.toLowerCase();


        if(text.includes(searchText)){

            task.style.display = "flex";

        } else {

            task.style.display = "none";

        }

    });

});
function updateCounter(){

    let tasks = document.querySelectorAll("#taskList li");

    let total = tasks.length;

    let completed = 0;


    tasks.forEach(function(task){

        if(task.querySelector("span").classList.contains("completed")){

            completed++;

        }

    });


    let remaining = total - completed;


    document.getElementById("totalTasks").textContent = total;

    document.getElementById("completedTasks").textContent = completed;

    document.getElementById("remainingTasks").textContent = remaining;


    let percentage = 0;


    if(total > 0){

        percentage = Math.round((completed / total) * 100);

    }


    document.getElementById("progressBar").style.width = percentage + "%";


    document.getElementById("progressText").textContent =
        percentage + "% Completed";

}
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("./service-worker.js")
            .then(() => {
                console.log("Service Worker registered successfully");
            })
            .catch((error) => {
                console.log("Service Worker registration failed:", error);
            });
    });
}