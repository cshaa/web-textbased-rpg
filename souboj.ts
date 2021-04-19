import { otazka, zprava } from "./ui";
import { predmety, hrac, mapa } from "./state";
import { zrusZvyrazneniPoli } from "./mapa";

export let potvory = [
  { jmeno: "Horský troll", hp: 300, dmg: 10 },
  { jmeno: "Pavouk", hp: 10, dmg: 10 },
  { jmeno: "Jedovatý pavouk", hp: 10, dmg: 50 },
  { jmeno: "Skřet", hp: 120, dmg: 30 }
];

export async function soubojSNahodnouPotvorou() {
  let potv = potvory[Math.floor(Math.random() * potvory.length)];

  if (Math.random() < 0.2 || potv == undefined) {
    return await zprava("Nikdo! Máš štěstí! 🍀️");
  }

  let hpPotvory = potv.hp;
  let txt = potv.jmeno + " a zaútočil na tebe";

  switch (potv.jmeno) {
    case "Horský troll":
      txt += " za mocného „Uaaaa!“ 🦍️";
      break;

    case "Skřet":
      txt += " a křičel u toho jako smyslů zbavený. 👺️";
      break;

    default:
      txt += " vydávaje při tom „Kss! Kss! Kss!“ svými kusadly. 🕷️";
      break;
  }

  await zprava(txt);

  if (predmety["Srandovní fazolky"] > 0) {
    let fazolka = await otazka(
      "Máš " +
        predmety["Srandovní fazolky"] +
        " srandovních fazlolek. 💊️ Cheš jednu použít?"
    );

    if (fazolka) {
      predmety["Srandovní fazolky"] -= 1;
      hrac.x = Math.floor(Math.random() * mapa[0].length);
      hrac.y = Math.floor(Math.random() * mapa.length);
      await zprava(
        "Zamotala se ti hlava 🤢️ a s hlasitým puknutím jsi zmizel 💥️."
      );
      await zprava(
        "Když mdloby pominuly 😴️ a otevřely se ti oči, kolem tebe byl " +
          mapa[hrac.y][hrac.x]
      );
      zrusZvyrazneniPoli();
      return;
    }
  }

  while (hpPotvory > 0 && hrac.hp > 0) {
    if (hrac.hp <= 30 && predmety["Léčivý lektvar"] > 0) {
      if (
        await otazka(
          "Máš " +
            predmety["Léčivý lektvar"] +
            " léčivých lektvarů 🏺️, chceš jeden použít?"
        )
      ) {
        hrac.hp += 100;
        predmety["Léčivý lektvar"] -= 1;
        await zprava("Bubli bubli! Nyní máš " + hrac.hp + " HP!");
      }
    }

    let kop = await otazka("Co uděláš?", "🦶 Kopnu ho", "🤜️ Praštím ho");

    txt = potv.jmeno + " má " + hpPotvory + " HP.";

    if (kop) {
      if (Math.random() < 0.35) {
        txt +=
          " " +
          potv.jmeno +
          " uskočil, ty jsi minul a zranil ses (-10 HP). 😭️";
        hrac.hp -= 10;
      } else {
        hpPotvory -= 50;
      }
    } else {
      if (predmety["Meč"] > 0) {
        hpPotvory -= 40;
      } else {
        hpPotvory -= 20;
      }
    }

    if (hpPotvory < 0) hpPotvory = 0;

    txt += " Po tvém útoku má už jen " + hpPotvory + " HP.";

    if (hpPotvory == 0) {
      let coins = Math.round(Math.random() * potv.hp);
      txt +=
        " " + potv.jmeno + " zemřel, 😁️ měl u sebe " + coins + " zlaťáků.";
      predmety["Peníze"] += coins;
      txt += " Nyní máš " + predmety["Peníze"] + " zlaťáků. 💰️";
    }

    if (hpPotvory > 0) {
      txt +=
        " " + potv.jmeno + " zaútočil zpátky, vzal ti " + potv.dmg + " HP.";
      hrac.hp -= potv.dmg;
      if (hrac.hp < 0) hrac.hp = 0;
      txt += " Už máš jenom " + hrac.hp + " HP.";
    }

    await zprava(txt);
  }
}
