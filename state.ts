import { legenda } from "./mapa";

export namespace defaultState {
  export let mapa: (keyof typeof legenda)[][] = [
    ["Jeskyně", "Obchod", "Les", "Krčma", "Les"],
    ["Poušť", "Start", "Jeskyně", "Hrad", "Jeskyně"],
    ["Les", "Hotel", "Poušť", "Dům", "Les"],
    ["Krčma", "Jeskyně", "Obchod", "Hrad", "Poušť"],
    ["Les", "Dům", "Krčma", "Jeskyně", "Les"]
  ];

  export let predmety = {
    Peníze: 0,
    Meč: 0,
    Klíč: 0,
    Brnění: 0,
    "Srandovní fazolky": 5,
    "Léčivý lektvar": 0
  };

  export let hrac = {
    x: 1,
    y: 1,
    hp: 100,
    difficultyMultiplyer: 1
  };
}

function clone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export let state = clone(defaultState);
export type state = typeof state;

export function ulozit(nazev: string) {
  const savedGames = JSON.parse(localStorage.getItem('savedGames') ?? '{}');
  savedGames[nazev] = state;
  localStorage.setItem('savedGames', JSON.stringify(savedGames));
}

export function nahrat(nazev: string) {
  const savedGames = JSON.parse(localStorage.getItem('savedGames') ?? '{}');
  state = savedGames[nazev];
}

export function nazvyUlozenychHer(): string[] {
  const savedGames = JSON.parse(localStorage.getItem('savedGames') ?? '{}');
  return Object.keys(savedGames);
}
