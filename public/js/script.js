// ===============================
// Day 4 - Form Validation
// ===============================

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

        fetch("/blogs", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                title,
                author,
                content
            })

        })

        .then(response => response.json())

        .then(data => {

            message.style.color = "green";
            message.textContent = data.message;

            form.reset();

        })

        .catch(error => {

            console.log(error);

            message.style.color = "red";
            message.textContent = "Something went wrong.";

        });

    });

}


// ===============================
// Day 7 - View Blogs
// ===============================

const blogContainer = document.getElementById("blogContainer");

if (blogContainer) {

    fetch("/blogs")

    .then(response => response.json())

    .then(blogs => {

        if (blogs.length === 0) {

            blogContainer.innerHTML = `
                <h2 style="text-align:center;">
                    No Blogs Available
                </h2>
            `;

            return;

        }

        blogs.forEach(blog => {

            blogContainer.innerHTML += `

                <div class="blog-card">

                    <h3>${blog.title}</h3>

                    <p><strong>Author:</strong> ${blog.author}</p>

                    <p>${blog.content}</p>

                    <button>Read More</button>

                </div>

            `;

        });

    })

    .catch(error => {

        console.log(error);

    });

}