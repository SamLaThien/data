import fetch from "node-fetch";
import cheerio from "cheerio";
import proxyAgentP from 'https-proxy-agent';
import { chuyenDo, chuyenBac } from "./help.js";
const { HttpsProxyAgent } = proxyAgentP;

let proxyAgent;
const CM_COOKIE = "PHPSESSID=1aeqhcrjkop33u754asjlt8iej; USER=%2FXPxkg1yaSLJ%3AFcGE1xXdWniG1S5ew7Qq821bEYAIMJll7qTmo7NM6Q59; reada=376";
const getProxyByIndex = (index) => {
    const proxyCount = proxies.length;
    const proxy = proxies[index % proxyCount];
    return proxyAgent = new HttpsProxyAgent(proxy);
}
let proxies = [
    "http://user49200:R8U9NKjtfw@103.79.141.20:49200",
    "http://user49208:jYRUzfMZfG@103.3.246.132:49208",
    "http://user49180:tueYfqZVjs@103.121.91.219:49180",
    "http://user49316:Kitpi4FVZI@103.3.246.218:49316",
    "http://user49185:xoSrHFalQT@103.79.141.39:49185",
    "http://user49088:hRK8mwsoRK@103.121.91.153:49088",
    "http://user49147:frpy36nvc6@103.162.31.76:49147",
    "http://user49056:lujJCxQwRX@103.187.168.121:49056",
    "http://user49051:ThJpoaqgHZ@103.79.141.24:49051",
    "http://user49066:WFenHZBWjY@103.121.91.221:49066",
    "http://user49392:wz5C5t2G8Y@103.3.244.102:49392",
    "http://user49199:F0DttM0IPd@103.121.89.235:49199",
    "http://user49080:CkWvD9WpoV@103.121.91.155:49080",
    "http://user49145:GaZ5bpku2G@103.162.30.83:49145",
    "http://user49125:w79F4BBSIg@103.162.30.27:49125",
    "http://user49159:IkngppccUQ@45.124.84.19:49159",
    "http://user49198:jcaxJHKWrD@103.79.141.56:49198",
    "http://user49095:mWf9BiufXL@103.187.168.19:49095",
    "http://user49115:QE6SyqMIvP@103.3.246.47:49115",
    "http://user49114:flcC9IHXst@103.79.141.50:49114",
    "http://user49040:NqnpD7Xmse@103.187.168.17:49040",
    "http://user49051:Ks4QKE175W@103.162.30.75:49051",
    "http://user49140:yN96LxOGjp@103.187.168.91:49140",
    "http://user49151:TWHqMsJlwd@103.79.141.77:49151",
    "http://user49110:iHXdatIiEX@103.3.244.102:49110",
    "http://user49137:FipN2OnODQ@103.187.168.70:49137",
    "http://user49003:8FeINz6MVk@103.3.246.26:49003",
    "http://user49296:WvsvUQfIJ3@103.3.244.102:49296",
    "http://user49167:J5I2kDzn0C@103.79.141.49:49167",
    "http://user49144:chTXOZatv5@103.3.246.125:49144",
    "http://user49030:pFJk4kvxl4@103.121.90.206:49030",
    "http://user49240:yPqICptfqD@103.3.246.132:49240",
    "http://user49042:9eYbrbA5ZS@103.162.31.77:49042",
    "http://user49124:uALgoVBJAc@103.3.246.132:49124",
    "http://user49180:en5nUOqCVa@103.3.246.218:49180",
    "http://user49111:opMT74KNDB@103.162.30.29:49111",
    "http://user49058:fyDNXY2qsj@103.79.141.81:49058",
    "http://user49021:evTxiHEOtO@103.187.168.114:49021",
    "http://user49179:rgOHR5caDZ@103.187.168.34:49179",
    "http://user49180:foxj8OGKDa@103.3.246.125:49180",
    "http://user49051:OAOpZpG9Ea@103.3.244.132:49051",
    "http://user49006:R0glVVp7cy@103.79.141.77:49006",
    "http://user49156:LOozwOAJJl@103.79.141.51:49156",
    "http://user49161:QPcwy73Amd@103.162.31.67:49161",
    "http://user49009:FEz5OuxGf2@103.3.244.132:49009",
    "http://user49105:58MA9M86xf@103.162.30.69:49105",
    "http://user49148:3pnpG1smt5@103.79.141.11:49148",
    "http://user49150:ANEFL29WTL@103.79.141.66:49150",
    "http://user49242:r9UkP3TaJH@103.162.31.71:49242",
    "http://user49083:VnyYueoUnn@103.187.168.98:49083",
];
let cookies = [
    "747869 USER=HtZsLerGshRD%3AevvORjZHQ7GHFsFE%2BYOWK%2FGWSE7WZSGiiTPw87cDCEof	",
    "747870 USER=25gUCxVy00QE%3AfRLdLUVJs5gWL1WwvtX1gJJNBFvZ8JlgMnSv8EYTqSD1	",
    "747871 USER=1ERHLP8hm0TG%3A0Cza3ac%2Fn8w%2BgvbS%2BAa7gN1Fcjz%2FmQ9VHSkXp7m%2FBLrR	",
    "747872 USER=82zSLoCkMOja%3AsSSqLIuk1jr9BXpdY6urVpiWkPnjtsl8NIM%2Fmj37a74k	",
    "747873 USER=ac7tsDXrnAqo%3AltWTHF61qacrjHxMUoUFMVGCwmiCuMihfXVucJhOUvVt	",
    "747874 USER=HjmSW%2BU%2BTreE%3AmGh7Gnlo6j7xYDG1tZ1UKJhTbG%2FFmZeFj0lnos4rpOg%2B	",
    "747875 USER=HLKLUZhJ1D0k%3AXSZSRKfNSZZ%2FbitKLszA3Pey45sn367Saph2c2JarxEA	",
    "747876 USER=4%2FgJdSc8Mdz3%3AV%2FE5gBM6BwTSrMJxy5MOadGHvxNXJVjqQeJZcrvrVd9f	",
    "747877 USER=76ztFz3AJNK5%3AjdvLgxGz%2FR3GU%2Ba4qX3sgmxLRT%2F%2FIRV6SmORlpSApeVN	",
    "747878 USER=56Mik8xg8TYK%3AY62t%2F%2FOQ0xwQtEHAuLGbx0PutSmk9q%2BwGESZJ1kQAvxz	",
    "747879 USER=m066tV9S3oXK%3AaVtXWtuqD4wh3z8wlhlPSAL1r10T2HA8MhUruUc3DAg1	",
    "747880 USER=sk5lSOEbbPEa%3AOfqCJI5V8o1tS%2F3JZj%2BYrMV6HB5qA8wfkIEUx45SoSSt	",
    "747881 USER=tm6g%2FLfP%2FbBV%3A2hdCpEWONmCflOi1s6e6v4kdHQaGEqG4bF9YAwtA1tNL	",
    "747882 USER=M%2BcxlyK8yMyD%3AFUd%2ByQMcxOvwplZ4S3wNkCrXysXC8h%2F8BqS8mjKObRfT	",
    "747883 USER=j464xTPLWMmJ%3A9%2Bstk%2FpUjlhm%2FlB%2FbObdkb8ScaRzY2MqFfeNpC8JpQJs	",
    "747884 USER=qQDn6aAXCxbM%3AS6d62AJhIUKVlB157SqQJc6oMCVYTbXxXNxbFwv2rriL	",
    "747885 USER=0vxJzyNkbVXd%3AUZckjW3BEJIwy0RS%2FwRkSLnxfsxk3MTGI3KqDVKZ3QII	",
    "747886 USER=gaamxz3gNukN%3AY9Heb%2FZHTgevJt3zc1OuuZY5A7J1Yl4szinnPN94Gmyk	",
    "747887 USER=g6Djk3kl3PE%2B%3AKQywAbthmc9855EoahFhuNSySOmb0%2FxPZKqMvDF6yryh	",
    "747888 USER=By9aWh%2FThcbu%3AfEoAakO%2F%2Fbdfq0e%2FA2amXSvLwfBz3fjHIaynGeWJitYD	",
    "747889 USER=FRTEKcI6vq6O%3AuWlhxJVFofzoJ4TtkP5uMZAOvkDqKakiViRP2p6%2BkEow	",
    "747890 USER=pRRcjOIXw3R5%3AfPm8%2BgxDeJFpyPkJJ3q6RdCr5G59iuJO2Gg0uC869gm2	",
    "747891 USER=yrCrd%2FNZMTPu%3A6hWrG5K3n23acFIlSAfuIP4b%2Fyq2kAT1tZ%2FHDBQXaGeC	",
    "747892 USER=flbLJ0eI%2BreK%3Ajc7anMN5pt5DhZKWNuL3CunyiO3yoPUE8ByzOyb052rr	",
    "747893 USER=GMMyjUsSV%2FGM%3AgWt9Mi3adWyrCEK0WynNtPdUAWpkiI%2BwDRGA4ja6h6Cv	",
    "747894 USER=y4jcGg75b4Tm%3AGrY13wIwLfh8jiGjTizZIzKPK%2BjyYglnCU4aE83G9zo4	",
    "747895 USER=w0KqmYNiYAvy%3AmFYyDJefzMGuPnXPhd4y6S5priKCbA%2BcYIoBMaJ7deGe	",
    "747896 USER=8c5LkoJZOak8%3AbSVx2%2B%2B0MZKkkPQz7P9GmknbnqQboXd89sttstD4%2BKT9	",
    "747897 USER=N2ijodFf8yLl%3AFj%2Bek2vfqFfkJUyie5734TvcgDwS0ow5bGA5mc5Ecl09	",
    "747898 USER=s%2Fg5vcBipYx7%3Ae%2B0PNwB75b4%2FQltVgsqFC5%2BNej8SmNh%2FMvZEXs4vyzTE	",
    "747899 USER=kFSahWlPPcKs%3Ax1zpET%2BkUPM10%2Bk0LdgmWxLCxCsQYX4xpkBRhRHM6L8w	",
    "747900 USER=6vboN9%2FcnDIj%3AiMSnXLNlK6H6%2By7BcJTrNpNlnM3PgLp7r6N%2FA8iu6xLL	",
    "747901 USER=F2fpQAfkomKh%3Ay%2FrLJZrL4PSmYqDELOMRkr%2FUm8zEhCqAQYC9ooGO8UK6	",
    "747902 USER=ZJHOxf3ebQnK%3ARtAcQQ5v58HK6bKhcPuMt7BclEXkvc64Bwf6TXlscnel	",
    "747903 USER=Wz8lAJliDRrA%3AAVaVZzft8uxVK90nmT19mUHTLhSUatHd2d33GMDs1vtk	",
    "747904 USER=%2BXT3HExpvIBM%3AKGx5Rb4F%2FV6iY1pbO1hHqF6h5dx6jew%2FT6yHEuxW2Mcy	",
    "747905 USER=%2BXAptT4ud3c9%3Ak1tZzvzjIHeHf8%2B3Daf6SzC5UflH6IKsgEXiTHovP38w	",
    "747906 USER=0tDMYRDz7kGe%3A%2FpzHKYdTxBD%2BSwWHZIxU9%2FcotXL6IZFlIRqaQGYW0X3T	",
    "747907 USER=Qwe0H0am1oVl%3ArAZY%2F0vg2Z6y7cHP5M7fb9ZDe0bn%2B1da7v%2F9PqZcNHuS	",
    "747908 USER=tWTTzWdO0tPQ%3AxHKy%2FcjRI9mYJiDSE%2BhQ2XEkv05bWu%2FQDdFGsW5jRNg5	",
    "747909 USER=B5yFbGvkfGbZ%3ARN80wdFefCOU8TunodiOkHcD9AnAdP6Ju%2FyDYU%2BHq1bZ	",
    "747910 USER=B7sWnuzarJ8h%3AvqGke3rV7kYj8tfXzyYUK71FMYFLoBFJdhoQkygwITOT	",
    "747911 USER=3im7wpIKH%2Bm1%3Ayi72Z4zwABrLWG1YXf0j%2Fop%2FfMwS0GQremoSEV5iQwiR	",
    "747912 USER=epHh%2FueE3Wr4%3A8wav8BId6Iv3MMiiUM%2F4FyR43ysEVIRh2SH7GA3lronV	",
    "747913 USER=lVBqcmrcxe9g%3AGJQcexR2faPEw26sxxoirPx73GE7WM5VCcI7W7YCrUqV	",
    "747914 USER=4I8QdNyRNEzK%3AWuZA7h5b11j%2FxOr0S3JfN0Kx57dRTZBAvDP4n%2FEzMMhs	",
    "747915 USER=lcks%2FFXWpa%2B3%3AxbW%2ByrkHPBRb35oWCSuCOO8SkAmenfMiTfldPh0FCuZz	",
    "747916 USER=%2FuhH2Cp60Nsg%3AFQfoEI6IQiQC%2BgXOIFZx7NXykPGYy5wJTw0CXQIfy0Ub	",
    "747917 USER=BMkgJQDnPqBf%3A5tjjfpIsTH9AoyKaJdNV9LZYYlfADk6%2BqlnGk2zzJWQI	",
    "747933 USER=S2PF9qDsYz%2Fe%3AJKtgc%2BGK6hMyxXYNOh5kg%2BHBLruSMvSCO4aQ5DWOeCLh	",
];

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

