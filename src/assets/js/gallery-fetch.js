const API_URL = "http://localhost:3000";

const MIN_WIDTH = 25;
const MAX_WIDTH = 50;

function getRandomWidth() {
    return Math.floor(Math.random() * (MAX_WIDTH - MIN_WIDTH + 1) + MIN_WIDTH);
}

function createFigure(url, width) {
    const figure = document.createElement("figure");
    figure.style.maxWidth = `${width}%`;

    const img = document.createElement("img");
    img.src = url;
    img.alt = "";
    img.loading = "lazy";
    img.decoding = "async";

    figure.appendChild(img);
    return figure;
}

async function fetchNextImage() {
    const res = await fetch(`${API_URL}/api/next`, {
        headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error(res.status);
    return res.json();
}

const state = {
    mainElement: null,
    done: false,
};

async function init() {
    state.mainElement = document.querySelector("main");

    if (!state.mainElement) {
        console.error("Main element not found");
        return;
    }

    try {
        const data = await fetchNextImage();
        state.mainElement.prepend(createFigure(data.url, getRandomWidth()));
        state.done = data.done;
    } catch (err) {
        console.error("Failed to load first image", err);
    }

    state.mainElement.addEventListener("click", handleMainClick);
    document.querySelector("html").addEventListener("keydown", (e) => {
        if (e.key === " " || e.key === "Enter") handleMainClick();
    });

    document.addEventListener("dragstart", (e) => {
        if (e.target.matches("img")) e.preventDefault();
    }, { passive: false });
}

async function handleMainClick() {
    if (state.done) return;

    try {
        const data = await fetchNextImage();
        state.mainElement.prepend(createFigure(data.url, getRandomWidth()));
        state.done = data.done;
    } catch (err) {
        console.error("Failed to load next image", err);
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}
