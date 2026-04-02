const person = {
    name: "John",
    age: 25
};

function greet(greeting, punctuation) {
    console.log(`${greeting}, ${this.name}${punctuation}`);
}

greet.call(person, "Hello", "!");

greet.apply(person, ["Hi", "!!"]);

const greetJohn = greet.bind(person, "Hey");
greetJohn("?");
