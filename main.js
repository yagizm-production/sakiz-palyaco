const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector("#menu");
menuBtn.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});
menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => menu.classList.remove("open"));
});

const shots = [...document.querySelectorAll("[data-gallery]")].filter((node, index, list) => {
  return list.findIndex((item) => item.dataset.full === node.dataset.full) === index;
});
const dialog = document.querySelector("#lightbox");
const dialogImg = dialog.querySelector("img");
const caption = dialog.querySelector(".caption");
const count = dialog.querySelector(".count");
let current = 0;

function show(index, direction) {
  current = (index + shots.length) % shots.length;
  const shot = shots[current];
  dialogImg.className = direction === "prev" ? "from-left" : "from-right";
  dialogImg.src = shot.dataset.full;
  dialogImg.alt = shot.dataset.caption || shot.querySelector("img")?.alt || "";
  caption.textContent = dialogImg.alt;
  count.textContent = `${current + 1} / ${shots.length}`;
  if (!dialog.open) dialog.showModal();
}

document.querySelectorAll("[data-gallery]").forEach((button) => {
  button.addEventListener("click", () => {
    const index = shots.findIndex((shot) => shot.dataset.full === button.dataset.full);
    show(index, "next");
  });
});
dialog.querySelector(".close").addEventListener("click", () => dialog.close());
dialog.querySelector(".prev").addEventListener("click", () => show(current - 1, "prev"));
dialog.querySelector(".next").addEventListener("click", () => show(current + 1, "next"));
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
document.addEventListener("keydown", (event) => {
  if (!dialog.open) return;
  if (event.key === "ArrowRight") show(current + 1, "next");
  if (event.key === "ArrowLeft") show(current - 1, "prev");
});

let touchX = 0;
dialog.addEventListener("touchstart", (event) => {
  touchX = event.changedTouches[0].clientX;
}, { passive: true });
dialog.addEventListener("touchend", (event) => {
  const delta = event.changedTouches[0].clientX - touchX;
  if (Math.abs(delta) < 40) return;
  show(current + (delta < 0 ? 1 : -1), delta < 0 ? "next" : "prev");
});

document.querySelector("#talep").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const text = [
    "Merhaba, etkinlik için bilgi almak istiyorum.",
    `Ad: ${data.get("ad") || "-"}`,
    `Paket: ${data.get("paket") || "-"}`,
    `Etkinlik: ${data.get("tur") || "-"}`,
    `Tarih: ${data.get("tarih") || "belirtilmedi"}`,
    `Not: ${data.get("not") || "-"}`
  ].join("\n");
  window.open(`https://wa.me/905078378704?text=${encodeURIComponent(text)}`, "_blank", "noopener");
});
