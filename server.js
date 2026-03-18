import { createServer } from "node:http";

const IMAGES = [
    "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/901b704a-a7d3-4660-472e-68af475d2800/public",
    "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/08907a34-ab06-4847-2bdd-d931a1fa5500/public",
    "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/58f8d7a2-2a03-48b2-ba22-723aa4c5df00/public",
    "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/77fe05e8-e8ba-4683-dedc-284409274b00/public",
    "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/60ec61e4-3aba-4b27-978a-3c39e5925500/public",
    "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/70982cac-26be-4e23-caf8-1e77847baf00/public",
    "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/fd89c464-2306-499c-10fd-8dfd9736f300/public",
    "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/86803206-457c-4809-6fcb-7ffa319c0000/public",
    "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/34ea9340-dbec-455d-b706-1b4f64ba4f00/public",
    "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/04360383-e830-4517-05ae-ca3b632d8200/public",
    "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/0df28b01-b539-43f3-46f3-be69745ee000/public",
    "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/bba32207-4e46-4f92-6e4e-2e6b81965c00/public",
    "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/b21139aa-a93c-4d7f-7152-9fec8accf500/public",
    "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/bfeecbfd-87b1-4b2e-b1e4-a09ca1324f00/public",
    "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/f1b6402a-6932-4057-2500-b9e976c04500/public",
    "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/981607b6-40dd-411b-9559-ae5672ce9000/public",
    "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/e77722d8-7cfd-4374-4571-6ee44de63d00/public",
    "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/d7ce6309-5e72-4b8e-598f-d9739a297d00/public",
    "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/6457dcaa-dac4-4292-0482-31043c92bb00/public",
    "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/45da35a1-2275-4c80-1a5a-9163efa0b500/public",
    "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/32acc613-2652-4ece-f380-45b379e13a00/public",
    "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/cc602f2d-7507-4a4f-f1fa-364482f62400/public",
    "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/265f7def-6486-4883-4475-c40fa5cad300/public",
    "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/88ab4234-1605-47b0-2c86-93f9c2ff0d00/public",
    "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/49fef95b-27f4-4918-404a-77dc448da700/public",
    "https://imagedelivery.net/QRBZi0maR7ck29L5mhwtsA/7c7cd9e1-f090-472e-8c16-0e3fe92bd600/public",
];

const LAST_IMAGE_URL = "assets/img/last.avif";
const MIN_WIDTH = 25;
const MAX_WIDTH = 50;

function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function getRandomWidth() {
    return Math.floor(Math.random() * (MAX_WIDTH - MIN_WIDTH + 1) + MIN_WIDTH);
}

let shuffledImages = shuffle([...IMAGES]);
let currentIndex = 0;
let done = false;

const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "http://localhost:8080",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "hx-current-url, hx-request, hx-target, hx-trigger",
};

const server = createServer((req, res) => {
    const url = new URL(req.url, `http://localhost`);

    Object.entries(CORS_HEADERS).forEach(([k, v]) => res.setHeader(k, v));

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }

    if (url.pathname === "/api/reset") {
        shuffledImages = shuffle([...IMAGES]);
        currentIndex = 0;
        done = false;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: true }));
        return;
    }

    if (url.pathname === "/api/next") {
        const acceptsHtml = req.headers["accept"]?.includes("text/html");

        if (done) {
            if (acceptsHtml) {
                res.writeHead(204);
                res.end();
            } else {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ url: LAST_IMAGE_URL, done: true, index: currentIndex, total: IMAGES.length }));
            }
            return;
        }

        let imageUrl;
        let isDone = false;

        if (currentIndex < shuffledImages.length) {
            imageUrl = shuffledImages[currentIndex];
            currentIndex++;
        } else {
            imageUrl = LAST_IMAGE_URL;
            done = true;
            isDone = true;
        }

        if (acceptsHtml) {
            const width = getRandomWidth();
            const html = `<figure style="max-width: ${width}%"><img src="${imageUrl}" alt="" loading="lazy" decoding="async"></figure>`;
            if (isDone) {
                res.writeHead(204);
                res.end();
            } else {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(html);
            }
        } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ url: imageUrl, done: isDone, index: currentIndex, total: IMAGES.length }));
        }
        return;
    }

    res.writeHead(404);
    res.end("Not found");
});

const PORT = process.env.API_PORT || 3000;
server.listen(PORT, () => {
    console.log(`API server running at http://localhost:${PORT}`);
});
