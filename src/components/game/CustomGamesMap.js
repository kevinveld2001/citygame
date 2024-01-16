import ScrMult from "./custom/ScrMult";
import LanguageGame from "./custom/LanguageGame";
import DefaultGame from "./custom/Default";

import CharacterCard from "pages/games/MurderMystery/CharacterCard";

const map = new Map();

map.set("default", DefaultGame);
map.set("scrmult", ScrMult);
map.set("language", LanguageGame);
map.set("murdermystery_cc", CharacterCard);


export default map;