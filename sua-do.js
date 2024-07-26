import fetch from "node-fetch";
import cheerio from "cheerio";

const ID = [
    190798,
    166728,
    181633,
    39834,
    111036,
    80369,
    576198,
    493503,
    688581,
    619999,
    719444,
    713505,
    102180,
    393039,
    3495,
    316260,
    305001,
    636279,
    636074,
    575758,
    575672,
    641942,
    690084,
    228826,
    246261,
];
setTimeout(async () => {
    console.log("=================" + (new Date()).toString() + "==================");
    for (let i = 0; i < ID.length; i++) {
        await getUserInfo(ID[i]);
        await delay(5000);
    }
    console.log('End!!!');
}, 1000);

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getUserInfo(userid) {
    const url = "https://tutien.net/member/" + userid;
    const response = await fetch(url, {
        "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7,de;q=0.6,ja;q=0.5",
            "cache-control": "max-age=0",
            "sec-ch-ua": "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not A Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            "cookie": "USER=%2FXPxkg1yaSLJ%3AFcGE1xXdWniG1S5ew7Qq821bEYAIMJll7qTmo7NM6Q59",
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors"
    });

    const body = await response.text();
    const $ = cheerio.load(body);

    const items = $('[id^="suaphapkhi"]');
    const pks = [];
    items.each((index, item) => {
        const j = $(item);
        const name = j.find('.text-warning').text().trim();
        const chkItem = j.find('input[name="chkItem"]').first().val();
        const price = j.find('p > small').first().text().trim();
        pks.push({ name, chkItem, price });
    });
    console.log(pks);
}

export async function suaPhapKhi(userid, toId, itemName) {
    const memberUrl = "https://tutien.net/member/" + toId;
    const form = "btnSuaPhapKhi=1&chkItem=" + chkItem;
    const response = await fetch(memberUrl, {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
            "cookie": "USER=%2FXPxkg1yaSLJ%3AFcGE1xXdWniG1S5ew7Qq821bEYAIMJll7qTmo7NM6Q59",
        },
        "body": form,
        "method": "POST"
    });

    const body = await response.text();
    if (body == '1') {
        console.log(`${fromName} - Xong /xga`);
    } else {
        console.log(`${body}`);
    }
    return;
}