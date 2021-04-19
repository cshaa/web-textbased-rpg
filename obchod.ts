import { otazka, zprava } from "./ui";
import { defaultState } from "./state";
const { predmety } = defaultState;

export async function obchod() {
  let txt =
    "Přišel jsi k obchodu, máš " +
    predmety["Peníze"] +
    " zlaťáků. Chceš jít dovnitř?";
  if (!(await otazka(txt))) return;

  await zprava(
    "Obchodník: Vítej v našem obchůdku, je tu něco, co se ti líbí (a máš na to prachy 🤣️)?"
  );

  txt =
    "Máme tady tento krásný meč, ⚔️ stojí 100 zlaťáků 💯️ a přidá ti 20 damage ke každému ÚDERU. 🤜️ Chceš ho koupit?";
  if (predmety["Meč"] == 1) txt += " (Už jeden máš.)";
  if (predmety["Meč"] > 1) txt += " (Už jich máš " + predmety["Meč"] + ".)";

  if (await otazka(txt)) {
    if (predmety["Peníze"] >= 100) {
      predmety["Peníze"] -= 100;
      predmety["Meč"] += 1;
      await zprava("Nech sa páči!");
    } else {
      await zprava("Bez peněz do krámu nelez, kámo.");
    }
  }

  txt =
    "Léčivý lektvar! 🏺️ Uleví od bolestí, spraví každou zlomeninu, pomůže od zažívacích potízí! 🤢️ Je to zázrak! 🤑️ Pouhých 50 zlaťáků! Máš zájem?";
  if (predmety["Léčivý lektvar"] > 0)
    txt += " (Teď jich máš " + predmety["Léčivý lektvar"] + ".)";

  if (await otazka(txt)) {
    if (predmety["Peníze"] >= 50) {
      predmety["Peníze"] -= 50;
      predmety["Léčivý lektvar"] += 1;
      await zprava("Věřím, že ti jednou zachrání život!");
    } else {
      await zprava("Nemáš nárok na takovýto luxus, bídáku! Vrať se s penězi!");
    }
  }
}
