// Image data
const imgs = [
    {
        url: "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/5f1b0943-7044-4024-af07-d4fa8cc42a00/public",
        caption: "<p>2025</p>",
    },
    {
        url: "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/18826801-edbf-44b3-6744-3810eb807700/public",
        caption: "<p>Kumo, 2025</p>",
    },
    {
        url: "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/e76e11bf-193e-4979-7be9-e6a8717fbe00/public",
        caption: "<p>Bremen, 2025</p>",
    },
];

// Utility: Fisher-Yates shuffle algorithm
function shuffle(array) {
    const arr = [...array]; // Immutable: create copy
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Modern destructuring syntax
    }
    return arr;
}

// Utility: Generate random width
function getRandomWidth() {
    return Math.floor(Math.random() * 25 + 25);
}

// Utility: Create figure element
function createFigure(imageData, width) {
    const figure = document.createElement("figure");
    figure.style.maxWidth = `${width}%`;

    const img = document.createElement("img");
    img.src = imageData.url;
    img.alt = ""; // Accessibility: Empty alt text for decorative images

    const figcaption = document.createElement("figcaption");
    figcaption.innerHTML = imageData.caption;

    figure.appendChild(img);
    figure.appendChild(figcaption);

    return figure;
}

// App State
const state = {
    shuffledImages: [],
    currentIndex: 0,
    mainElement: null,
};

// Initialization
function init() {
    // Cache DOM element
    state.mainElement = document.querySelector("main");

    if (!state.mainElement) {
        console.error("Main element not found");
        return;
    }

    // Shuffle images
    state.shuffledImages = shuffle(imgs);

    // Display first image
    const width = getRandomWidth();
    const firstFigure = createFigure(state.shuffledImages[0], width);
    state.mainElement.prepend(firstFigure);
    state.currentIndex = 1;

    // Event listener for click
    state.mainElement.addEventListener("click", handleMainClick);

    // Event delegation for drag prevention (for all images, including future ones)
    document.addEventListener("dragstart", preventImageDrag, {
        passive: false,
    });
}

// Click handler for main element
function handleMainClick() {
    const width = getRandomWidth();

    if (state.currentIndex < state.shuffledImages.length) {
        // Next image from the array
        const figure = createFigure(
            state.shuffledImages[state.currentIndex],
            width,
        );
        state.mainElement.prepend(figure);
        state.currentIndex++;
    } else {
        // Display last image
        const lastImage = { url: "assets/last.jpg", caption: "" };
        const figure = createFigure(lastImage, width);
        state.mainElement.prepend(figure);
    }
}

// Prevents dragging of images
function preventImageDrag(event) {
    if (event.target.matches("img")) {
        event.preventDefault();
    }
}

// Start app when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    // DOM already loaded
    init();
}
