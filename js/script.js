{
    tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
        render();
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
            <li class="section__listItem ${task.done ? "section__listItem--done" : ""}"
            >

            <span class="button__span"><button class="button js-done">${task.done ? "✔️" : ""}</button></span>
            <span class="section__listContent">${task.content}</span>
            <span class="button__span"><button class="button button--remove js-remove">🗑️</button></span>
            </li>
            `
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;

        eventListeners();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        
        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        
        if (newTaskContent === "") {
            document.querySelector(".form__field").focus();
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