import fetch from "node-fetch";
import cheerio from "cheerio";
const cookie = 'USER=Zf2CHIgzwART%3Au542MCcAWKHgrQ6bNfZRRg9z4gmOl6noVHa3Q5WGRyUp';
const ntc = 25;
const ttt = 32;
const tnt = 33;
const hlt = 24;
const tlq = 26;
const ukt = 23;
const att = 63;
const hnt = 65;
const ltt = 7906;
const dlt = 33204;
const hnt2 = 30497;

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchDuocVienCaNhan(checkCo = false) {
    const response = await fetch("https://tutien.net/account/tu_luyen/duoc_vien/", {
        "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "en-US,en;q=0.9,vi;q=0.8",
            "cache-control": "max-age=0",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            cookie,
        },
        "referrer": "https://tutien.net/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors"
    });

    const body = await response.text();
    const $ = cheerio.load(body);

    const dangTrongs = $('button[id^="div_linhdien_"]');
    const LinhDien = 6;
    if (dangTrongs.length < LinhDien) {
        for (let x = dangTrongs.length; x < LinhDien; x++) {
            trongCo(ttt);
            delay(5000);
        }
        return;
    }

    for (let i = 0; i < dangTrongs.length; i++) {
        const element = $(dangTrongs[i]);
        const dvClasses = element.attr("class");
        if (!element.is(':disabled') && dvClasses) {
            const dvClasses = element.attr("class");
            const dvId = element.attr('id').replace('div_linhdien_', '');
            if (dvClasses.includes("btn-danger")) {
                console.log(`Dược viên ${i + 1} - Tưới nước!`);
                await tuoiNuoc(dvId);
            } else {
                console.log(`Dược viên ${i + 1} - Thu hoạch!`);
                await thuHoach(dvId);
            }
        } else {
            console.log(`Dược viên ${i + 1} - Chờ.......`);
        }
    }
}

export async function trongCo(coId) {
    if (coId == 0) {
        return;
    }

    const body = "btnGieoHat=1&selDuocThao=" + coId + "&chkThueTuoi=0&chkBaoVe=0&txtTinhNhanh=0";
    const response = await fetch("https://tutien.net/account/tu_luyen/duoc_vien/", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9,vi;q=0.8",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
            cookie,
        },
        "referrer": "https://tutien.net/account/tu_luyen/duoc_vien/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": body,
        "method": "POST",
        "mode": "cors"
    });

    const bodyText = await response.text();
    console.log('Gieo hạt thành công, tổng số bạc phải trả là ' + bodyText)
}


export async function tuoiNuoc(duocVienId) {
    const body = 'btnTuoiNuoc=1&duocvien_id=' + duocVienId;
    await fetch("https://tutien.net/account/tu_luyen/duoc_vien/", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9,vi;q=0.8",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
            cookie,
        },
        "referrer": "https://tutien.net/account/tu_luyen/duoc_vien/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": body,
        "method": "POST",
        "mode": "cors"
    });
}

export async function thuHoach(duocVienId) {
    const body = 'btnThuHoach=1&duocvien_id=' + duocVienId;
    await fetch("https://tutien.net/account/tu_luyen/duoc_vien/", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9,vi;q=0.8",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
            cookie,
        },
        "referrer": "https://tutien.net/account/tu_luyen/duoc_vien/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": body,
        "method": "POST",
        "mode": "cors"
    });
}

setInterval(async () => {
    console.log("=================" + (new Date()).toString() + "==================");
    await fetchDuocVienCaNhan();
}, 60 * 1000);
