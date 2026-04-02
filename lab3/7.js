const users = [
    { id: 0, name: 'John', age: 23, city: 'Boston' },
    { id: 1, name: 'Anna', age: 20, city: 'Kyiv' },
    { id: 2, name: 'Jane', age: 25, city: 'New York' },
    { id: 3, name: 'Sam', age: 22, city: 'Seoul' }
];

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = users.find(u => u.id === id);

            if (user) {
                resolve(user);
            } else {
                reject(new Error(`User with id ${id} not found`));
            }
        }, 1000);
    });
}

function loadUsers(ids) {
    const promises = ids.map(id => getUser(id));

    return Promise.allSettled(promises)
        .then(results => {
            const foundUsers = [];

            results.forEach(result => {
                if (result.status === "fulfilled") {
                    foundUsers.push(result.value);
                } else {
                    console.log(result.reason.message);
                }
            });

            return foundUsers;
        });
}

async function showUsers(ids) {
    console.log("loading");

    try {
        const result = await loadUsers(ids);
        console.log(result);
    } catch (error) {
        console.log(error.message);
    } finally {
        console.log("loading finished");
    }
}

showUsers([0, 1, 5, 2]);
