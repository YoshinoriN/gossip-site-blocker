enum BlockType {
    URL,
    WORD, /* Banned Word */
    IDN, /* Internationalized Domain Name */
}

class BlockState {
    private readonly state: string;
    private readonly blockReason: BlockReason | null;

    constructor(blockable: IBlockable,
                blockedSites: BlockedSites,
                bannedWords: IBannedWord[],
                idnOption: IAutoBlockIDNOption) {

        const blockedSite = blockedSites.matches(blockable.getUrl());

        const banned = bannedWords.find((bannedWord) => {
            const keyword = bannedWord.keyword;
            return blockable.contains(keyword);
        });

        if (blockedSite) {
            this.state = blockedSite.getState();
            this.blockReason = new BlockReason(BlockType.URL, blockedSite.url);
            return;
        } else if (banned) {
            this.state = "soft";
            this.blockReason = new BlockReason(BlockType.WORD, banned.keyword);
            return;
        }

        // check IDN
        const enabled: boolean = idnOption.enabled;

        if (enabled) {
            const url = blockable.getUrl();
            const hostname = DOMUtils.getHostName(url);

            if (hostname.startsWith("xn--") || hostname.includes(".xn--")) {
                this.state = "soft";
                this.blockReason = new BlockReason(BlockType.IDN, chrome.i18n.getMessage("IDN"));
                return;
            }
        }

        this.state = "none";
        this.blockReason = null;
    }

    public getReason(): BlockReason | null {
        return this.blockReason;
    }

    public getState(): string {
        return this.state;
    }
}
