/**
 * REPOSITORY SIMULATOR
 */
const Repository = (function () {
    const _db = {
        'app-root': { id: 'app-root', size: 100, content: '111', deps: ['auth-mod', 'ui-lib'] },
        'auth-mod': { id: 'auth-mod', size: 50, content: '222', deps: ['crypto-utils'] },
        'ui-lib': { id: 'ui-lib', size: 200, content: '333', deps: ['icon-set', 'canvas-api'] },
        'crypto-utils': { id: 'crypto-utils', size: 30, content: '444', deps: ['wasm-core'] },
        'canvas-api': { id: 'canvas-api', size: 80, content: '555', deps: ['wasm-core'] },
        'icon-set': { id: 'icon-set', size: 20, content: '666', deps: [] },
        'wasm-core': { id: 'wasm-core', size: 500, content: '777', deps: [] },
    };

    return {
        getScriptInfo: (id) => new Promise((resolve, reject) => {
            console.log(`API Request: ${id}`);
            const isServerDown = Math.random() < 0.01;
            setTimeout(() => {
                if (isServerDown) return reject(new Error('Server is unavailable'));
                _db[id] ? resolve(_db[id]) : reject(new Error(`Script ${id} not found.`));
            }, 1000 + Math.random() * 3000);
        })
    };
})();

/**
 * TASK 2: loadScripts
 * Goal: Return flat unique array of { id, content }
 */
async function loadScripts(ids) {
    const visited = new Set();
    const result = [];

    async function dfs(id) {
        if (visited.has(id)) return;
        visited.add(id);

        const script = await Repository.getScriptInfo(id);

        // додаємо у результат
        result.push({ id: script.id, content: script.content });

        // паралельно обробляємо залежності
        await Promise.all(
            script.deps.map(dep => dfs(dep))
        );
    }

    // запускаємо для всіх entry points
    await Promise.all(ids.map(id => dfs(id)));

    return result;
}


/**
 * TEST RUNNER
 */
async function runTest() {
    console.log("Loading scripts for ['app-root']...\n");

    try {
        const scripts = await loadScripts(['app-root']);

        console.log("\n--- RESULT ---");
        console.log(scripts);

        console.log(`\nTotal scripts loaded: ${scripts.length}`);

    } catch (e) {
        console.error(`\nTEST CRASHED: ${e.message}`);
    }
}

runTest();