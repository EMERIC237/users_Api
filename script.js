//function to display all the post of the user on a modal
async function displayPosts(userId, userName) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    const posts = await response.json();
    //get the modal overlay and the modal
    const modalOverlay = document.getElementById("modal-overlay");
    const modal = document.getElementById("modal");
    //get the modal content's div
    const modalContent = document.getElementById("modal-content");
    //get the modal title
    const modalTitle = document.getElementById("modal-title");
    //Add posts to the modal content
    posts.forEach((post) => {
      modalTitle.innerHTML = `<h3>Posts of ${userName}</h3>`;
      modalContent.innerHTML += `
                    <div class="post-container">
                        <p>${post.title}</p>
                        <div>${post.body}</div>
                    </div>
                `;
    });
    //show the modaloverlay and modal
    modalOverlay.style.display = "block";
    modal.style.display = "block";
    //get the close button
    const modalCloseButton = document.getElementById("modal-close-button");
    //add a click event listener to the close span
    modalCloseButton.addEventListener("click", () => {
      //hide the modal
      modalOverlay.style.display = "none";
      modal.style.display = "none";
    });
  } catch (error) {
    window.alert(`could not fetch posts\n\n ${error}`);
  }
}

//Fetch all the users from the database to display them in the table

async function addUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    const tableBody = document.getElementById("users-table-body");
    users.forEach((user) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
                  <td>${user.name}</td>
                  <td>${user.email}</td>
                  <td>${user.phone.split(" ")[0]}</td>
                  <td>${user.address.street}</td>
                
              `;
      //add a cli event listener to the row to display all the post of the user
      tr.addEventListener("click", () => {
        displayPosts(user.id, user.name);
      });
      tableBody.appendChild(tr);
    });
  } catch (error) {
    window.alert(`could not fetch users\n\n ${error}`);
  }
}

addUsers();
