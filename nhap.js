import fetch from "node-fetch";
import cheerio from "cheerio";
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
setTimeout(async () => {
    await fetchBaoKho("PHPSESSID=imk6egj51u5nvkf96l398ihmjk; USER=A9lMWrjHg7By%3AEqt%2F9qALZ0QfZJossNAoi1Snng%2BJWAKT76lADgsHagHF; reada=6335", 'tinhliendenghiep');
    await delay(2000);
    await fetchBaoKho("PHPSESSID=eeiksksgp38h72vm7rk60dtnvp; USER=LFvcd8nVBson%3A1hRzSg8iZZgYhr5lPpvuV8E7AJF2Vg%2FzNBnLHL5tnwt4; reada=1", 'tinhliendenghiep');
    await delay(2000);
    await fetchBaoKho("USER=QRhPfJMd3ecw%3Avxjd6tgrL9QU%2BMSm6g18xYEezF7aouOdp1%2BuLRyaMtIL; PHPSESSID=ha63ukuhcl447upac04ouhs87b; reada=11", '123456987');
}, 2000);
const fetchBaoKho = async (CM_COOKIE, pass) => {
    const response = await fetch("https://tutien.net/account/bang_phai/bao_kho_duong", {
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
            "cookie": CM_COOKIE,
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET"
    });

    const body = await response.text();
    const $ = cheerio.load(body);
    await nhap(CM_COOKIE, pass);
}
const nhap = async (CM_COOKIE, pass) => {
    const data = "btnLoginBaoKho=1&txtPassword=" + pass;
    const response = await fetch("https://tutien.net/account/bang_phai/bao_kho_duong", {
        "headers": {
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not A Brand\";v=\"99\"",
            "x-requested-with": "XMLHttpRequest",
            "cookie": CM_COOKIE,
        },
        "referrer": "https://tutien.net/account/bang_phai/bao_kho_duong",
        "body": data,
        "method": "POST",
    });
    const body = await response.text();
    if (body === '1') {
        console.log(`[success] Đã Nhập`);
        return;
    }
}