import { ROUTER_PATHS } from "@/app/(variables)/constants";
import { MENU_TAB } from "@/app/(variables)/enums";

const CHO_HANGUL = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

// @ts-ignore
const HANGUL_START_CHARCODE = "가".charCodeAt();
// @ts-ignore
const CHO_PERIOD = Math.floor("까".charCodeAt() - "가".charCodeAt());
// @ts-ignore
const JUNG_PERIOD = Math.floor("개".charCodeAt() - "가".charCodeAt());

function combine(cho = 0, jung = 0, jong = 0) {
  return String.fromCharCode(
    HANGUL_START_CHARCODE + cho * CHO_PERIOD + jung * JUNG_PERIOD + jong,
  );
}

function makeRegexByCho(search = "") {
  const regex = CHO_HANGUL.reduce(
    (acc, cho, index) =>
      acc.replace(
        new RegExp(cho, "g"),
        `[${combine(index, 0, 0)}-${combine(index + 1, 0, -1)}]`,
      ),
    search,
  );

  return new RegExp(`(${regex})`, "g");
}

export function includeByCho(search = "", targetWord: string | null) {
  if (targetWord === null) return false;

  return makeRegexByCho(search).test(targetWord);
}

export const searchPath = (path: string) => {
  for (const [key, value] of Object.entries(ROUTER_PATHS)) {
    if (path.includes(value)) {
      return +key;
    }
  }
  return MENU_TAB.INTRODUCE;
};
