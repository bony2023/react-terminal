import Utils from "../../../src/common/Utils";

describe("Utils", () => {
    it("splitStringAtIndex splits string at a index", () => {
      const [splitBeforeText, splitAfterText] = Utils.splitStringAtIndex("abcde", 2);
      expect(splitBeforeText).toBe("ab");
      expect(splitAfterText).toBe("cde");
    });

    it("splitStringAtIndex returns empty values if undefined/empty string is passed", () => {
        const [splitBeforeText, splitAfterText] = Utils.splitStringAtIndex("", 2);
        expect(splitBeforeText).toBe("");
        expect(splitAfterText).toBe("");
      });
});
