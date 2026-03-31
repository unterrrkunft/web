function reverseWord(word) {
    return word.split('').reverse().join('');
}

const word = "Hello";
console.log(reverseWord(word));