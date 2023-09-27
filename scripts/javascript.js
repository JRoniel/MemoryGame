const c = ["A.png", "B.png", "C.png", "D.png", "E.png", "F.png", "A.png", "B.png", "C.png", "D.png", "E.png", "F.png"];
const n = { "A.png": "Bruce", "B.png": "Docinho", "C.png": "Kahleesi", "D.png": "Cleitin", "E.png": "Naruto", "F.png": "Cocada" };
let f = [], m = [], o = 0, g = !1, t, s = 0;

function sh(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
}

function cr(a) {
  const c = document.createElement("div");
  c.classList.add("card");
  const d = document.createElement("img");
  d.src = "./images/blank.jpg";
  d.alt = "Card";
  c.appendChild(d);
  c.dataset.cardValue = a;
  c.addEventListener("click", fl);
  return c;
}

function st() {
  sh(c);
  co();
}

function sT() {
  t = setInterval(function () {
    s++;
    const m = Math.floor(s / 60);
    const ds = s % 60;
    document.getElementById("timer").textContent = `${m}:${ds < 10 ? '0' : ''}${ds}`;
  }, 1000);
}

function spT() {
  clearInterval(t);
}

function fl() {
  if (!g) {
    sT();
    g = !0;
  }
  const c = this;
  if (!c.classList.contains("flipped") && f.length < 2) {
    c.classList.remove("flipping");
    c.classList.add("flipped");
    const d = c.querySelector("img");
    d.src = `./images/${c.dataset.cardValue}`;
    f.push(c);
    if (f.length === 2) {
      const [c1, c2] = f;
      const v1 = c1.dataset.cardValue;
      const v2 = c2.dataset.cardValue;
      if (v1 === v2) {
        m.push(c1, c2);
        f = [];
        const cn = n[v1];
        cn && sc(cn);
        if (m.length === c.length) sw();
      } else {
        setTimeout(() => {
          f.forEach(c => {
            c.classList.remove("flipped");
            c.querySelector("img").src = "./images/blank.jpg";
          });
          f = [];
        }, 500);
      }
      o++;
      document.getElementById("move-counter").textContent = o;
    }
  }
}

function sc(n) {
  const cf = document.getElementById("card-found-text");
  cf.style.display = "block";
  cf.textContent = `Você encontrou ${n}`;
  setTimeout(() => {
    cf.style.display = "none";
    cf.textContent = "";
  }, 5000);
}

function sw() {
  const wt = "Parabéns! Você ganhou, clique em (recarregar)";
  const cf = document.getElementById("card-found-text");
  cf.style.display = "block";
  cf.textContent = wt;
  spT();
}

function co() {
  const gb = document.getElementById("game-board");
  for (let i = 0; i < c.length; i++) {
    const ca = cr(c[i]);
    gb.appendChild(ca);
  }
}

function op() {
  const po = document.getElementById("imagePopup");
  po.style.display = "block";
}

function cl(e) {
  if (e.target.id === "imagePopup") {
    const po = document.getElementById("imagePopup");
    po.style.display = "none";
  }
}

function rg() {
  const gb = document.getElementById("game-board");
  gb.innerHTML = "";
  f = [];
  m = [];
  o = 0;
  s = 0;
  g = !1;
  document.getElementById("move-counter").textContent = o;
  document.getElementById("timer").textContent = "0:00";
  op();
  st();
}

st();
