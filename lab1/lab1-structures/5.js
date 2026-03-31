const persons = [
    { name: 'John', age: 23, city: 'Boston' },
    { name: 'Anna', age: 20, city: 'Kyiv' },
    { name: 'Jane', age: 25, city: 'New York' },
    { name: 'Sam', age: 22, city: 'Seoul' },
    { name: 'Joe', age: 21, city: 'Tokyo' }
];

// Поточний рік
const currentYear = new Date().getFullYear();

// Перетворення у масив текстових фрагментів
const textFragments = persons.map(person => {
    const birthYear = currentYear - person.age;
    return `${person.name} from ${person.city} born in ${birthYear}`;
});

// Перевірка результату
console.log(textFragments);