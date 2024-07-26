import fetch from "node-fetch";
import cheerio from "cheerio";
import proxyAgentP from 'https-proxy-agent';
const { HttpsProxyAgent } = proxyAgentP;
let proxyAgent;
let proxies = [
    "http://user49135:9HVt3DJOxa@103.187.168.86:49135",
    "http://user49166:CJr4djSWAp@103.79.141.36:49166",
    "http://user49135:Vels3J8A7r@103.187.168.29:49135",
    "http://user49158:2SfOqtWmYr@103.121.90.206:49158",
    "http://user49151:0XJMzNXQDt@103.162.30.69:49151",
    "http://user49188:GH5xIUq0QE@103.121.89.204:49188",
    "http://user49078:s3DQqEw30A@103.121.89.208:49078",
    "http://user49090:hMlImRV04c@103.79.141.55:49090",
    "http://user49008:huEBJdbB4D@103.162.30.91:49008",
    "http://user49014:gYsbOG1tIv@103.162.31.78:49014",
    "http://user49131:g8evNhUzns@103.79.141.75:49131",
    "http://user49099:JMZMXfNQgh@103.79.141.75:49099",
    "http://user49044:S3qZulkOz7@103.187.168.128:49044",
    "http://user49177:J64DbRp0vP@103.162.30.63:49177",
    "http://user49165:ncwlbWvl7H@103.121.91.21:49165",
    "http://user49093:V0gwJr8VM7@103.79.141.50:49093",
    "http://user49022:vFKPoWC5QK@103.162.31.77:49022",
    "http://user49105:bsG4hP3Zxo@103.161.16.168:49105",
    "http://user49110:I67IxZk3bZ@103.187.169.10:49110",
    "http://user49172:KH0m5ehWzr@103.79.141.139:49172",
    "http://user49103:6lHWx7rFoc@103.121.91.149:49103",
    "http://user49196:P8vnbF63GJ@103.79.141.65:49196",
    "http://user49049:t51WTTSB9Q@103.79.141.66:49049",
    "http://user49099:1ziyep5Abh@103.121.89.199:49099",
    "http://user49125:mXYEO5VT27@103.187.168.19:49125",
    "http://user49108:XWl4qHc07l@103.162.30.78:49108",
    "http://user49131:3vGp7xnDku@103.187.168.36:49131",
    "http://user49092:19w8k92JNJ@103.121.91.221:49092",
    "http://user49324:aolRj4G6la@103.162.31.68:49324",
    "http://user49138:qE1BA8BHSt@103.79.141.34:49138",
    "http://user49086:JesGzv0LqS@103.162.31.61:49086",
    "http://user49013:HyUFcNunZE@103.162.30.75:49013",
    "http://user49096:45k5pQeTFn@103.79.141.65:49096",
    "http://user49159:Uv2DSSqJgy@103.162.30.18:49159",
    "http://user49032:wNNihviZvV@103.187.168.98:49032",
    "http://user49045:DJRIQqcbm8@103.79.141.54:49045",
    "http://user49068:cLvbZnpp5S@103.79.141.77:49068",
    "http://user49010:UeVdYHnGZv@103.187.168.17:49010",
    "http://user49089:p9MX0fnU5n@103.121.90.219:49089",
    "http://user49020:pA4MW5ci13@103.79.143.230:49020",
    "http://user49042:RHnWIRSm0Q@103.79.141.131:49042",
    "http://user49118:nxcTWn7Vj9@103.187.168.97:49118",
    "http://user49463:RVSSo9TOxQ@103.162.31.61:49463",
    "http://user49003:B8oNXIGlG2@103.162.31.78:49003",
    "http://user49179:EwSgJ8TJlp@103.121.90.197:49179",
    "http://user49073:Eo51VlEbOv@103.187.168.87:49073",
    "http://user49055:DNM3J0amQH@103.79.141.179:49055",
    "http://user49165:pGB3tE8nnW@103.187.168.128:49165",
    "http://user49079:RA61gAoNCa@103.121.89.191:49079",


];

