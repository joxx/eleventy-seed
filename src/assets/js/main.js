// Image data
const imgs = [
    {
        url: "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/901b704a-a7d3-4660-472e-68af475d2800/public",
        caption: "",
    },
    {
        url: "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/08907a34-ab06-4847-2bdd-d931a1fa5500/public",
        caption: "",
    },
    {
        url: "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/58f8d7a2-2a03-48b2-ba22-723aa4c5df00/public",
        caption: "",
    },
    {
        url: "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/77fe05e8-e8ba-4683-dedc-284409274b00/public",
        caption: "",
    },
    {
        url: "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/60ec61e4-3aba-4b27-978a-3c39e5925500/public",
        caption: "",
    },
    {
        url: "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/70982cac-26be-4e23-caf8-1e77847baf00/public",
        caption: "",
    },
    {
        url: "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/fd89c464-2306-499c-10fd-8dfd9736f300/public",
        caption: "",
    },
    {
        url: "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/86803206-457c-4809-6fcb-7ffa319c0000/public",
        caption: "",
    },
    {
        url: "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/34ea9340-dbec-455d-b706-1b4f64ba4f00/public",
        caption: "",
    },
    {
        url: "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/04360383-e830-4517-05ae-ca3b632d8200/public",
        caption: "",
    },
    {
        url: "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/0df28b01-b539-43f3-46f3-be69745ee000/public",
        caption: "",
    },
    {
        url: "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/bba32207-4e46-4f92-6e4e-2e6b81965c00/public",
        caption: "",
    },
    {
        url: "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/b21139aa-a93c-4d7f-7152-9fec8accf500/public",
        caption: "",
    },
    {
        url: "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/bfeecbfd-87b1-4b2e-b1e4-a09ca1324f00/public",
        caption: "",
    },
    {
        url: "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/f1b6402a-6932-4057-2500-b9e976c04500/public",
        caption: "",
    },
    {
        url: "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/981607b6-40dd-411b-9559-ae5672ce9000/public",
        caption: "",
    },
    {
        url: "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/e77722d8-7cfd-4374-4571-6ee44de63d00/public",
        caption: "",
    },
    {
        url: "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/d7ce6309-5e72-4b8e-598f-d9739a297d00/public",
        caption: "",
    },
    {
        url: "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/6457dcaa-dac4-4292-0482-31043c92bb00/public",
        caption: "",
    },
    {
        url: "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/45da35a1-2275-4c80-1a5a-9163efa0b500/public",
        caption: "",
    },
    {
        url: "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/32acc613-2652-4ece-f380-45b379e13a00/public",
        caption: "",
    },
    {
        url: "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/cc602f2d-7507-4a4f-f1fa-364482f62400/public",
        caption: "",
    },
    {
        url: "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/265f7def-6486-4883-4475-c40fa5cad300/public",
        caption: "",
    },
    {
        url: "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/88ab4234-1605-47b0-2c86-93f9c2ff0d00/public",
        caption: "",
    },
    {
        url: "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/49fef95b-27f4-4918-404a-77dc448da700/public",
        caption: "",
    },
    {
        url: "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/7c7cd9e1-f090-472e-8c16-0e3fe92bd600/public",
        caption: "",
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
        const lastImage = { url: "assets/img/last.avif", caption: "" };
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
