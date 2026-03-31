const persons = [
    { name: 'John', age: 23, city: 'Boston' },
    { name: 'Anna', age: 20, city: 'Kyiv' },
    { name: 'Jane', age: 25, city: 'New York' },
    { name: 'Sam', age: 22, city: 'Seoul' },
    { name: 'Joe', age: 21, city: 'Tokyo' }
];

// Фільтруємо людей старше 20 років
const olderThan20 = persons.filter(person => person.age > 20);

// Вивід кожного об’єкта
olderThan20.forEach(person => console.log(person));