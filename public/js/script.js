
console.log("Blog Manager");


const form = document.getElementById("blogForm");

if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const title = document.getElementById("title").value.trim();
        const author = document.getElementById("author").value.trim();
        const content = document.getElementById("content").value.trim();

        const message = document.getElementById("message");

        if (title === "" || author === "" || content === "") {
            message.style.color = "red";
            message.textContent = "Please fill all fields.";
            return;
        }

        message.style.color = "green";
        message.textContent = "Blog added successfully!";
        form.reset();
    });
}