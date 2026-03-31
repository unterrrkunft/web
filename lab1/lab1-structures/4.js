// Два масиви для прикладу
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// 1. Метод concat()
const mergedConcat = arr1.concat(arr2);
console.log("1. concat():", mergedConcat);

// 2. Spread-оператор ...
const mergedSpread = [...arr1, ...arr2];
console.log("2. spread operator:", mergedSpread);

// 3. push() з spread (модифікує arr1)
const arr1Copy = [...arr1]; // створюємо копію, щоб не змінювати оригінал
arr1Copy.push(...arr2);
console.log("3a. push(...arr2):", arr1Copy);

// 3b. push.apply() (старий спосіб)
const arr1Apply = [...arr1]; // копія оригіналу
Array.prototype.push.apply(arr1Apply, arr2);
console.log("3b. push.apply():", arr1Apply);

// 4. concat() з map / обробкою
const mergedMap = arr1.concat(arr2.map(x => x * 2));
console.log("4. concat() + map:", mergedMap);

// 5. Цикл forEach
const mergedLoop = [];
arr1.forEach(el => mergedLoop.push(el));
arr2.forEach(el => mergedLoop.push(el));
console.log("5. forEach loop:", mergedLoop);