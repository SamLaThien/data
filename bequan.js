import fetch from "node-fetch";
import cheerio from "cheerio";
import { chuyenDo } from "./help.js";

const COOKIES = [
    "3495|USER=lm3u4fP2VEpS%3AptQf2U%2FkJQeN6P9WxGPZQg363E%2Bm30uP%2FUVKf0TR%2FIjS	",
    "21497|USER=LFvcd8nVBson%3A1hRzSg8iZZgYhr5lPpvuV8E7AJF2Vg%2FzNBnLHL5tnwt4	",
    "39834|USER=0fhDMN6k0GUo%3AVdg90UTnWPvLzABLMmlVoXBNxpyEbybdzD%2BykBzZw30c	",
    "80369|USER=xE6o6H7UK7lp%3AGeceqvG%2BW4PMuhi3rJqPRmBHXz%2BJUIuj0m8E3ipkNXa5	",
    "102180|USER=S9MQFyHelBHs%3AoQPhoZSpwJUzmp%2Blvq3gaFRS9IEjQ557AfuQ0uojzSnq	",
    "111036|USER=B04DpFdabsXY%3AA8lXKU%2FExqToQlt%2BxzZL5eoGIdbVDPVQGkIW4mii12y1	",
    "166728|USER=S7asuiN8V%2F7K%3AErJwQYc3eW3W1jOBHvpJh4T3bdxKma9gmoxPy7YKR4T0	",
    "181633|USER=kIc8e5YgaxWp%3Aa5i2dIv4tEMEmbZc9eU8ac3PGxkm1LdpqiiIihZ2vQl2	",
    "190798|USER=FIaFfwJ7E6Fm%3AGP6oFZxQigaruBYpDHMkr60WBOy4yts5Yzyq393IORQD	",
    "197365|USER=ehsalMBXNFLG%3A4wK8hBxpwtORHBt5oVvNnb%2Br15z%2BtMrbPkbEMBVrv2JR	",
    "228826|USER=pHbGFsqqDrVz%3ApqHCQ6S%2Bwr%2Bv2CXwAa2v%2FNYSWZlHftUMy7EY1r1EOvOY	",
    "246261|USER=wqNu4heAxT4b%3AouHgfHI9VAbfbEs1WDCRcODG9NcGlH8%2Fb71eGAN5XOXK	",
    "305001|USER=Sg3EeMTo2x5j%3AjB%2FluZhRne79rO0cBcO%2FsWvDmAlY9vgz8tmb98VjnULl	",
    "316260|USER=0N%2FEaR1VkLmO%3AUDpZeFTKDojmVgiidaAe%2BYC16T90xKvRz34w53Sqa13v	",
    "345932|USER=3PuK8RYdIKyg%3AwVfH9MRY5cAnNC5pEdErxRNQ1eM7bPfdSo5woK4o39eG	",
    "393039|USER=ZKABgxExLQq%2B%3ADJj1QfvPPAZ0fV9dnq1N8soLFCyY3xzzLOeMX3Sfoin5	",
    "493503|USER=81%2F%2B6KoxYoCi%3Avd5X7o2FXRpzBkYzdJIimEwNOmpfe%2BXHERW1iJYM9SR1	",
    "575672|USER=90reAb%2FK8%2BNp%3AzL%2BPMOFy7uz7j46L5YNzHzZkCPw%2FZ5R%2FLF1mfKNKOmFV	",
    "575758|USER=qu7BFyWYRfhK%3AZ6p9hUWv%2F%2Bwj35YjmEz1GFcRghKgysZotmfFvgtPso9j	",
    "576198|USER=0qYIZRyJOb3i%3AwO2VqX%2FqOHg6rNEENIshqFsgahjJ1a8MSWNUAYx5wcmF	",
    "618888|USER=Zf2CHIgzwART%3Au542MCcAWKHgrQ6bNfZRRg9z4gmOl6noVHa3Q5WGRyUp	",
    "619999|USER=TqXsZ9AC%2BygY%3AL0ui7bLNVVkuvBSZiZ%2Fz%2BUAhJV%2BgKdHcve44n3ISoyC%2F	",
    "636074|USER=5Mnr4NG2fYnU%3A3PptaErZerKz4Vqb9IQapOfTcWp8VkKc3a2FcAzn55Jz	",
    "636279|USER=xkAi1g7CKuWN%3A0FGovW5A9M0Cksqo11fQ2o7MZsVOWiJm4Ymn4MBjGi2T	",
    "641942|USER=ecqnMOeMRVDD%3AxlgLf51k6sTqimkKJX7y0vEuE%2BTOF4RXcmSShrp7hrr7	",
    "666666|USER=WRrTuzeRcLM0%3ARkfsTUG9B1mL4T0fc0z%2BgKX%2Bbio3SCQSeF5mevrZObEZ	",
    "641947|USER=IBMoeKjjpad3%3ArY97qtRJi2jyCDvM1rVFK31qkf4r8LVQI4%2BwC%2BblsX%2BP	",
    "666669|USER=EKMapildsClZ%3AcUMENaNXkVRLESyEwHjfAt%2FQtkRCA1MYKg8WKU51hgYQ	",
    "688581|USER=9hIomtcaEwn7%3A%2BTKIc9lBI0atEmKTiQVwU8OQsl7rMrGCQnAFjsIwDtxn	",
    "690084|USER=AmOnvtQNjANJ%3AeIDAln2E%2BWJYHZy1rMHTbAg8x7NofaVH6NX0q%2F2F9Uvf	",
];

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

setTimeout(async () => {
    console.log("=================" + (new Date()).toString() + "==================");
    for (let i = 0; i < COOKIES.length; i++) {
        let userId = COOKIES[i].split('|')[0];
        let userCookie = COOKIES[i].split('|')[1].trim();
        await chuyenDo("PHPSESSID=imk6egj51u5nvkf96l398ihmjk; USER=A9lMWrjHg7By%3AEqt%2F9qALZ0QfZJossNAoi1Snng%2BJWAKT76lADgsHagHF; reada=6335", userId, 32004, 10);
        await delay(2000);
        await BeQuan(userCookie);
        await delay(2000);
    }
}, 1000);

const BeQuan = async (cookie) => {
    const body = `btnLuyenKhi=1&vatphamphutro=&vatphamphutro[32004]=10`;
    const response = await fetch("https://tutien.net/account/tu_luyen/be_quan/", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9,vi;q=0.8",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
            "cookie": cookie,
            "Referer": "https://tutien.net/account/tu_luyen/be_quan/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": body,
        "method": "POST"
    });
    const res = await response.text();
    if (res == 1) {
        console.log(`Done!!! `)
    } else
        console.log(`${res}`);
    return res;
}