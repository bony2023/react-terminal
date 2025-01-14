import { UAParser } from 'ua-parser-js';

export default class Utils {
  static splitStringAtIndex(value: string, index: number) {
    if (!value) {
      return ["", ""];
    }
    return [value.substring(0, index), value.substring(index)];
  }
  static isMobile(): boolean {
    const { device } = UAParser(window.navigator.userAgent);
    return device.is('mobile');
  }
}
