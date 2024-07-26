import fetch from "node-fetch";
import cheerio from "cheerio";

let COOKIES = [
    '3495|USER=2G1hUZ5anHqh%3AOR6O5zt7ieFmlzAVHLc%2BJB%2FIgcK9g51kGYDPia8l7CKB',
    '39834|USER=LQdG92SjBdrN%3A5sdtrylKgqOxEhusLI1nEplHQJO3hoWQ9NaJbvvsme%2FX',
    '80369|USER=avkQNtpDHWVr%3AfimVaxlTwdX8Q1ItABESzORNH%2BbItlR%2BZ2RUDDuebKZP',
    '102180|USER=bDOBMOdJ%2BHTv%3AAnDaWSzbpPmXJC42ENZPC%2B2PGNws9dNUyuIdu630B%2BEJ',
    '111036|USER=IognVspaSb%2B3%3AyoTLuLfd2u78QjA%2FGjOOl%2FuBb3UttcsPMKcfBOCIJQDI',
    '166728|USER=sbV9ZHX%2BBydw%3A6iM3me6KNs9xkcp2OdRW3B8gnIxDnTzggC7iS0FBL8%2Bn',
    '181633|USER=IorVJESVmrCe%3A615AYhgF0WRCF2IAp51hjab0ojCa3gH%2BiQLyggUJWlHA',
    '190798|USER=RuIU0jQSKZVz%3Ai6UiO2K1N4waYXVa1HzPsWmszbIAcGsqbgjh9MGA0uKk',
    '197365|USER=ehsalMBXNFLG%3A4wK8hBxpwtORHBt5oVvNnb%2Br15z%2BtMrbPkbEMBVrv2JR',
    '305001|USER=mHHWsODLdBuC%3AxDRlK9rmSkvGebgv0xkfxI%2B8G3uYiWfPDmJtNp%2B6%2FF%2Fv',
    '316260|USER=0N%2FEaR1VkLmO%3AUDpZeFTKDojmVgiidaAe%2BYC16T90xKvRz34w53Sqa13v',
    '345932|USER=IZejjm0njeFc%3A0N1emRLCxahtXOqbOvMo1n%2Buv%2BsWBBSxtgNx2GEJ84QK',
    '393039|USER=8eIWYv8F%2Bp2d%3AzB0M60fqTHEId6%2FGClFNOYO5HwrMhPrm%2F7FSXaFC0PqJ',
    '493503|USER=Pi3tRveBUkb8%3AvurP3l%2FODbDZYEOydgx1kvreJvFiR%2FMvlCGged8ZboAe',
    '575672|USER=1Q7zfDBN4zPH%3AxCMl46vKGtxLO0YaL6Q1OQF7li4eiaTr%2F3R2t%2FqyyEnW',
    '575758|USER=u4LMEvqxCO3v%3AIkRvDdJHh4MiJ2s33MykB8oNVY%2FiNLDuMnUd1%2BVNp6Eu',
    '576198|USER=zClrByxboDk3%3A%2BFG4BGEO1oJNBOD3I2OMIpSVB6zD7nqkrXw5E8SonR7Y',
    '619999|USER=0HgdBfFcrY3e%3AyOw5rp2gvqUJK3IsCSLHFZdQrtTxa1OzE%2BvYxSyiagMi',
    '636074|USER=6rU34P73bolm%3AsiNBDUeq474FYzK1muLphcmGX2VymxmrnwRfsSJuhlrZ',
    '636279|USER=i1HHl7LuWJkY%3ApyRZP4MvSP7BNJriMRSA15kQs17bfflYMX4WiyNyj7Cd',
    '641942|USER=fpItrssOV8gZ%3AabZxu59en9dcgPwe%2FauD2TZK55U6o2pTXuIZSVSyOtyp',
    '641947|USER=JeXXnRhpZTfS%3AOCNbSOH0NcjPC%2Fc17AKI%2BnrIPiq%2FopnsL7cqeJjqk3B2',
    '641965|USER=fhinRtEGcp3t%3A6jQudz3vgc%2BBDC%2Fj273tLIpXNgCfMaAEblO3KYF8FYpW',
    '666666|USER=WRrTuzeRcLM0%3ARkfsTUG9B1mL4T0fc0z%2BgKX%2Bbio3SCQSeF5mevrZObEZ',
    '666669|USER=EKMapildsClZ%3AcUMENaNXkVRLESyEwHjfAt%2FQtkRCA1MYKg8WKU51hgYQ',
    '688581|USER=HCiqR6cxOnyh%3AHArHJncPyoxFXM%2FeEhUpKrSpoSM1bRVMXyQzAaQ6V1R9',
    '690084|USER=qZRWd8fuv2QK%3A5EFtkLb78mx6UYDfFMd0%2FPN2U4ae%2Fx0YDshDoBt5SGQj',
    '713505|USER=lyBAJnfEbxNx%3A5zZYpgWIc2rQJQVtziT43YWcIy4Ownjm9q2RUaAOGEFk',
    '719444|USER=EQDL%2B4fmjmA5%3AH8Qt10WV8veFIUZG2I8yVUxpZWZhQfJLiYEIm%2FeNmuHn',
    '726680|USER=zk1zzAyLahrX%3APTjAHHAMXIKr37Uzl0NTiHahr9gt2haRlSeIzPYENhML',
    '730183|USER=97JBFhWPLo2w%3ArkO7OhRUC2XNyfwRyv5B50NMv%2FeIPLxs5QRrT%2FnEyQ3X',
    '747869|USER=HtZsLerGshRD%3AevvORjZHQ7GHFsFE%2BYOWK%2FGWSE7WZSGiiTPw87cDCEof',
    '747870|USER=25gUCxVy00QE%3AfRLdLUVJs5gWL1WwvtX1gJJNBFvZ8JlgMnSv8EYTqSD1',
    '747871|USER=1ERHLP8hm0TG%3A0Cza3ac%2Fn8w%2BgvbS%2BAa7gN1Fcjz%2FmQ9VHSkXp7m%2FBLrR',
    '747872|USER=82zSLoCkMOja%3AsSSqLIuk1jr9BXpdY6urVpiWkPnjtsl8NIM%2Fmj37a74k',
    '747873|USER=ac7tsDXrnAqo%3AltWTHF61qacrjHxMUoUFMVGCwmiCuMihfXVucJhOUvVt',
    '747874|USER=HjmSW%2BU%2BTreE%3AmGh7Gnlo6j7xYDG1tZ1UKJhTbG%2FFmZeFj0lnos4rpOg%2B',
    '747875|USER=HLKLUZhJ1D0k%3AXSZSRKfNSZZ%2FbitKLszA3Pey45sn367Saph2c2JarxEA',
    '747876|USER=4%2FgJdSc8Mdz3%3AV%2FE5gBM6BwTSrMJxy5MOadGHvxNXJVjqQeJZcrvrVd9f',
    '747877|USER=76ztFz3AJNK5%3AjdvLgxGz%2FR3GU%2Ba4qX3sgmxLRT%2F%2FIRV6SmORlpSApeVN',
    '747878|USER=56Mik8xg8TYK%3AY62t%2F%2FOQ0xwQtEHAuLGbx0PutSmk9q%2BwGESZJ1kQAvxz',
    '747879|USER=m066tV9S3oXK%3AaVtXWtuqD4wh3z8wlhlPSAL1r10T2HA8MhUruUc3DAg1',
    '747880|USER=sk5lSOEbbPEa%3AOfqCJI5V8o1tS%2F3JZj%2BYrMV6HB5qA8wfkIEUx45SoSSt',
    '747882|USER=M%2BcxlyK8yMyD%3AFUd%2ByQMcxOvwplZ4S3wNkCrXysXC8h%2F8BqS8mjKObRfT',
    '747884|USER=qQDn6aAXCxbM%3AS6d62AJhIUKVlB157SqQJc6oMCVYTbXxXNxbFwv2rriL',
    '747885|USER=0vxJzyNkbVXd%3AUZckjW3BEJIwy0RS%2FwRkSLnxfsxk3MTGI3KqDVKZ3QII',
    '747886|USER=gaamxz3gNukN%3AY9Heb%2FZHTgevJt3zc1OuuZY5A7J1Yl4szinnPN94Gmyk',

];
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
setTimeout(async () => {
    console.log("=================" + (new Date()).toString() + "==================");
    for (let i = 0; i < COOKIES.length; i++) {
        await CheckNhanVat(i);
        await delay(2000)
    }
}, 2000);

