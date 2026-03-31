function replaceWord(text, oldWord, newWord) {
    return text.replaceAll(oldWord, newWord);
}

const sentence = "I like JavaScript. JavaScript is fun.";
const newSentence = replaceWord(sentence, "JavaScript", "Python");

console.log(newSentence);