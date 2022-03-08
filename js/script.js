{
    const tasks = [];
    

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
        render();
        document.querySelector(".js-newTask").focus();
    };

    const removeTask = (index) => {
        tasks.splice(index, 1);
        render ();
    };

    const toggleDoneTask = (index) => {
        tasks[index].done = !tasks[index].done;
        render();
    };

    const eventListeners = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const doneButtons = document.querySelectorAll(".js-done");

        doneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                toggleDoneTask(index);
            });
        });
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list__item">
            <button class="list__button list__buttonDone js-done">${task.done ? "✔" : ""}</button>
            <p class="list__itemContent ${task.done ? "list__itemContent--done" : ""}">${task.content}</p>
            <button class="list__button list__buttonRemove js-remove">🗑</button>
            </li>
            `
        };

        document.querySelector(".js-list").innerHTML = htmlString;

        eventListeners();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        
        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        
        if (newTaskContent === "") {
            document.querySelector(".js-newTask").focus();
            return;
        }
        
        addNewTask(newTaskContent);
        document.querySelector(".js-newTask").value = "";
    };

    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
}