document.addEventListener("dragstart", (e) => {
    if (e.target.matches("img")) e.preventDefault();
}, { passive: false });

document.querySelector("html").addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "Enter") document.querySelector("main").click();
});
