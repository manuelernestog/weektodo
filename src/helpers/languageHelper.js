import { es, enUS, fr, pt, ru, zhCN, de, it, ar, pl, zhTW, ja, tr, uk, ko, hi, vi, he } from "date-fns/locale";

export default {
  getLanguagePack(lang) {
    let return_lang = null;
    switch (lang) {
      case "es":
        return_lang = es;
        break;
      case "en":
        return_lang = enUS;
        break;
      case "fr":
        return_lang = fr;
        break;
      case "pt":
        return_lang = pt;
        break;
      case "it":
        return_lang = it;
        break;
      case "ar":
        return_lang = ar;
        break;
      case "pl":
        return_lang = pl;
        break;
      case "ru":
        return_lang = ru;
        break;
      case "zh_cn":
        return_lang = zhCN;
        break;
      case "zh_tw":
        return_lang = zhTW;
        break;
      case "de":
        return_lang = de;
        break;
      case "ja":
        return_lang = ja;
        break;
      case "tr":
        return_lang = tr;
        break;
      case "uk":
        return_lang = uk;
        break;
      case "ko":
        return_lang = ko;
        break;
      case "hi":
        return_lang = hi;
        break;
      case "vi":
        return_lang = vi;
        break;
      case "he":
        return_lang = he;
        break;
    }
    return return_lang;
  },
};
