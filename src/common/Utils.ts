import styles from "../index.scss";

export default class Utils {
  static getCSSVariable(name: string) {
    return getComputedStyle(
      document.querySelector(`#${styles.terminalContainer}`)
    ).getPropertyValue(name);
  }
}
