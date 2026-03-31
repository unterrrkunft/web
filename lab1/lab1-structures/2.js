// 1. Створюємо об’єкти
const defaults = {
    mode: 'test',
    debugLevel: 'error',
    logFolder: 'root'
};

const userSetting = {
    mode: 'production',
    debugLevel: 'trace'
};

// Спосіб 1: Object.assign
function mergeSettings1(defaults, userSetting) {
    // Object.assign копіює властивості з правого об'єкта поверх лівого
    return Object.assign({}, defaults, userSetting);
}

const merged1 = mergeSettings1(defaults, userSetting);
console.log("Object.assign:", merged1);

// Спосіб 2: Spread-оператор
function mergeSettings2(defaults, userSetting) {
    // Спред-оператор робить копію властивостей об’єктів
    return { ...defaults, ...userSetting };
}

const merged2 = mergeSettings2(defaults, userSetting);
console.log("Spread operator:", merged2);

// Спосіб 3: Цикл for...in
function mergeSettings3(defaults, userSetting) {
    const result = {};

    // Спершу копіюємо defaults
    for (const key in defaults) {
        if (defaults.hasOwnProperty(key)) {
            result[key] = defaults[key];
        }
    }

    // Потім копіюємо userSetting (перезаписує властивості, якщо вони дублюються)
    for (const key in userSetting) {
        if (userSetting.hasOwnProperty(key)) {
            result[key] = userSetting[key];
        }
    }

    return result;
}

const merged3 = mergeSettings3(defaults, userSetting);
console.log("for...in loop:", merged3);