const CheckNhanVat = async (cookieIndex) => {
    let userId = COOKIES[cookieIndex].split('|')[0];
    let userCookie = COOKIES[cookieIndex].split('|')[1].trim();

    const response = await fetch("https://tutien.net/account/tu_luyen/nhan_vat/", {
        "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "accept-language": "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
            "cache-control": "max-age=0",
            "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            "cookie": userCookie,
            "Referer": "https://tutien.net/account/bang_phai/nghi_su_dien/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
    });
    const body = await response.text();
    const $ = cheerio.load(body);
    const name = $('span.truyencv-login-title').text();
    const radHe = $("#content > div.row > div.col-md-6.text-center > h4").text();
    const listSkill = $('h5.strong.text-danger').text().trim();
    const chiSo = $("#content > div.row > div:nth-child(1) > div:nth-child(1) > table").text().replaceAll('\n', ' ').trim();
    const sl_ld = await fetchRuong(userCookie);
    const nameSkill = 'Thuần Thú Thuật';
    //if (listSkill.includes(nameSkill)) {
    //    console.log('Có Skill')
    //} else {
    //    await fetchTruyenCong(userId, userCookie, nameSkill);
    //    //await TruyenCong(userCookie, id_skill[parseInt(Random(0, id_skill.length))]) 
    //}

    //console.log(`Acc id ${userId} có ${sl_ld} linh dịch ${radHe} đang có Skill ${listSkill}`)
    console.log(`${radHe} ${listSkill}`)
    //console.log(`Acc id ${userId}|${userCookie}|${radHe}|${chiSo}`)
}
function Random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
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
        return parseInt($('span#shopnum8926').text());
    } catch (error) { console.log(error) }
}

