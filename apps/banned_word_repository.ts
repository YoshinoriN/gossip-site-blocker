interface IBannedWordItems {
    bannedWords: IBannedWord[];
}

interface IBannedWord {
    keyword: string;
}

const BannedWordRepository = {
    async load(): Promise<IBannedWord[]> {
        const items = await ChromeStorage.get({bannedWords: []}) as IBannedWordItems;
        return items.bannedWords;
    },

    async save(words: IBannedWord[]) {
        await ChromeStorage.set({bannedWords: words});
    },

    async clear() {
        await ChromeStorage.set({bannedWords: []});
    },

    async addAll(bannedWordList: IBannedWord[]): Promise<void> {
        const words: IBannedWord[] = await this.load();

        for (const bannedWord of bannedWordList) {
            let found: boolean = false;
            for (const word of words) {
                if (bannedWord.keyword === word.keyword) {
                    // do nothing.
                    found = true;
                }
            }

            if (!found) {
                words.push(bannedWord);
            }
        }

        await this.save(words);
    },

    async add(addWord: string): Promise<boolean> {
        const words: IBannedWord[] = await this.load();

        for (const word of words) {
            if (addWord === word.keyword) {
                // do nothing.
                return false;
            }
        }

        words.push({keyword: addWord});
        await this.save(words);
        return true;
    },

    async delete(deleteWord: string): Promise<boolean> {
        const words: IBannedWord[] = await this.load();

        const contains = words.find((word) => word.keyword !== deleteWord) !== undefined;
        const filteredWords = words.filter((word) => word.keyword !== deleteWord);

        await this.save(filteredWords);

        return contains;
    },
};
