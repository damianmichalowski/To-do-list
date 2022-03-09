{
    let tasks = [];
    let hideButtonValue = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];

        render();

        document.querySelector(".js-newTask").focus();
    };

    const removeTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1),
        ];

        render();
    };

    const toggleDoneTask = (index) => {

        tasks = [
            ...tasks.slice(0, index),
            {
                ...tasks[index],
                done: !tasks[index].done,
            },
            ...tasks.slice(index + 1),
        ];

        render();
    };

    const toggleHideButtonValue = () => {
        hideButtonValue = !hideButtonValue;

        render();
    };

    const markAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

        render();
    };

    const renderTasks = () => {
        const htmlTaskString = task => `
           <li class="list__item ${hideButtonValue && task.done ? "list__item--hidden" : ""}">
           <button class="list__button list__buttonDone js-done">${task.done ? "✔" : ""}</button>
           <p class="list__itemContent ${task.done ? "list__itemContent--done" : ""}">${task.content}</p>
           <button class="list__button list__buttonRemove js-remove">🗑</button>
           </li>
            `;

        document.querySelector(".js-list").innerHTML = tasks.map(htmlTaskString).join("");
    };

    const bindTasksEvenets = () => {
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

    const renderButtons = () => {
        const buttons = document.querySelector(".js-buttons");

        if (!tasks.length) {
            buttons.innerHTML = "";
            return;
        }

        buttons.innerHTML = `
        <button class="buttons__button js-hideButton">
        ${hideButtonValue ? "Pokaż" : "Ukryj"} ukończone
        </button>
        <button class="buttons__button js-completeButton"
        ${tasks.every(({ done }) => done) ? "disabled" : ""}
        >
        Ukończ wszystkie
        </button>
        `;
    };

    const bindButtonsEvenets = () => {
        const hideButton = document.querySelector(".js-hideButton");

        if (hideButton) {
            hideButton.addEventListener("click", toggleHideButtonValue);
        };

        const completeButton = document.querySelector(".js-completeButton");

        if (completeButton) {
            completeButton.addEventListener("click", markAllTasksDone);
        };
    };

    const render = () => {
        renderTasks();
        bindTasksEvenets();
        renderButtons();
        bindButtonsEvenets();
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