import ScrMult from "./custom/ScrMult";
import LanguageGame from "./custom/LanguageGame";
import DefaultGame from "./custom/Default";

const map = new Map();

map.set("default", DefaultGame);
map.set("scrmult", ScrMult);
map.set("language", LanguageGame);


export default map;