const getProxyByIndex = (index) => {
    const proxyCount = proxies.length;
    const proxy = proxies[random(index, proxyCount)];
    return proxyAgent = new HttpsProxyAgent(proxy);
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const COOKIES = [
    "0fhDMN6k0GUo%3AVdg90UTnWPvLzABLMmlVoXBNxpyEbybdzD%2BykBzZw30c",
    "xE6o6H7UK7lp%3AGeceqvG%2BW4PMuhi3rJqPRmBHXz%2BJUIuj0m8E3ipkNXa5",
    "S9MQFyHelBHs%3AoQPhoZSpwJUzmp%2Blvq3gaFRS9IEjQ557AfuQ0uojzSnq",
    "B04DpFdabsXY%3AA8lXKU%2FExqToQlt%2BxzZL5eoGIdbVDPVQGkIW4mii12y1",
    "S7asuiN8V%2F7K%3AErJwQYc3eW3W1jOBHvpJh4T3bdxKma9gmoxPy7YKR4T0",
    "kIc8e5YgaxWp%3Aa5i2dIv4tEMEmbZc9eU8ac3PGxkm1LdpqiiIihZ2vQl2",
    "FIaFfwJ7E6Fm%3AGP6oFZxQigaruBYpDHMkr60WBOy4yts5Yzyq393IORQD",
    "3PuK8RYdIKyg%3AwVfH9MRY5cAnNC5pEdErxRNQ1eM7bPfdSo5woK4o39eG",
    "81%2F%2B6KoxYoCi%3Avd5X7o2FXRpzBkYzdJIimEwNOmpfe%2BXHERW1iJYM9SR1",
    "90reAb%2FK8%2BNp%3AzL%2BPMOFy7uz7j46L5YNzHzZkCPw%2FZ5R%2FLF1mfKNKOmFV",
    "qu7BFyWYRfhK%3AZ6p9hUWv%2F%2Bwj35YjmEz1GFcRghKgysZotmfFvgtPso9j",
    "0qYIZRyJOb3i%3AwO2VqX%2FqOHg6rNEENIshqFsgahjJ1a8MSWNUAYx5wcmF",
    "TqXsZ9AC%2BygY%3AL0ui7bLNVVkuvBSZiZ%2Fz%2BUAhJV%2BgKdHcve44n3ISoyC%2F",
    "5Mnr4NG2fYnU%3A3PptaErZerKz4Vqb9IQapOfTcWp8VkKc3a2FcAzn55Jz",
    "xkAi1g7CKuWN%3A0FGovW5A9M0Cksqo11fQ2o7MZsVOWiJm4Ymn4MBjGi2T",
    "ecqnMOeMRVDD%3AxlgLf51k6sTqimkKJX7y0vEuE%2BTOF4RXcmSShrp7hrr7",
    "IBMoeKjjpad3%3ArY97qtRJi2jyCDvM1rVFK31qkf4r8LVQI4%2BwC%2BblsX%2BP",
    "9hIomtcaEwn7%3A%2BTKIc9lBI0atEmKTiQVwU8OQsl7rMrGCQnAFjsIwDtxn",
    "AmOnvtQNjANJ%3AeIDAln2E%2BWJYHZy1rMHTbAg8x7NofaVH6NX0q%2F2F9Uvf",
    "ezn6aoRaJOBR%3A4I84mB3H5e3Tlm76vNhawsOuOgSFqbSXpVchtjA2zgMU",
    "%2B3Np7X4jgC6N%3Azf4rRwhksn38Q6cwcMcgGaZPLoxTVnMjI0ZW%2Biii70kP",
    "Mjko82dn57qB%3Akfm3Bdh%2BUKkdei385yxhNJKm23yPTGZdTBY%2BTPfGiM%2FA",
    "bN0oZj4KL0Fb%3AgyniCPXjUthoBSvsQFuWzjrZgTJ2dFZ3klWjefOyyIrJ",
    "HYmakdnVPtND%3A9VROyvtrtC%2B%2BA0V8bEmVwV7vsaHJfiNTblAePgeSdjoh",
    "0N%2FEaR1VkLmO%3AUDpZeFTKDojmVgiidaAe%2BYC16T90xKvRz34w53Sqa13v",
    "	lm3u4fP2VEpS%3AptQf2U%2FkJQeN6P9WxGPZQg363E%2Bm30uP%2FUVKf0TR%2FIjS	",
    "	ehsalMBXNFLG%3A4wK8hBxpwtORHBt5oVvNnb%2Br15z%2BtMrbPkbEMBVrv2JR	",
    "	wqNu4heAxT4b%3AouHgfHI9VAbfbEs1WDCRcODG9NcGlH8%2Fb71eGAN5XOXK	",
    "	Sg3EeMTo2x5j%3AjB%2FluZhRne79rO0cBcO%2FsWvDmAlY9vgz8tmb98VjnULl	",
    "	ZKABgxExLQq%2B%3ADJj1QfvPPAZ0fV9dnq1N8soLFCyY3xzzLOeMX3Sfoin5	",
    "	WRrTuzeRcLM0%3ARkfsTUG9B1mL4T0fc0z%2BgKX%2Bbio3SCQSeF5mevrZObEZ	",
    "	EKMapildsClZ%3AcUMENaNXkVRLESyEwHjfAt%2FQtkRCA1MYKg8WKU51hgYQ	",
    "BnwRk9enzE2J%3AaSudlK6xwok5MvC6HjtC8Fy8VTrsL2AeF4nWeBwFqc7c",
];

const call_sb_for_all = async () => {
    const cookieCount = COOKIES.length;
    for (let i = 0; i < cookieCount; i++) {
        await fetchSanBoss(i);
        await delay(2000)
    }
    //setImmediate(call_sb_for_all);
}

(async () => {
    setImmediate(call_sb_for_all);
})();

const fetchSanBoss = async (cookieIndex) => {

    let userCookie = COOKIES[cookieIndex];
    if (!userCookie.includes('USER')) {
        userCookie = `USER=${userCookie}`;
    }
    try {
        const response = await fetch("https://tutien.net/san-boss/", {
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
                "cookie": userCookie
            },
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET"
        });
        const body = await response.text();
        const $ = cheerio.load(body);
        const name_boss = $('#content > div:nth-child(1) > div.col-md-5.col-xs-6 > h4').text();
        if (name_boss) {
            console.log(name_boss);
            await boss_tancong(1);
            await boss_tancong(47);
        }

    } catch (error) {
        console.log(error);
    }
}

const boss_tancong = async (cookie, skill) => {
    let abc = setInterval(async () => {
        const res = await fetch("https://tutien.net/mgame/sanboss/sanboss_attack.php", {
            agent: getProxyByIndex(random(0, proxies.length)),
            "headers": {
                "accept": "*/*",
                "accept-language": "vi",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "sec-ch-ua": "\"Microsoft Edge\";v=\"113\", \"Chromium\";v=\"113\", \"Not-A.Brand\";v=\"24\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest",
                "cookie": cookie,
                "Referer": "https://tutien.net/san-boss/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": "btnTanCong=1&radSkill=" + skill,
            "method": "POST"
        });
        const body = await res.text();
        if (body.includes('kết liễu')) { clearInterval(abc) }
    }, 2000);
}