const persons = [
    { name: 'John', age: 23, city: 'Boston' },
    { name: 'Anna', age: 20, city: 'Kyiv' },
    { name: 'Jane', age: 25, city: 'New York' },
    { name: 'Sam', age: 22, city: 'Seoul' },
    { name: 'Joe', age: 21, city: 'Tokyo' }
];

// Додаємо гетер birthYear для кожного об'єкта
persons.forEach(person => {
    Object.defineProperty(person, 'birthYear', {
        get() {
            return new Date().getFullYear() - this.age;
        },
        enumerable: true,
        configurable: false
    });
});

// Вивід інформації про кожну особу та рік народження
persons.forEach(person => {
    console.log(`${person.name} народився у ${person.birthYear}`);
});