setTimeout(async () => {
    for (let i = 0; i < cookies.length; i++) {
        console.log(i + "/" + cookies.length);
        await NhiemVuDuong(i);
        await delay(5000)
    }
}, 3000);


const NhiemVuDuong = async (cookieIndex) => {
    let userId = cookies[cookieIndex].split(' ')[0];
    let userCookie = cookies[cookieIndex].split(' ')[1].trim();
    if (!userCookie.includes('USER')) {
        userCookie = `USER=${userCookie}`;
    }

    const response = await fetch("https://tutien.net/account/nhiem_vu/", {
        agent: getProxyByIndex(cookieIndex),
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
    const nhiem_vu = $('div.col-xs-2.col-md-4.col-sm-4').text();
    if (!nhiem_vu) { await nhanNhiemVu(userCookie); return }
    else
        console.log(nhiem_vu);
    const nv_id = $('div[id^="nv_"]').attr('id').replace('nv_', "");
    if (nhiem_vu.includes('Tham gia đánh boss') || nhiem_vu.includes('Tăng ít nhất') || nhiem_vu.includes('Chiến thắng') || nhiem_vu.includes('Chơi 50') || nhiem_vu.includes('Đào')) {
        await huyNhiemVu(userCookie, nv_id);
    }

    if (nhiem_vu.includes('Mua 10 vé lô tô')) {
        await chuyenBac("AUTO", userId, 2000);
        await delay(2000);
        await Loto(userCookie);
        await delay(2000);
        await traNhiemVu(userCookie, nv_id);
    }
    //if (nhiem_vu.includes('Tăng kinh nghiệm')) {
    //    await chuyenDo(CM_COOKIE, userId, 40420, 1);
    //    await delay(2000);
    //    await Loto(userCookie);
    //    await delay(2000);
    //    await traNhiemVu(userCookie, nv_id);
    //}
    if (nhiem_vu.includes('Bái phỏng Thần Thú')) {
        await chuyenDo(CM_COOKIE, userId, 40420, 1);
        await delay(3000);
        await thamHoi(userCookie);
        await delay(2000);
        await traNhiemVu(userCookie, nv_id);
    }
}

async function nhanNhiemVu(userCookie) {
    const body = `btnNhanNhiemVu=1`;
    const res = await fetch("https://tutien.net/account/nhiem_vu/", {
        agent: proxyAgent,
        "headers": {
            "authority": "tutien.net",
            "origin": "https://tutien.net",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
            "referer": "https://tutien.net/account/nhiem_vu/",
            "x-requested-with": "XMLHttpRequest",
            "cookie": userCookie
        },
        "referrer": "https://tutien.net/account/nhiem_vu/",
        "body": body,
        "method": "POST",
    });
    const data = await res.text();
    if (data === '1') {
        console.log("Đã Nhận NV")
        return;
    } else { console.log(data) }
}

async function traNhiemVu(userCookie, nhiemvu_id) {
    const body = `btnTraNhiemVu=1&nhiemvu_id=${nhiemvu_id}`;
    const res = await fetch("https://tutien.net/account/nhiem_vu/", {
        agent: proxyAgent,
        "headers": {
            "authority": "tutien.net",
            "origin": "https://tutien.net",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
            "referer": "https://tutien.net/account/nhiem_vu/",
            "x-requested-with": "XMLHttpRequest",
            "cookie": userCookie
        },
        "referrer": "https://tutien.net/account/nhiem_vu/",
        "body": body,
        "method": "POST",
    });
    const data = await res.text();
    if (data === '1') {
        console.log("Đã Trả NV")
        return;
    }
    if (data.includes('Rất tiếc đạo hữu')) {
        await delay(2000);
        await huyNhiemVu(userCookie, nhiemvu_id);
    }
}

async function huyNhiemVu(userCookie, nhiemvu_id) {
    const body = `btnHuyNhiemVu=1&&nhiemvu_id=${nhiemvu_id}`;
    const res = await fetch("https://tutien.net/account/nhiem_vu/", {
        agent: proxyAgent,
        "headers": {
            "authority": "tutien.net",
            "origin": "https://tutien.net",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
            "referer": "https://tutien.net/account/nhiem_vu/",
            "x-requested-with": "XMLHttpRequest",
            "cookie": userCookie
        },
        "referrer": "https://tutien.net/account/nhiem_vu/",
        "body": body,
        "method": "POST",
    });
    const data = await res.text();
    if (data === '1') {
        console.log("Đã Hủy NV")
        return;
    }
}

async function Loto(userCookie) {
    const body = `btnMuaVeLoto=1&txtSoLuong=10`;
    const res = await fetch("https://tutien.net/lo-to/", {
        agent: proxyAgent,
        "headers": {
            "authority": "tutien.net",
            "origin": "https://tutien.net",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
            "referer": "https://tutien.net/account/bang_phai/dong_thien/",
            "x-requested-with": "XMLHttpRequest",
            "cookie": userCookie
        },
        "referrer": "https://tutien.net/lo-to/",
        "body": body,
        "method": "POST",
    });
    const data = await res.text();
    if (data === '1') {
        console.log(data)
        return;
    } else { console.log(data) }
}

async function thamHoi(userCookie) {
    const body = `btnThamHoi=1&boss_id=16`;
    const res = await fetch("https://tutien.net/account/bang_phai/than_thu/", {
        agent: proxyAgent,
        "headers": {
            "authority": "tutien.net",
            "origin": "https://tutien.net",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
            "referer": "https://tutien.net/account/bang_phai/than_thu/",
            "x-requested-with": "XMLHttpRequest",
            "cookie": userCookie
        },
        "referrer": "https://tutien.net/account/bang_phai/than_thu/",
        "body": body,
        "method": "POST",
    });
    const data = await res.text();
    if (data === '1') {
        console.log("Bái thành công")
        return;
    }
}

async function daoKhoang(userCookie) {
    const body = `btnDaoKhoang=1&txtHour=6&txtMo=2`;
    const res = await fetch("https://tutien.net/account/tu_luyen/dao_khoang/", {
        agent: proxyAgent,
        "headers": {
            "authority": "tutien.net",
            "origin": "https://tutien.net",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
            "referer": "https://tutien.net/account/tu_luyen/dao_khoang/",
            "x-requested-with": "XMLHttpRequest",
            "cookie": userCookie
        },
        "referrer": "https://tutien.net/account/tu_luyen/dao_khoang/",
        "body": body,
        "method": "POST",
    });
    const data = await res.text();
    if (data === '1') {
        console.log("Đào Khoáng")
        return;
    }
}

//async function Ott(userCookie) {
//    const res = await fetch("https://tutien.net/oan-tu-ti/", {
//        agent: proxyAgent,
//        "headers": {
//            "authority": "tutien.net",
//            "origin": "https://tutien.net",
//            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
//            "referer": "https://tutien.net/account/bang_phai/dong_thien/",
//            "x-requested-with": "XMLHttpRequest",
//            "cookie": userCookie
//        },
//        "referrer": "https://tutien.net/oan-tu-ti/",
//        "body": body,
//        "method": "POST",
//    });
//    const data = await res.text();
//    if (data === '1') {
//        return;
//    }
//}