const fetchTruyenCong = async (userId, userCookie, nameSkill) => {
    let listSkill = [];
    const response = await fetch("https://tutien.net/account/bang_phai/truyen_cong_dien/", {
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
            "cookie": userCookie,
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET"
    });

    const body = await response.text();
    const $ = cheerio.load(body);
    const ds = $('h4');
    const button = $('button.btn.btn-warning.btn-block')
    for (let i = 0; i < ds.length; i++) {
        const element = $(ds[i]);
        const name = element.text();
        if (name.includes(nameSkill)) {
            var id = $(button[i]);
            listSkill.push(id.attr("onclick").split('(')[1].split(')')[0]);
        }
    }
    const rd = [parseInt(Random(0, listSkill.length))];
    await TruyenCong(userId, userCookie, parseInt(listSkill[rd]));
}

const TruyenCong = async (userId, cookie, truyencong_id) => {
    const response = await fetch("https://tutien.net/account/bang_phai/truyen_cong_dien/", {
        "headers": {
            "accept": "*/*",
            "accept-language": "vi,en;q=0.9,en-GB;q=0.8,en-US;q=0.7",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": "\"Not/A)Brand\";v=\"99\", \"Microsoft Edge\";v=\"115\", \"Chromium\";v=\"115\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
            "cookie": cookie,
            "Referer": "https://tutien.net/account/bang_phai/truyen_cong_dien/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": `btnNhanTruyenCong=1&truyencong_id=${truyencong_id}`,
        "method": "POST"
    });
    const res = await response.text();
    console.log(res);
    if (res == "Đạo hữu không đủ điếm cống hiến để nhận truyền công!") {
        await changeCongHien(userId, 99999999);
    }
}

const changeCongHien = async (userid, amount) => {
    const body = "btnDoiMemberBang=1&member_id=" + userid + "&txtTenMoi=&txtCongHien=" + amount + "&selQuyenHan=0&chkDongThien=0";
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
            "cookie": 'PHPSESSID=imk6egj51u5nvkf96l398ihmjk; USER=A9lMWrjHg7By%3AEqt%2F9qALZ0QfZJossNAoi1Snng%2BJWAKT76lADgsHagHF; reada=6335'
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
}