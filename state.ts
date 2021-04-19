import { legenda } from "./mapa";

export const mapa: (keyof typeof legenda)[][] = [
  ["Jeskyně", "Obchod", "Les", "Les", "Les"],
  ["Jeskyně", "Start", "Jeskyně", "Hrad", "Jeskyně"],
  ["Les", "Hotel", "Les", "Dům", "Les"]
];

export const predmety = {
  Peníze: 0,
  Meč: 0,
  Klíč: 0,
  Brnění: 0,
  "Srandovní fazolky": 5,
  "Léčivý lektvar": 0
};

export const hrac = {
  x: 1,
  y: 1,
  hp: 100
};
