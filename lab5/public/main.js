async function init() {
    const mainDiv = document.getElementById('main');

    // --- Структура ---
    const header = document.createElement('header');
    const main = document.createElement('main');
    const footer = document.createElement('footer');
    mainDiv.append(header, main, footer);

    // --- Колонки ---
    const leftPanel = document.createElement('div'); leftPanel.id = 'leftPanel';
    const content = document.createElement('div'); content.id = 'content';
    const rightPanel = document.createElement('div'); rightPanel.id = 'rightPanel';
    main.append(leftPanel, content, rightPanel);

    // ================= API =================
    async function fetchUsers() {
        const res = await fetch('/users');
        return await res.json();
    }

    async function getNewUsers() {
        const res = await fetch('/new-users');
        return await res.json();
    }

    async function getGallery() {
        const res = await fetch('/gallery');
        return await res.json();
    }

    async function getWeather() {
        const res = await fetch('/weather');
        return await res.json();
    }

    // ================= LEFT PANEL =================
    const input = document.createElement('input'); input.placeholder = 'Search...';
    const searchBtn = document.createElement('button'); searchBtn.textContent = 'Search';
    leftPanel.append(input, searchBtn);

    searchBtn.onclick = () => {
        const value = input.value.toLowerCase();
        document.querySelectorAll('#content table tbody tr').forEach(row => {
            row.classList.toggle('highlight', row.innerText.toLowerCase().includes(value));
        });
    };

    const weatherBox = document.createElement('div');
    weatherBox.style.border = '1px solid #ccc';
    weatherBox.style.padding = '10px';
    weatherBox.style.marginTop = '10px';
    weatherBox.style.borderRadius = '6px';
    leftPanel.appendChild(weatherBox);

    async function updateWeather() {
        const data = await getWeather();
        weatherBox.textContent = `Weather: ${data.city}, ${data.temperature}°C`;
    }
    updateWeather();
    setInterval(updateWeather, 60000);

    // ================= RIGHT PANEL =================
    const rightStatus = document.createElement('div');
    rightStatus.textContent = 'Waiting for data';
    rightPanel.appendChild(rightStatus);

    // ================= FOOTER =================
    const currentUsers = document.createElement('div');
    const newUsersDiv = document.createElement('div');

    async function updateFooter() {
        const newUsers = await getNewUsers();
        currentUsers.textContent = `Current users: 20`;
        newUsersDiv.textContent = `New users: ${newUsers.map(u => u.firstname).join(', ')}`;
    }
    await updateFooter();
    footer.append(currentUsers, newUsersDiv);

    // ================= CONTENT =================
    const h2 = document.createElement('h2');
    h2.textContent = 'Content';    // Відразу при відкритті пише Content
    h2.style.textAlign = 'center';
    content.appendChild(h2);

    showNoUsers();
    addGetUsersButton();

    // ================= TABLE =================
    const editCheckbox = document.createElement('input');
    editCheckbox.type = 'checkbox';
    const editLabel = document.createElement('label');
    editLabel.textContent = ' Edit table';
    editLabel.prepend(editCheckbox);
    rightPanel.appendChild(editLabel);

    editCheckbox.onchange = () => {
        // Робимо так, щоб чекбокс працював тільки на Content та User Rating
        const currentTab = h2.textContent;
        if ((currentTab !== 'Content' && currentTab !== 'User Rating') || lastUsersData.length === 0) {
            editCheckbox.checked = false; // відмічаємо, але не виконуємо
            return;
        }
        renderTable(lastUsersData);
    };

    // ================= HEADER =================
    const pages = ['User Rating', 'News', 'Contacts', 'About', 'Gallery'];
    let tableDisplayed = false;
    let lastUsersData = [];
    let sortColumn = null;
    let sortOrder = 'asc';

    pages.forEach(p => {
        const btn = document.createElement('button');
        btn.textContent = p;

        btn.onclick = async () => {
            let h2 = content.querySelector('h2');
            if (!h2) {
                h2 = document.createElement('h2');
                content.prepend(h2);
            }
            h2.textContent = p;
            h2.style.textAlign = 'center';

            clearContent();

            if (p === 'User Rating') {
                if (!tableDisplayed) {
                    showNoUsers();
                    addGetUsersButton();
                    rightStatus.textContent = 'Waiting for data';
                } else {
                    renderTable(lastUsersData);
                }
                return;
            }

            if (p === 'News' || p === 'Contacts' || p === 'About') {
                const div = document.createElement('div');
                div.textContent = `Content for ${p}.`;
                content.appendChild(div);
                return;
            }

            if (p === 'Gallery') {
                const images = await getGallery();
                const gallery = document.createElement('div');
                gallery.style.display = 'grid';
                gallery.style.gridTemplateColumns = 'repeat(3, 1fr)';
                gallery.style.gap = '10px';
                images.forEach(img => {
                    const el = document.createElement('img');
                    el.src = '/gallery/' + img;
                    el.style.width = '100%';
                    gallery.appendChild(el);
                });
                content.appendChild(gallery);
            }
        };
        header.appendChild(btn);
    });

    // ================= GET USERS =================
    function addGetUsersButton() {
        const old = document.getElementById('getUsersBtn');
        if (old) old.remove();

        const btn = document.createElement('button');
        btn.id = 'getUsersBtn';
        btn.textContent = 'Get Users';
        content.appendChild(btn);

        btn.onclick = async () => {
            removeNoUsers();
            const wait = document.createElement('div');
            wait.textContent = 'Waiting for data';
            content.appendChild(wait);

            const data = await fetchUsers();
            lastUsersData = data;

            wait.remove();
            renderTable(data);
            updateScore(data);

            tableDisplayed = true;
            btn.remove();
        };
    }

    function renderTable(data) {
        const old = document.querySelector('#content table');
        if (old) old.remove();

        const table = document.createElement('table');

        const headers = ['lastname', 'firstname', 'score'];
        let headHtml = '<tr>';
        headers.forEach(col => {
            headHtml += `<th style="cursor:pointer" data-col="${col}">${col.charAt(0).toUpperCase() + col.slice(1)}</th>`;
        });
        if (editCheckbox.checked) headHtml += '<th>Delete</th>';
        headHtml += '</tr>';

        table.innerHTML = `<thead>${headHtml}</thead><tbody></tbody>`;
        const tbody = table.querySelector('tbody');

        function sortData(col) {
            if (sortColumn === col) {
                sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
            } else {
                sortColumn = col;
                sortOrder = 'asc';
            }
            lastUsersData.sort((a, b) => {
                if (a[col] < b[col]) return sortOrder === 'asc' ? -1 : 1;
                if (a[col] > b[col]) return sortOrder === 'asc' ? 1 : -1;
                return 0;
            });
        }

        table.querySelectorAll('th[data-col]').forEach(th => {
            th.onclick = () => {
                sortData(th.dataset.col);
                renderTable(lastUsersData);
                updateScore(lastUsersData);
            };
        });

        data.forEach((u, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${u.lastname}</td>
                <td>${u.firstname}</td>
                <td>${u.score}</td>
            `;
            if (editCheckbox.checked) {
                const td = document.createElement('td');
                const del = document.createElement('button');
                del.textContent = 'Delete';
                del.onclick = () => {
                    lastUsersData.splice(index, 1);
                    renderTable(lastUsersData);
                    updateScore(lastUsersData);
                };
                td.appendChild(del);
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        });

        content.appendChild(table);
    }

    function updateScore(data) {
        rightPanel.innerHTML = '';
        const sum = document.createElement('div');
        sum.textContent = `Total score: ${data.reduce((a, b) => a + b.score, 0)}`;
        rightPanel.appendChild(sum);
        rightPanel.appendChild(editLabel);
    }

    function showNoUsers() {
        const div = document.createElement('div');
        div.id = 'noUsers';
        div.textContent = 'No users';
        content.appendChild(div);
    }

    function removeNoUsers() {
        const el = document.getElementById('noUsers');
        if (el) el.remove();
    }

    function clearContent() {
        const elements = content.querySelectorAll('*:not(h2)');
        elements.forEach(el => el.remove());
    }
}