function sentenceToWords(sentence) {
    return sentence.split(' ');
}

const sentence = "Hello world this is JavaScript";
const wordsArray = sentenceToWords(sentence);

console.log(wordsArray);