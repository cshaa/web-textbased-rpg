let input = document.querySelector<HTMLInputElement>("#input");
let textik = document.querySelector<HTMLElement>("#textik");
let tl1 = document.querySelector<HTMLElement>("#tl1");
let tl2 = document.querySelector<HTMLElement>("#tl2");
let tl3 = document.querySelector<HTMLElement>("#tl3");
let tl4 = document.querySelector<HTMLElement>("#tl4");

tl1.style.display = "none";
tl2.style.display = "none";
tl3.style.display = "none";
tl4.style.display = "none";
input.style.display = "none";

export function tlacitkoStisknuto() {
  let promise = new Promise<1 | 2 | 3 | 4>(function(res, rej) {
    tl1.addEventListener("click", tl1_click);
    tl2.addEventListener("click", tl2_click);
    tl3.addEventListener("click", tl3_click);
    tl4.addEventListener("click", tl4_click);

    function unregister() {
      tl1.removeEventListener("click", tl1_click);
      tl2.removeEventListener("click", tl2_click);
      tl3.removeEventListener("click", tl3_click);
      tl4.removeEventListener("click", tl4_click);
    }

    function tl1_click() {
      unregister();
      res(1);
    }

    function tl2_click() {
      unregister();
      res(2);
    }

    function tl3_click() {
      unregister();
      res(3);
    }

    function tl4_click() {
      unregister();
      res(4);
    }
  });

  return promise;
}

export async function zprava(txt: string, ok = "Oukej") {
  tl1.style.display = "";
  tl2.style.display = "none";
  tl3.style.display = "none";
  tl4.style.display = "none";

  tl1.textContent = ok;
  textik.textContent = txt;
  await tlacitkoStisknuto();
}

export async function otazka(txt: string, ano = "✔️ Ano", ne = "❌️ Ne") {
  tl1.style.display = "";
  tl2.style.display = "";
  tl3.style.display = "none";
  tl4.style.display = "none";

  tl1.textContent = ano;
  tl2.textContent = ne;

  textik.textContent = txt;

  let vysledek = await tlacitkoStisknuto();

  return vysledek == 1;
}

export async function kompas(txt: string) {
  tl1.style.display = "";
  tl2.style.display = "";
  tl3.style.display = "";
  tl4.style.display = "";

  tl1.textContent = "⬆️ Sever";
  tl2.textContent = "⬇️ Jih";
  tl3.textContent = "➡️ Východ";
  tl4.textContent = "⬅️ Západ";

  textik.textContent = txt;
  let vysledek = await tlacitkoStisknuto();

  if (vysledek == 1) {
    return "s";
  } else if (vysledek == 2) {
    return "j";
  } else if (vysledek == 3) {
    return "v";
  } else if (vysledek == 4) {
    return "z";
  }
}

export async function dotaz(txt: string, ok: string = "OK") {
  tl1.style.display = "";
  tl1.textContent = ok;
  input.value = "";
  input.style.display = "";

  tl2.style.display = "none";
  tl3.style.display = "none";
  tl4.style.display = "none";

  textik.textContent = txt;
  await tlacitkoStisknuto();

  input.style.display = "none";
  return input.value;
}
