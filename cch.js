import fetch from "node-fetch";
import cheerio from "cheerio";

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const ID = [
    753455,
    753511,
    753950,
    753966,
    753881,
    754061,
    755111,
    754033,
    754049,
    753476,
    755110,
    753904,
    753519,
    753960,
    753509,
    754003,
    753488,
    753982,
    755116,
    753887,
    753451,
    753447,
    753473,
    753533,
    754002,
    753956,
    753468,
    753530,
    753998,
    755101,
    753896,
    754063,
    753873,
    753973,
    755113,
    755114,
    753914,
    753880,
    755102,
    753507,
    753983,
    753943,
    755104,
    753898,
    753963,
    755107,
    753910,
    753542,
    753470,
    753869,
    754041,
    753493,
    755115,
    753947,
    753874,
    753959,
    754045,
    755118,
    753911,
    753485,
    753498,
    753907,
    753937,
    754062,
    753540,
    753496,
    753944,
    753986,
    755105,
    754056,
    753520,
    753951,
    754011,
    755108,
    753469,
    753990,
    754050,
    753984,
    753889,
    755109,
    753961,
    753948,
    753543,
    753893,
    753497,
    753482,
    753988,
    755103,
    754022,
    754016,
    753553,
    753548,
    753877,
    754053,
    754064,
    755117,
    753550,
    753510,
    753905,
    753475,
    754004,
    754018,
    755106,
    753503,
    753949,
    753909,
    753464,
    755112,
    753484,
    753512,
    753492,
    754013,
    754057,
    753882,
    754000,
    755119,
    

];

let index = 0;
var data_mn = '&txtDongThien=';
var data_dtm = '&txtDongThien=';
setTimeout(async () => {
    console.log("=================" + (new Date()).toString() + "==================");
    for (let i = 0; i < ID.length; i++) {
        //console.log(i + "/" + ID.length);
        const account = ID[i];
        await fetchHoSo(account);
        await delay(2000);
    }
}, 1000);

const fetchHoSo = async (ids) => {
    const response = await fetch("https://tutien.net/member/" + ids, {
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
            "cookie": "USER=%2FXPxkg1yaSLJ%3AFcGE1xXdWniG1S5ew7Qq821bEYAIMJll7qTmo7NM6Q59",
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET"
    });

    const body = await response.text();
    const $ = cheerio.load(body);
    let CM_COOKIE;
    let vatPham;
    const overviews = $('.block-detail-sidebar-author .overview');
    let bangPhai = $(overviews[1]).text().trim();
    console.log(ids, bangPhai)
    if (bangPhai == 'Mỹ Nhân') {
        CM_COOKIE = "PHPSESSID=1aeqhcrjkop33u754asjlt8iej; USER=%2FXPxkg1yaSLJ%3AFcGE1xXdWniG1S5ew7Qq821bEYAIMJll7qTmo7NM6Q59; reada=376";
        vatPham = 39388;
        data_mn += `&txtDongThien[]=` + ids;
    } else {
        CM_COOKIE = "PHPSESSID=eeiksksgp38h72vm7rk60dtnvp; USER=LFvcd8nVBson%3A1hRzSg8iZZgYhr5lPpvuV8E7AJF2Vg%2FzNBnLHL5tnwt4; reada=1";
        vatPham = 46084;
        data_dtm += `&txtDongThien[]=` + ids;
    }

    //await chapSuDuong(CM_COOKIE, ids);
    await changeCongHien(CM_COOKIE, ids, 50000);
    //await move(CM_COOKIE, vatPham, 1, ids);
}

const chapSuDuong = async (cookie, ids) => {
    const response = await fetch("https://tutien.net/account/bang_phai/chap_su_duong/", {
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
            "cookie": cookie,
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET"
    });

    const bodyy = await response.text();
    const $ = cheerio.load(body);
    let elms = $('input.form-control.input-sm[name^=txtDongThien]');
    console.log(index);
    data += `&txtDongThien[]=` + ids;
    console.log(data)
    index += 1;
    const body = 'btnHenGioDongThien=1' + data;
    const res = await fetch("https://tutien.net/account/bang_phai/chap_su_duong/", {
        "headers": {
            "accept": "*/*",
            "accept-language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7,de;q=0.6,ja;q=0.5",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not A Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
            "cookie": cookie
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        body,
        "method": "POST",
        "mode": "cors"
    });
}


const changeCongHien = async (CM_COOKIE, userid, amount, quyenHan = 0, dongThien = 0) => {
    const body = "btnDoiMemberBang=1&member_id=" + userid + "&txtTenMoi=&txtCongHien=" + amount + "&selQuyenHan=" + quyenHan + "&chkDongThien=" + dongThien;
    const referrer = "https://tutien.net/account/bang_phai/chap_su_duong/?txtMember=" + userid;
    const response = await fetch("https://tutien.net/account/bang_phai/chap_su_duong/", {
        "headers": {
            "accept": "*/*",
            "accept-language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7,de;q=0.6,ja;q=0.5",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not A Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
            "cookie": CM_COOKIE
        },
        referrer,
        "referrerPolicy": "strict-origin-when-cross-origin",
        body,
        "method": "POST",
        "mode": "cors"
    });
    const res = await response.text();
    if (res == 1) {
        console.log("Done!!!")
    }
    //return await response.text();
}

const move = async (cookie, ID, SL, accountId) => {
    const body = 'btnChuyenVatPham=1&shop=' + ID + '&txtNumber=' + SL + '&txtMember=' + accountId
    const res = await fetch("https://tutien.net/account/bang_phai/bao_kho_duong/", {
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
            "Referer": "https://tutien.net/account/bang_phai/bao_kho_duong/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        body,
        "method": "POST",
    });

    const response = await res.text();
    if (response == 1) {
        console.log(accountId + " Done!!!")
    }
    //return await response.text();
}