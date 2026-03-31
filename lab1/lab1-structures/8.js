const persons = [
    { name: 'John', age: 23, city: 'Boston' },
    { name: 'Anna', age: 20, city: 'Kyiv' },
    { name: 'Jane', age: 25, city: 'New York' },
    { name: 'Sam', age: 22, city: 'Seoul' },
    { name: 'Joe', age: 21, city: 'Tokyo' }
];

// Функція для отримання даних користувача
function getUserData(username) {
    const user = persons.find(person => person.name === username);
    if (user) {
        return user;
    } else {
        throw new Error('Unable to find user');
    }
}

// Функція для показу інформації про користувача
function showUserInfo(username) {
    console.log('Loading');
    try {
        const user = getUserData(username);
        console.log(`User found: Name: ${user.name}, Age: ${user.age}, City: ${user.city}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

// Приклади виклику
console.log('-- Спроба знайти існуючого користувача --');
showUserInfo('Anna');

console.log('-- Спроба знайти неіснуючого користувача --');
showUserInfo('Mike');