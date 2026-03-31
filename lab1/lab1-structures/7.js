const persons = [
    { name: 'John', age: 23, city: 'Boston' },
    { name: 'Anna', age: 20, city: 'Kyiv' },
    { name: 'Jane', age: 25, city: 'New York' },
    { name: 'Sam', age: 22, city: 'Seoul' },
    { name: 'Joe', age: 21, city: 'Tokyo' }
];

// Деструктуризація об'єкта
const { name, city } = persons[0];
console.log(name); // John
console.log(city); // Boston

// Деструктуризація масиву
const [firstPerson] = persons;
console.log(firstPerson); 