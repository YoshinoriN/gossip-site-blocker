const softBlockList = document.getElementById("softBlockList");
const hardBlockList = document.getElementById("hardBlockList");
const clearButton = document.getElementById("clearButton");
// noinspection JSValidateTypes
/**
 * @type {HTMLInputElement}
 */
const developerCheckbox = document.getElementById("developerCheckbox");
const autoBlockIDNCheckbox = document.getElementById("autoBlockIDNCheckBox");
const defaultBlockSelect = document.getElementById("defaultBlockType");
async function show_lists() {
    const sites = await BlockedSitesRepository.load();
    // Add after clear.
    softBlockList.innerHTML = "";
    hardBlockList.innerHTML = "";
    const softTable = document.createElement("table");
    const hardTable = document.createElement("table");
    for (const site of sites) {
        const option = new BlockedSiteOption(site);
        if (option.getState() === "soft") {
            softTable.appendChild(option.getElement());
        }
        else {
            hardTable.appendChild(option.getElement());
        }
    }
    softBlockList.appendChild(softTable);
    hardBlockList.appendChild(hardTable);
}
async function clear() {
    if (confirm(chrome.i18n.getMessage("clearConfirm"))) {
        await BlockedSitesRepository.clear();
        await BannedWordRepository.clear();
        alert(chrome.i18n.getMessage("clearDone"));
        // clear all.
        softBlockList.innerHTML = "";
        hardBlockList.innerHTML = "";
        bannedWords.clear();
    }
}
// bind event.
clearButton.addEventListener("click", clear);
document.addEventListener("DOMContentLoaded", async (ignore) => {
    await show_lists();
    const developerMode = await OptionRepository.isDeveloperMode();
    Logger.log("developerMode is ", developerMode);
    developerCheckbox.checked = developerMode;
    const autoBlockIDNOption = await OptionRepository.getAutoBlockIDNOption();
    Logger.debug("autoBlockIDNOption is ", autoBlockIDNOption);
    autoBlockIDNCheckbox.checked = autoBlockIDNOption.enabled;
    const defaultBlockType = await OptionRepository.defaultBlockType();
    Logger.debug("defaultBlockType is ", defaultBlockType);
    defaultBlockSelect.value = defaultBlockType;
});
developerCheckbox.addEventListener("click", async (event) => {
    const checkbox = event.target;
    await OptionRepository.setDeveloperMode(checkbox.checked);
});
autoBlockIDNCheckbox.addEventListener("click", async (event) => {
    const checkbox = event.target;
    const autoBlockIDN = { enabled: checkbox.checked };
    await OptionRepository.setAutoBlockIDNOption(autoBlockIDN);
});
defaultBlockSelect.addEventListener("change", async (event) => {
    const select = event.target;
    const value = select.value;
    await OptionRepository.setDefaultBlockType(value);
});
//# sourceMappingURL=options.js.map