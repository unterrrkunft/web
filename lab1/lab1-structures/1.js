const persons = [
    { name: 'John', age: 23, city: 'Boston' },
    { name: 'Anna', age: 20, city: 'Kyiv' },
    { name: 'Jane', age: 25, city: 'New York' },
    { name: 'Sam', age: 22, city: 'Seoul' },
    { name: 'Joe', age: 21, city: 'Tokyo' }
];

// Додаємо властивості до масиву
persons.groupName = 'A';
persons.teacher = 'Joan Doe';
persons.year = '2023';

console.log("=== Вивід елементів масиву за допомогою for (індексний) ===");
for (let i = 0; i < persons.length; i++) {
    console.log(persons[i]);
}

console.log("\n=== Вивід елементів масиву за допомогою for...of ===");
for (const person of persons) {
    console.log(person);
}

console.log("\n=== Вивід елементів масиву за допомогою forEach ===");
persons.forEach(person => console.log(person));

console.log("\n=== Вивід властивостей масиву за допомогою for...in ===");
for (const key in persons) {
    if (persons.hasOwnProperty(key)) {
        // Перевіряємо, чи це об’єкт чи властивість масиву
        if (typeof persons[key] === 'object') {
            console.log(`${key}: ${JSON.stringify(persons[key])}`);
        } else {
            console.log(`${key}: ${persons[key]}`);
        }
    }
}