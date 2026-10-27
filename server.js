const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 5501;
const BASE_DIR = __dirname;

const MIME_TYPES = {
    ".html": "text/html; charset=UTF-8",
    ".css": "text/css; charset=UTF-8",
    ".js": "text/javascript; charset=UTF-8",
    ".json": "application/json; charset=UTF-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".avif": "image/avif",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon"
};

const server = http.createServer((req, res) => {
    let reqUrl = decodeURIComponent(req.url.split("?")[0]);

    // Default redirects
    if (reqUrl === "/" || reqUrl === "/HTML" || reqUrl === "/HTML/") {
        reqUrl = "/HTML/index.html";
    }

    let filePath = path.normalize(path.join(BASE_DIR, reqUrl));

    // Security check: ensure path is within BASE_DIR
    if (!filePath.startsWith(BASE_DIR)) {
        res.writeHead(403, { "Content-Type": "text/plain" });
        return res.end("Forbidden");
    }

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { "Content-Type": "text/html" });
            return res.end(`<h2>404 Not Found</h2><p>${reqUrl}</p>`);
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || "application/octet-stream";

        res.writeHead(200, {
            "Content-Type": contentType,
            "Access-Control-Allow-Origin": "*"
        });

        fs.createReadStream(filePath).pipe(res);
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/HTML/index.html`);
});
