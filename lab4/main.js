function init() {
  const mainDiv = document.getElementById(`main`);

  mainDiv.innerHTML = `
        <header id="header"></header>
        <main>
            <div id="leftPanel"><div class="loader"></div></div>
            <div id="content"><div class="loader"></div></div>
            <div id="rightPanel"><div class="loader"></div></div>
        </main>
        <footer id="footer"></footer>
    `;

  const header = document.getElementById(`header`);
  const footer = document.getElementById(`footer`);
  const content = document.getElementById(`content`);
  const left = document.getElementById(`leftPanel`);
  const right = document.getElementById(`rightPanel`);

  [`User Rating`, `News`, `Contacts`, `About`].forEach((text) => {
    const btn = document.createElement(`button`);
    btn.innerText = text;
    btn.onclick = () => (content.innerHTML = `<h2>${text}</h2>`);
    header.appendChild(btn);
  });

  footer.innerHTML = `
        <div>Active users: ${Math.floor(Math.random() * 100)}</div>
        <div>New: ${api
          .getNewUsers()
          .map((u) => u.firstname + ` ` + u.lastname)
          .join(`, `)}</div>
    `;

  setTimeout(() => {
    content.innerHTML = `<h2>Content</h2><p>No users</p><button id="getUsers">Get Users</button>`;
    document.getElementById(`getUsers`).onclick = loadUsers;

    left.innerHTML = `<input type="text" id="search" placeholder="Search..."><button id="searchBtn">Find</button>`;
    document.getElementById(`searchBtn`).onclick = searchTable;

    right.innerHTML = `<div>Total Score: <span id="totalScore">0</span></div>
                           <label><input type="checkbox" id="editTable"> Edit table</label>`;
    document.getElementById(`editTable`).onchange = toggleDeleteColumn;
  }, 1000);
}

let currentUsers = [];

async function loadUsers() {
  const content = document.getElementById(`content`);
  content.innerHTML = `<div class="loader"></div>`;
  currentUsers = await api.fetchUsers();
  renderTable(currentUsers);
  updateScore();
}

function renderTable(users) {
  const showDelete = document.getElementById(`editTable`)?.checked;
  let html = `<h2>Users</h2><table><thead><tr>
        <th onclick="sortTable()">Lastname</th><th>Firstname</th><th>Score</th>
        ${showDelete ? `<th>Action</th>` : ``}
    </tr></thead><tbody>`;

  users.forEach((u, i) => {
    html += `<tr>
            <td>${u.lastname}</td><td>${u.firstname}</td><td>${u.score}</td>
            ${showDelete ? `<td><button onclick="deleteRow(${i})">Delete</button></td>` : ``}
        </tr>`;
  });
  html += `</tbody></table>`;
  document.getElementById(`content`).innerHTML = html;
}

function updateScore() {
  const total = currentUsers.reduce((sum, u) => sum + u.score, 0);
  if (document.getElementById(`totalScore`))
    document.getElementById(`totalScore`).innerText = total;
}

function deleteRow(index) {
  currentUsers.splice(index, 1);
  renderTable(currentUsers);
  updateScore();
}

function toggleDeleteColumn() {
  renderTable(currentUsers);
}

function sortTable() {
  currentUsers.sort((a, b) => a.lastname.localeCompare(b.lastname));
  renderTable(currentUsers);
}

function searchTable() {
  const val = document.getElementById(`search`).value.toLowerCase();
  document.querySelectorAll(`tbody tr`).forEach((tr) => {
    tr.classList.toggle(
      `highlight`,
      val && tr.innerText.toLowerCase().includes(val),
    );
  });
}

init();