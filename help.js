import fetch from "node-fetch";
import cheerio from "cheerio";
import proxyAgentP from 'https-proxy-agent';
const { HttpsProxyAgent } = proxyAgentP;
export let proxies = [
];

const getProxyByIndex = (index) => {
    const proxyCount = proxies.length;
    const proxy = proxies[random(index, proxyCount)];
    return new HttpsProxyAgent(proxy);
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function chuyenDo(CM_COOKIE, user, item, amount) {
    const response = await fetch("https://tutien.net/account/bang_phai/bao_kho_duong", {
        //agent: getProxyByIndex(0),
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
    if (body.includes('Mật mã bang:')) {
        await nhap(CM_COOKIE);
        await delay(2000);
        return await chuyenVatPham(CM_COOKIE, user, item, amount)
    } else {
        return await chuyenVatPham(CM_COOKIE, user, item, amount)
    }
}
const nhap = async (CM_COOKIE) => {
    const data = "btnLoginBaoKho=1&txtPassword=nuoisamhamga";
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
        console.log(`[success] Đã nhập`);
        return;
    }
}

export async function chuyenVatPham(CM_COOKIE, user, item, amount) {
    const formEncoded = `btnChuyenVatPham=1&shop=${item}&txtNumber=${amount}&txtMember=${user}`;
    const response = await fetch("https://tutien.net/account/bang_phai/bao_kho_duong", {
        "headers": {
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not A Brand\";v=\"99\"",
            "x-requested-with": "XMLHttpRequest",
            "cookie": CM_COOKIE,
        },
        "referrer": "https://tutien.net/account/bang_phai/bao_kho_duong",
        "body": formEncoded,
        "method": "POST",
    });

    const body = await response.text();
    if (body === '1') {
        console.log(`[success] Chuyển ${amount} vật phẩm ${item} cho ${user}`);
    } else {
        console.log(`[chuyenDo erro ${user}${body}]`);
    }

    return body;
}

export async function chuyenBac(fromId, toId, amount) {
    const referrer = `https://tutien.net/member/${toId}`;
    const body = `btntangNganLuong=1&txtMoney=${amount}&member=${toId}`;
    const response = await fetch("https://tutien.net/index.php", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9,vi;q=0.8",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not A Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
            "cookie": "USER=Zf2CHIgzwART%3Au542MCcAWKHgrQ6bNfZRRg9z4gmOl6noVHa3Q5WGRyUp",
        },
        referrer,
        "referrerPolicy": "strict-origin-when-cross-origin",
        body,
        "method": "POST",
        "mode": "cors"
    });

    const res = await response.text();
    if (res == '1') {
        console.log(`[success] ${amount} bạc: ${fromId} => ${toId}`)
    } else {
        console.log(`[${res}] ${amount} bạc: ${fromId} => ${toId}`);
    }
    return res === '1';
}
