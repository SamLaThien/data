import fetch from "node-fetch";
import cheerio from "cheerio";
import { chuyenDo } from "./help.js";

const CM_COOKIE = 'PHPSESSID=imk6egj51u5nvkf96l398ihmjk; USER=A9lMWrjHg7By%3AEqt%2F9qALZ0QfZJossNAoi1Snng%2BJWAKT76lADgsHagHF; reada=6335';
let COOKIES = [
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
    "641965|USER=BnwRk9enzE2J%3AaSudlK6xwok5MvC6HjtC8Fy8VTrsL2AeF4nWeBwFqc7c	",
    "666669|USER=EKMapildsClZ%3AcUMENaNXkVRLESyEwHjfAt%2FQtkRCA1MYKg8WKU51hgYQ	",
    "688581|USER=9hIomtcaEwn7%3A%2BTKIc9lBI0atEmKTiQVwU8OQsl7rMrGCQnAFjsIwDtxn	",
    "690084|USER=AmOnvtQNjANJ%3AeIDAln2E%2BWJYHZy1rMHTbAg8x7NofaVH6NX0q%2F2F9Uvf	",
    "713505|USER=ezn6aoRaJOBR%3A4I84mB3H5e3Tlm76vNhawsOuOgSFqbSXpVchtjA2zgMU	",
    "719444|USER=%2B3Np7X4jgC6N%3Azf4rRwhksn38Q6cwcMcgGaZPLoxTVnMjI0ZW%2Biii70kP	",
    "726680|USER=Mjko82dn57qB%3Akfm3Bdh%2BUKkdei385yxhNJKm23yPTGZdTBY%2BTPfGiM%2FA	",
    "730183|USER=bN0oZj4KL0Fb%3AgyniCPXjUthoBSvsQFuWzjrZgTJ2dFZ3klWjefOyyIrJ	",
    "752151|USER=HYmakdnVPtND%3A9VROyvtrtC%2B%2BA0V8bEmVwV7vsaHJfiNTblAePgeSdjoh	",
    "747870|USER=25gUCxVy00QE%3AfRLdLUVJs5gWL1WwvtX1gJJNBFvZ8JlgMnSv8EYTqSD1	",
    "747872|USER=82zSLoCkMOja%3AsSSqLIuk1jr9BXpdY6urVpiWkPnjtsl8NIM%2Fmj37a74k	",
    "747875|USER=HLKLUZhJ1D0k%3AXSZSRKfNSZZ%2FbitKLszA3Pey45sn367Saph2c2JarxEA	",
    "747876|USER=4%2FgJdSc8Mdz3%3AV%2FE5gBM6BwTSrMJxy5MOadGHvxNXJVjqQeJZcrvrVd9f	",
    "747879|USER=m066tV9S3oXK%3AaVtXWtuqD4wh3z8wlhlPSAL1r10T2HA8MhUruUc3DAg1	",
    "747882|USER=M%2BcxlyK8yMyD%3AFUd%2ByQMcxOvwplZ4S3wNkCrXysXC8h%2F8BqS8mjKObRfT	",
    "747884|USER=qQDn6aAXCxbM%3AS6d62AJhIUKVlB157SqQJc6oMCVYTbXxXNxbFwv2rriL	",
    "747885|USER=0vxJzyNkbVXd%3AUZckjW3BEJIwy0RS%2FwRkSLnxfsxk3MTGI3KqDVKZ3QII	",
    "747886|USER=gaamxz3gNukN%3AY9Heb%2FZHTgevJt3zc1OuuZY5A7J1Yl4szinnPN94Gmyk	",
];

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

setTimeout(async () => {
    console.log('Bắt đầu check ltd và tbb');
    console.log("=================" + (new Date()).toString() + "==================");
    for (let i = 0; i < COOKIES.length; i++) {
        console.log(i + '/' + COOKIES.length)
        const userid = COOKIES[i].split('|')[0];
        if (userid == 21497) continue;
        const cookie = COOKIES[i].split('|')[1];
        const res = await fetchNhanVat(cookie);
        console.log(`Acc ${userid} ${res}`);
        const amount_ltd = res.split('Đang có ')[1].split(' ltd')[0];
        const amount_tbb = res.split(' và ')[1].split(' tbb')[0];
        await delay(5000)
        if (isNaN(amount_tbb)) { chuyenDo(CM_COOKIE, userid, 19, 50); }
        if (res.includes('Mộc')) {
            if (amount_tbb < 30)
                chuyenDo(CM_COOKIE, userid, 19, 50);
        } else {
            if (amount_ltd < 30) {
                chuyenDo(CM_COOKIE, userid, 77, 50);
            }
            await delay(3000);
            if (amount_tbb < 30) {
                chuyenDo(CM_COOKIE, userid, 19, 100);
            }
        }
        await delay(5000)
        const body = await fetchRuong(cookie);
        if (body == "Hành trang của đạo hữu đã đầy, hãy bỏ Túi Trữ Vật vào hành trang để tăng diện tích") {
            await chuyenDo(CM_COOKIE, userid, 12, 10);
            await delay(3000);
            await hanhTrang(cookie, 12, 10);
        }
        await delay(5000)
    }
    console.log('End!!!');
}, 1000);

const fetchNhanVat = async (cookie) => {
    try {
        const response = await fetch("https://tutien.net/account/tu_luyen/nhan_vat/", {
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

        const body = await response.text();
        const $ = cheerio.load(body);
        const radHe = $("#content > div.row > div.col-md-6.text-center > h4").text()
        const ltd = parseInt($("#hanhtrangnum77").text());
        const tbb = parseInt($("#hanhtrangnum19").text());
        return `${radHe} Đang có ${ltd} ltd và ${tbb} tbb`
    } catch (error) { console.log(error) }
}

const fetchRuong = async (cookie) => {
    try {
        const response = await fetch("https://tutien.net/account/vat_pham/", {
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

        const body = await response.text();
        const $ = cheerio.load(body);
        const ltd = parseInt($('span#shopnum77').text());
        const tbb = parseInt($('span#shopnum19').text());
        if (ltd) await hanhTrang(cookie, 77, ltd);
        await delay(1000);
        if (tbb) await hanhTrang(cookie, 19, tbb);
    } catch (error) { console.log(error) }
}

const hanhTrang = async (cookie, shop, txtNumber) => {
    const body = `btnHanhTrang=1&shop=${shop}&txtNumber2=${txtNumber}`;
    const response = await fetch("https://tutien.net/account/vat_pham/", {
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
            "Referer": "https://tutien.net/account/vat_pham/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": body,
        "method": "POST"
    });
    const res = await response.text();
    if (res == 1) {
        console.log(`Done!!! ids vp${shop} sl ${txtNumber}`)
    } else
        console.log(`${cookie} ${res}`);
    return res;
}