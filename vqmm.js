import fetch from "node-fetch";
import cheerio from "cheerio";
import proxyAgentP from 'https-proxy-agent';
const { HttpsProxyAgent } = proxyAgentP;

let proxyAgent;
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
    "USER=4I8QdNyRNEzK%3AWuZA7h5b11j%2FxOr0S3JfN0Kx57dRTZBAvDP4n%2FEzMMhs	",
    "USER=s%2Fg5vcBipYx7%3Ae%2B0PNwB75b4%2FQltVgsqFC5%2BNej8SmNh%2FMvZEXs4vyzTE	",
    "USER=8c5LkoJZOak8%3AbSVx2%2B%2B0MZKkkPQz7P9GmknbnqQboXd89sttstD4%2BKT9	",
    "USER=9hIomtcaEwn7%3A%2BTKIc9lBI0atEmKTiQVwU8OQsl7rMrGCQnAFjsIwDtxn	",
    "USER=pRRcjOIXw3R5%3AfPm8%2BgxDeJFpyPkJJ3q6RdCr5G59iuJO2Gg0uC869gm2	",
    "USER=F2fpQAfkomKh%3Ay%2FrLJZrL4PSmYqDELOMRkr%2FUm8zEhCqAQYC9ooGO8UK6	",
    "USER=EKMapildsClZ%3AcUMENaNXkVRLESyEwHjfAt%2FQtkRCA1MYKg8WKU51hgYQ	",
    "USER=y4jcGg75b4Tm%3AGrY13wIwLfh8jiGjTizZIzKPK%2BjyYglnCU4aE83G9zo4	",
    "USER=flbLJ0eI%2BreK%3Ajc7anMN5pt5DhZKWNuL3CunyiO3yoPUE8ByzOyb052rr	",
    "USER=IBMoeKjjpad3%3ArY97qtRJi2jyCDvM1rVFK31qkf4r8LVQI4%2BwC%2BblsX%2BP	",
    "USER=w0KqmYNiYAvy%3AmFYyDJefzMGuPnXPhd4y6S5priKCbA%2BcYIoBMaJ7deGe	",
    "USER=kFSahWlPPcKs%3Ax1zpET%2BkUPM10%2Bk0LdgmWxLCxCsQYX4xpkBRhRHM6L8w	",
    "USER=yrCrd%2FNZMTPu%3A6hWrG5K3n23acFIlSAfuIP4b%2Fyq2kAT1tZ%2FHDBQXaGeC	",
    "USER=N2ijodFf8yLl%3AFj%2Bek2vfqFfkJUyie5734TvcgDwS0ow5bGA5mc5Ecl09	",
    "USER=BnwRk9enzE2J%3AaSudlK6xwok5MvC6HjtC8Fy8VTrsL2AeF4nWeBwFqc7c	",
    "USER=ZJHOxf3ebQnK%3ARtAcQQ5v58HK6bKhcPuMt7BclEXkvc64Bwf6TXlscnel	",
    "USER=FRTEKcI6vq6O%3AuWlhxJVFofzoJ4TtkP5uMZAOvkDqKakiViRP2p6%2BkEow	",
    
];

const getProxyByIndex = (index) => {
    const proxyCount = proxies.length;
    const proxy = proxies[index % proxyCount];
    return new HttpsProxyAgent(proxy);
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const call_vqmm = async (cookieIndex) => {
    let userCookie = cookies[cookieIndex].trim();
    if (!userCookie.includes('USER')) {
        userCookie = `USER=${userCookie}`;
    }

    //const response = await fetch("https://tutien.net/account/", {
    //    agent: getProxyByIndex(cookieIndex),
    //    "headers": {
    //        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    //        "accept-language": "en-US,en;q=0.9,vi;q=0.8",
    //        "cache-control": "max-age=0",
    //        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"",
    //        "sec-ch-ua-mobile": "?0",
    //        "sec-ch-ua-platform": "\"macOS\"",
    //        "sec-fetch-dest": "document",
    //        "sec-fetch-mode": "navigate",
    //        "sec-fetch-site": "none",
    //        "sec-fetch-user": "?1",
    //        "upgrade-insecure-requests": "1",
    //        "cookie": userCookie
    //    },
    //    "referrerPolicy": "strict-origin-when-cross-origin",
    //    "body": null,
    //    "method": "GET"
    //});
    //
    //const body = await response.text();
    //const $ = cheerio.load(body);
    //let taiSan = $('.media-body p:nth-child(3)').text().split('Tài sản: ')[1].split(' bạc')[0].replace(/,/g, '');
    //if (parseInt(taiSan) > 1000) {
    try {
        const res = await fetch("https://tutien.net/vong-quay-may-man/?a=play", {
            agent: getProxyByIndex(cookieIndex),
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9,vi;q=0.8",
                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"102\", \"Google Chrome\";v=\"102\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Linux\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest",
                "cookie": userCookie,
                "Referer": "https://tutien.net/vong-quay-may-man/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": null,
            "method": "GET"
        });
        console.log(await res.text());
    } catch (error) {
        console.log(error);
        //console.log("Cookie error: " + userCookie);
    }
    //}
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const now = new Date();
console.log("============ START: " + now.toUTCString() + "============");

const call_vqmm_for_all = async () => {
    for (let i = 0; i < cookies.length; i++) {
        await call_vqmm(i);
        await delay(1000)
    }
    setImmediate(call_vqmm_for_all);
}

(async () => {
    setImmediate(call_vqmm_for_all);
})();