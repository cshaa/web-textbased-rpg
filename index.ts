import { kompas, otazka, zprava, dotaz } from "./ui";
import { state as s, nazvyUlozenychHer, nahrat, ulozit } from "./state";
import { obchod } from "./obchod";
import { soubojSNahodnouPotvorou } from "./souboj";
import {
  generujPrazdnouMapu,
  odkryjPole,
  zrusZvyrazneniPoli,
  zvyrazniPole
} from "./mapa";
import "./style.css";

let strt = document.querySelector<HTMLButtonElement>("#start");
let rstrt = document.querySelector<HTMLButtonElement>("#restart");

strt.addEventListener("click", start);
rstrt.addEventListener("click", () => {
  document.location = document.location;
});

function start() {
  strt.style.display = "none";
  pribehHrdiny().then(
    () => {},
    ({ message }) => {
      console.error(message);
    }
  );
}

async function pribehHrdiny() {
  if (await otazka("Vítej hrdino! Chceš načíst uloženou hru?")) {
    while (true) {
      const txt = nazvyUlozenychHer()
        .map((h, i) => i + ". slot: " + h)
        .join("\n");

      const slot = await dotaz(txt);
      const nazevHry = nazvyUlozenychHer()[+slot];

      if (nazevHry === undefined) {
        await zprava("Žádná taková hra tam není!");
      } else {
        nahrat(nazevHry);
        break;
      }
    }
  }

  generujPrazdnouMapu();

  await zprava("Hurá! ⚔️ Jdeme na to!", "Pokračovat");

  while (true) {
    let misto = s.mapa[s.hrac.y][s.hrac.x];
    let txt = "Máš " + s.hrac.hp + " HP.";
    zrusZvyrazneniPoli();
    odkryjPole(s.hrac.x, s.hrac.y);
    zvyrazniPole(s.hrac.x, s.hrac.y);

    switch (misto) {
      case "Dům":
        s.hrac.hp = Math.max(s.hrac.hp, 100);
        txt +=
          " Narazil jsi na dům 🏡️ a tvoje HP bylo obnoveno, nyní máš " +
          s.hrac.hp +
          " HP.";
        break;

      case "Les":
        s.hrac.hp -= 10;
        txt +=
          " Prodíráš se lesem 🌳️ a zranil ses o ostružiny, nyní máš " +
          s.hrac.hp +
          " HP.";
        break;

      case "Jeskyně":
        txt += " Přišel jsi k jesnyni, z ní se vynořil...";
        await zprava(txt);
        await soubojSNahodnouPotvorou();
        txt = "";
        break;

      case "Hotel":
        s.hrac.hp = 200;
        txt +=
          " Dorazil jsi do hotelu 🏨️ a ubytoval ses tam. Protože ses dobře bavil 🍻️, " +
          "odpočinul sis a doplnil jsi síly 🤸️, nyní máš " +
          s.hrac.hp +
          " HP.";
        if (s.predmety["Peníze"] >= 10) {
          txt += " Stálo tě to 10 zlaťáků.";
        } else {
          txt += " Hostinský tě z lítosti ubytoval zadarmo.";
        }
        break;

      case "Hrad":
        if (
          await otazka(
            "Dorazil jsi na hrad, a tam ti místní nabídli, že si můžeš uložit svou hru, přijmeš tuto laskavou nabídku?"
          )
        ) {
          let nazevhry = await dotaz("Jak chceš aby se ulažená hra jmenovala?");
          ulozit(nazevhry);
        }
        break;

      case "Obchod":
        await obchod();
        break;

      default:
        txt += " Jsi venku, kolem tebe je " + misto + ".";
    }

    if (s.hrac.hp <= 0) {
      zprava(txt + " Zemřel jsi 😭️ ☠️");
      return;
    }

    txt += " Kam jdeš dál?";
    let smer = await kompas(txt);

    switch (smer) {
      case "s":
        s.hrac.y -= 1;
        break;
      case "j":
        s.hrac.y += 1;
        break;
      case "v":
        s.hrac.x += 1;
        break;
      case "z":
        s.hrac.x -= 1;
        break;
    }

    await pohlidatOkraje();
  }
}

async function pohlidatOkraje() {
  if (s.hrac.y < 0) {
    s.hrac.y = 0;
    await zprava(
      "Narazil jsi na hlubokou propast 🕳️, dál nemůžeš.",
      "Vrátit se zpět"
    );
  } else if (s.hrac.y >= s.mapa.length) {
    s.hrac.y = s.mapa.length - 1;
    await zprava(
      "Narazil jsi na vysoký útes 🏔️, dál nemůžeš.",
      "Vrátit se zpět"
    );
  } else if (s.hrac.x < 0) {
    s.hrac.x = 0;
    await zprava(
      "Narazil jsi na neprostupný les 🌲️, dál nemůžeš.",
      "Vrátit se zpět"
    );
  } else if (s.hrac.x >= s.mapa[s.hrac.y].length) {
    s.hrac.x = s.mapa[s.hrac.y].length - 1;

    let jitDal = await otazka(
      "Narazil jsi na nekonečnou poušť 🏜️, když půjdeš dál, " +
        "jistě zemřeš žízní a vyčerpáním.",
      "Jít dál",
      "Vrátit se zpět"
    );

    if (jitDal) {
      s.hrac.hp = -100;
      s.mapa.length = 0;
      s.mapa[0] = ["Poušť"];
      s.hrac.x = s.hrac.y = 0;
    }
  }
}
