import { otazka, zprava } from "./ui";
import { state as s } from "./state";
import{potvory,} from "./souboj";

export async function obchod() {
  let txt =
    "Přišel jsi k obchodu, máš " +
    s.predmety["Peníze"] +
    " zlaťáků. Chceš jít dovnitř?";
  if (!(await otazka(txt))) return;

  await zprava(
    "Obchodník: Vítej v našem obchůdku, je tu něco, co se ti líbí (a máš na to prachy 🤣️)?"
  );

  txt =
    "Máme tady tento krásný meč, ⚔️ stojí 100 zlaťáků 💯️ a přidá ti 20 damage ke každému ÚDERU. 🤜️ Chceš ho koupit?";
  txt += " (Máš " + s.predmety["Peníze"] + " zlaťáků.)";

  if (s.predmety["Meč"] == 1) txt += " (Už jeden máš.)";
  if (s.predmety["Meč"] > 1) txt += " (Už jich máš " + s.predmety["Meč"] + ".)";

  if (await otazka(txt)) {
    if (s.predmety["Peníze"] >= 100) {
      s.predmety["Peníze"] -= 100;
      s.predmety["Meč"] += 1;
      await zprava("Nech sa páči!");
    } else {
      await zprava("Bez peněz do krámu nelez, kámo.");
    }
  }

  txt =
    "Léčivý lektvar! 🏺️ Uleví od bolestí, spraví každou zlomeninu, pomůže od zažívacích potízí! 🤢️ Je to zázrak! 🤑️ Pouhých 50 zlaťáků! Máš zájem?";
  txt += " (Máš " + s.predmety["Peníze"] + " zlaťáků.)";

  if (s.predmety["Léčivý lektvar"] > 0)
    txt += " (Teď jich máš " + s.predmety["Léčivý lektvar"] + ".)";

  if (await otazka(txt)) {
    if (s.predmety["Peníze"] >= 50) {
      s.predmety["Peníze"] -= 50;
      s.predmety["Léčivý lektvar"] += 1;
      await zprava("Věřím, že ti jednou zachrání život!");
    } else {
      await zprava("Nemáš nárok na takovýto luxus, bídáku! Vrať se s penězi!");
    }
  }
  txt =
    "Narazil jsi na nepřitele a došlo ti, že na něj nemáš? Přál jsi si zmizet? Od toho jsou naše srandovní fazolky! Jenom 30 zlaťáků! Bohužel můžou nastat tyto nežádoucí účinky: Nevolnost, zvracení, motání hlavy, mdloby, zmatení. Pokud jsi epileptik, poraď se před použitím se svým lékařem.";
  txt += " (Máš " + s.predmety["Peníze"] + " zlaťáků.)";

  if (s.predmety["Srandovní fazolky"] > 0)
    txt += " (Teď jich máš " + s.predmety["Srandovní fazolky"] + ".)";

  if (await otazka(txt)) {
    if (s.predmety["Peníze"] >= 30) {
      s.predmety["Peníze"] -= 30;
      s.predmety["Srandovní fazolky"] += 1;
      await zprava("Jednou mi budeš za to poděkuješ, věř mi...");
    } else {
      await zprava("Tak hele, výroba je drahá, a žádné výjmky neexistují! Vrať se sem až budeš mít něco v peněžence 🤬");
    }
  }
    txt =
    "Už sis někdy přál být odolnější? Od toho je naše brnění! Čistá ocel! Trochu těžší, ale poslouží :) Pouhopouhých 70 zlaťáků!";
  txt += " (Máš " + s.predmety["Peníze"] + " zlaťáků.)";

  if (s.predmety["Brnění"] == 1)
    txt += " (Už jedno máš.)"
    if (s.predmety["Brnění"] > 1)
    txt += "(Už jich máš " + s.predmety.Brnění + ".)";


  if (await otazka(txt)) {
    if (s.predmety["Peníze"] >= 70) {
      s.predmety["Peníze"] -= 70;
      s.predmety["Brnění"] += 1;
      await zprava("Děkujeme vám za nákup v obchodě Tesco ");
    } else {
      await zprava("Si tu ocel sežeň sám, nebo si sežeň peníze.");
}
}
}