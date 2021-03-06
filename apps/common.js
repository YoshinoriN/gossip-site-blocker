const ChromeStorage = {
    async load(keys) {
        // @ts-ignore
        return new Promise((resolve) => {
            chrome.storage.local.get(keys, resolve);
        });
    },
    async save(items) {
        return new Promise((resolve) => {
            chrome.storage.local.set(items, resolve);
        });
    },
    async get(keys) {
        return new Promise((resolve) => {
            chrome.storage.local.get(keys, resolve);
        });
    },
    async set(items) {
        return new Promise((resolve) => {
            chrome.storage.local.set(items, resolve);
        });
    },
};
// noinspection TsLint
const Logger = {
    debug(message, ...params) {
        OptionRepository.isDeveloperMode().then((developerMode) => {
            if (developerMode) {
                // noinspection TsLint
                console.log(message, ...params);
            }
        });
    },
    log(message, ...params) {
        // noinspection TsLint
        console.log(message, ...params);
    },
    error(message, ...params) {
        // noinspection TsLint
        console.error(message, ...params);
    },
};
const DOMUtils = {
    /**
     * add element later.
     *
     * @param element
     * @param insertElement element to add.
     */
    insertAfter(element, insertElement) {
        element.parentElement.insertBefore(insertElement, element.nextSibling);
    },
    /**
     * get hostname from URL string.
     *
     * example: https://example.com/path -> example.com
     * @param {string} url URL string
     * @return {string} hostname
     */
    getHostName(url) {
        const tmp = document.createElement("a");
        tmp.href = url;
        return tmp.hostname;
    },
    /**
     * delete protocol(scheme) from URL string.
     *
     * @param {string} url URL string
     * @return {string} string without protocol(scheme)
     */
    removeProtocol(url) {
        return url.replace(/^\w+:\/\//, "");
    },
};
//# sourceMappingURL=common.js.map