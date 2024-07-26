import fetch from "node-fetch";
import cheerio from "cheerio";

const call = async () => {
    const res = await fetch("https://tutien.net/account/bang_phai/dong_thien/", {
        "headers": {
            "accept": "*/*",
            "accept-language": "vi,en;q=0.9,en-GB;q=0.8,en-US;q=0.7",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Microsoft Edge\";v=\"116\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
            "cookie": "USER=iC09UJlhLbKB%3AG7LjtAFh0E%2FFWu%2Fr7P9OCr5l7TW%2BIgZyo8jxZZjDJBj2",
            "Referer": "https://tutien.net/account/bang_phai/dong_thien/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": "btnActive=1",
        "method": "POST"
    });
    const body = await res.text();
    console.log(body)
    if (typeof body !== 'undefined') {
        const process_exp = body.split('\/')[1].split(')')[0];
        const process_percent = body.split('"process_percent":')[1].split('}')[0];
        console.log(`Tiến độ : ${process_exp} exp  ${process_percent}`);
        if (process_percent == 66) console.log('1111')
        if (process_exp == 6800) console.log('222222')
    }
}

(async () => {
    setImmediate(call);
})();