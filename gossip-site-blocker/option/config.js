const OptionRepository = {
    init: async function () {
        this.developerMode = await Storage.get({developerMode: false});
    },

    /**
     * @return {boolean}
     */
    isDeveloperMode: function () {
        return this.developerMode;
    },

    /**
     * @param {boolean} mode
     * @return {Promise<void>}
     */
    setDeveloperMode: async function (mode) {
        // 値をセット
        await Storage.set({developerMode: mode});
        this.developerMode = mode;

        Logger.debug("set 'developerMode' to =>", mode);
    }
};

// 初期化
OptionRepository.init();