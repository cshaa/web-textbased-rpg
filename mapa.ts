import { mapa, hrac } from "./state";

export function generujPrazdnouMapu() {
  const el = document.querySelector("#mapa");

  let y = 0;
  for (const radek of mapa) {
    const tr = document.createElement("tr");

    let x = 0;
    for (const misto of radek) {
      const td = document.createElement("td");
      td.id = `mapa-misto-x${x}y${y}`;
      td.textContent = "⬛";
      tr.appendChild(td);
      x += 1;
    }

    el.appendChild(tr);
    y += 1;
  }
}

export function odkryjPole(x: number, y: number) {
  const el = document.querySelector(`#mapa-misto-x${x}y${y}`);
  const misto = mapa[y][x];
  const ikona = legenda[misto];
  el.textContent = ikona;
}

export function zvyrazniPole(x: number, y: number) {
  const el = document.querySelector(`#mapa-misto-x${x}y${y}`);
  el.classList.add("accent");
}

export function zrusZvyrazneniPoli() {
  for (const el of Array.from(document.querySelectorAll("#mapa .accent"))) {
    el.classList.remove("accent");
  }
}

export const legenda = {
  Hrad: "🏰️",
  Jeskyně: "🕳️",
  Obchod: "🛒️",
  Les: "🌲️",
  Start: "🚩️",
  Hotel: "🏨️",
  Dům: "🏠️",
  Poušť: "🏜️"
} as const;
