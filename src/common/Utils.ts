export default class Utils {
  static splitStringAtIndex(value: string, index: number) {
    if (!value) {
      return ["", ""];
    }
    return [value.substring(0, index), value.substring(index)];
  }
}
