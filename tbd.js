import fetch, { FetchError } from "node-fetch";
import cheerio from "cheerio";


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

setTimeout(async () => {
    console.log("=================" + (new Date()).toString() + "==================");
    await fetchtutien();
    await delay(300);
}, 1000);

const fetchtutien = async (cookie) => {
    const response = await fetch("https://tutien.net/san-boss", {
        "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "en-US,en;q=0.9,vi;q=0.8",
            "cache-control": "max-age=0",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            "cookie": "USER=7EMbxaKY5UqP%3AEKpjygjHieuTAo%2BpeEpRrLNj3bCCJ7h1GvanrHoKNCOl"
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET"
    });

    const body = await response.text();
    const $ = cheerio.load(body);
    const vatPham = $('#dorot_').length;
    console.log(body);
    console.log(vatPham);
}