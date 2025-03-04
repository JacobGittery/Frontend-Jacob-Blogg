// Array and objects for blog posts (acts as a database)
const blogPosts = [
    {
        "title": "Min coola post",
        "likes": 100,
        "content": "Jag har gjort en tuff post, fint va?",
        "user": "tuffGrabb66@minmail.se",
        "date": "2011/1/11 12:07"
    },
    {
        "title": "Min coola post 2",
        "likes": 5,
        "content": "Jag har gjort en ny tuff post, fint va?",
        "user": "tuffGrabb66@minmail.se",
        "date": "2011/1/11 12:08"
    },
];


//----------- PROCESS POSTS FUNCTION ----------


function processPosts() {
    // Get main post section where all the post will be placed
    const postSection = document.getElementById('postSection');
    postSection.innerHTML = null;

    // Loop through the blogPosts array and print each post
    blogPosts.forEach((data, index) => {
        const parentPostBody = document.createElement('div');
        parentPostBody.classList.add('parentPostBody');

        //-- Add Header for post title and likes --
        const postHeader = document.createElement('div');
        postHeader.classList.add('postHeader');
        parentPostBody.appendChild(postHeader);

        const postTitle = document.createElement('h3');
        postTitle.textContent = data.title;
        postHeader.appendChild(postTitle);

        const likeBody = document.createElement("div");
        likeBody.classList.add('likesBody');
        postHeader.appendChild(likeBody);

        const likesText = document.createElement("span");
        likesText.classList.add('likesText');
        likesText.textContent = `${data.likes}`;
        likeBody.appendChild(likesText);

        const likeButton = document.createElement("button");
        likeButton.classList.add('likesButton');
        likeButton.textContent = "🔥";
        likeBody.append(likeButton);

        likeButton.addEventListener("click", () => {
            data.likes += 1;
            likesText.textContent = `${data.likes}`;
        });

        //-- Main post element --
        const postText = document.createElement('p');
        postText.textContent = data.content;
        postText.classList.add('postText');
        parentPostBody.appendChild(postText);

        //-- Adding footer for usermail, delete and date --
        const postFooter = document.createElement('div');
        postFooter.classList.add('postFooter');
        parentPostBody.appendChild(postFooter);

        const postUser = document.createElement('p');
        postUser.classList.add('postUser');
        postUser.textContent = `Posted by: ${data.user}`;
        postFooter.appendChild(postUser);

        const postDate = document.createElement('p');
        postDate.classList.add('postDate');
        postDate.textContent = data.date;
        postFooter.appendChild(postDate);

        const deleteButton = document.createElement("button");
        deleteButton.classList.add('deleteButton');
        const icon = document.createElement("i");
        icon.classList.add("fa", "fa-trash-o");
        deleteButton.textContent = "Delete";
        deleteButton.append(icon);
        postFooter.append(deleteButton);

        deleteButton.addEventListener("click", () => {
            deleteIndex = index
            deletePost(deleteIndex);
        });

        //-- Add the entire post to the post section, before the last  --
        postSection.prepend(parentPostBody);
    });
}


// ------------- MISC FUNCTIONS ------------

// Delete function, called from delete button
function deletePost(deleteIndex) {
    delete blogPosts[deleteIndex];
    processPosts();
}


// Function to add proper format to hours and minutes
function addZeroToTime(i) {
    if (i < 10) {i = `0${i}`}
    return i;
  }


// -------------- END FUNCTIONS -------------


// Calls for dummy data to be added to the blog
processPosts();

// ------------------- CLICK TO POST EVENT ------------------------------
document.getElementById('inputForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the values from the form
    const title = document.getElementById('inputTitle').value;
    const user = document.getElementById('inputUser').value;
    const content = document.getElementById('inputContent').value;



    // Fetch date
    const currentDate = new Date();

    // get "raw" minutes and hours
    const getHours = currentDate.getHours()
    const getMinutes = currentDate.getMinutes()

    // Pick up and piece together the various date elements
    const day = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const hours = addZeroToTime(getHours);
    const minutes = addZeroToTime(getMinutes);
    const date = `${year}/${month+1}/${day} ${hours}:${minutes}`;

    // Create a new post object
    const newPost = {
        title: title,
        likes: 0,
        content: content,
        user: user,
        date: date
    };

    // Append the new post to the blogPosts array
    blogPosts.push(newPost);

    // Re-process the posts from the array, with new post appended
    processPosts();

    // Clear the form after
    document.getElementById('inputTitle').value = '';
    document.getElementById('inputUser').value = '';
    document.getElementById('inputContent').value = '';
});

