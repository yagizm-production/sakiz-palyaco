const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector("#menu");
menuBtn.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});
menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => menu.classList.remove("open"));
});

const dialog = document.querySelector("#lightbox");
const dialogImg = dialog.querySelector("img");
document.querySelectorAll(".gallery button").forEach((button) => {
  button.addEventListener("click", () => {
    dialogImg.src = button.dataset.full;
    dialogImg.alt = button.querySelector("img").alt;
    dialog.showModal();
  });
});
dialog.querySelector(".close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

document.querySelector("#talep").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const text = [
    "Merhaba, etkinlik için bilgi almak istiyorum.",
    `Ad: ${data.get("ad") || "-"}`,
    `Etkinlik: ${data.get("tur") || "-"}`,
    `Tarih: ${data.get("tarih") || "belirtilmedi"}`,
    `Not: ${data.get("not") || "-"}`
  ].join("\n");
  window.open(`https://wa.me/905078378704?text=${encodeURIComponent(text)}`, "_blank", "noopener");
});
