import fetch from "node-fetch";
import cheerio from "cheerio";

let COOKIES = [
    "	USER=I9P7NQdiibQL%3AgYMwmORr0rRdAQ0gDT13QvMQqAlkXBtLY2glMarbHGgw	",
    "	USER=Wtg5MA%2BMUE3k%3AlkS6%2BbMqDOjkCTiXlIdkqestCWgFtEmNEhxNnatZ4fPy	",
    "	USER=a22UtigB%2FVJ3%3AZknE2Xtgm1GKVIktvi0GL%2BOlXZfAgBrgXKCKMJJX7Res	",
    "	USER=BK7dDecywVGp%3AM7bw1ACXnaRgzt6Tz23wzOVf7%2Bu5nAI43nf%2B%2FcKbXR%2Bj	",
    "	USER=bq996WFx9n5p%3AQnz9MAuYKUHfLXBhlhCSk3IQcF4NvPD44MCqvU7mxSw7	",
    "	USER=iV%2FqUS53tirn%3AzqyCpN6wY2sGAnQ8V2W2TIXaZY8SUmHam462iTWEER0V	",
    "	USER=9tuMrmSic%2Fr%2B%3AbUB7YkdxUcVJQLtk5p3utl4OSSMMEFWMPM6Wk0VzSYnX	",
    "	USER=yJXBhLPyDvKx%3ABG8yER3VNXF7UYU1Vp7LwWRa4mr%2BzJx%2FMHVzFZ5SPudn	",
    "	USER=e1c8DPP6kdP1%3AWyNo2KFDhBt0zRO0YXy8ur98c72nqQWG%2BXle%2FY7a%2FChY	",
    "	USER=TwkuBkVhY2Am%3AngsjtQvmfoIb%2Bu9jJxetYQ3NeGrwLcnfD5sQUZ062YWq	",
    "	USER=XHmaHKuB3nNS%3ARisRtE2lBpzOdwu%2BNs6fWPi8HJa94tjA%2FcPwZ%2BrFH4gq	",
    "	USER=grTkyVQxLZsH%3AxlJ7eLmGOXGyA8Ov8KOStpclISediO1f8zSCeEP%2Fewar	",
    "	USER=WBQl7R4s9DvI%3ALNDdtje7sWv04ax2EAYNH4L3%2F0w13BK%2F3M%2B6u%2Bj88PKN	",
    "	USER=7GNzfKcVXD05%3A7EavesMqfpYNhcuoBW4icQvSeEhH3OOkwCco3hciF%2FKM	",
    "	USER=4Lwkrek%2F2j%2FK%3AAjzAMF9A6dPbY7f7JXK7j9u0XZ02twHtveGD4d12q29J	",
    "	USER=DjmXfmhZVSUN%3AOC5kIQkO20ydLE8OMtWV7QnX5xoVn5YSXkS%2FjHWW%2FM2U	",
    "	USER=r0SaROgOsn1U%3AmccjEWJnBWA1ICG8ohPGAMY%2FB4MLCTCJF4xeh0rW04r0	",
    "	USER=k9lk0hv5d2Uk%3AmDOAlo7cJ75C7%2BKiMieBhvBYqdPoTZHctrHrUw957ikC	",
    "	USER=GpjFaWaw0M0k%3AJEozWBPnH6fzxkvUoXIpPyawxzr9nzKFVPwvdSVv5rhH	",
    "	USER=fqOdReMOw7E3%3A6tpGT2rHatgRTRbRI1XywqaOzGRKZqubsG%2Fy8K1nZAZ%2B	",
    "	USER=7Ci9drVaTW6R%3A7766vsqpOn2ACf9ezaMD5ZvaYY1NDlHJNcuukhCyh3eh	",
    "	USER=3DNy3hPepqx5%3AklpMAiF7U%2FWGzlOyGCAzKjfPpRc5TBVih0PqXsEWiS2t	",
    "	USER=5tHAm%2FbnVhZb%3AMN8JlihuTcHDqTjqQ2Twxh2ODH%2FM2EIVBYbxLauwHj5F	",
    "	USER=NWssrGKq6IoC%3AdTO6ussm65jihJL0XteZt1xoxq8r4rf%2BxQc1cahc9GVz	",
    "	USER=ccgRYzxXPs9Y%3AB%2Fcp95xKF1Rz8K8J4XyBaVtUaoYmxpgex7d%2F9Awbhi%2BW	",
    "	USER=yPHxZebx1Po4%3AV4jNEdH7HFj7FFVIYZlAYxxJtkANd6qIzDXlQBhjEPa4	",
    "	USER=oSsZUjd43LaM%3A6K%2B6gC%2BCCIn0gZNQkOocnquFrt3NHgflZgBDnm7D8ddQ	",
    "	USER=CYRELiUIX%2BXc%3Ajm6vh%2F9kccfqG7HqG87wDzTfqwRENx54yq1l54LiRs78	",
    "	USER=ol%2FHS%2Frjr3My%3Ag%2B9fv1kAY1gsyHHS6h96dFqIa%2BeERQlji8QiQqE0QBaL	",
    "	USER=vLCGXQW5us7W%3AmlRLbp%2FGmp7871%2Bck2mTWh4n1cYb4bixXGNnuR9TQx6P	",
    "	USER=z4BLdYF%2BCHpg%3A906biAq%2BKeXFll7xnAMfZ00SCWr4UmkdFEgz6%2FY%2BMHqO	",
    "	USER=XblZLvAIeIeN%3AX33%2BQ6TZupy3OKfEBCRsfGOl3OBJdPY4pNRZ2sw93cSa	",
    "	USER=FtS0akHOYdEn%3A0BmEyQF6REn6In0VOxyQrzFGXPvGUHKUEwik5t4ssWm0	",
    "	USER=%2B2mpnXeweYJI%3AcQBm3z1m5IUJ3j%2FsM1knzdhYIwcBshScQ9tr8y0gisHz	",
    "	USER=afdnImF7Eac9%3AL4FllXiafTakxrj7zW2WuTT0jweXGU7%2F22sV1yVKv0h4	",
    "	USER=ndmS%2BN1aBb0O%3Af8Nz5sASDqsV8RJ7X%2FbtCtZn0hx4VlMofqEVlaPp7ZEv	",
    "	USER=vAdgigjgub%2FA%3Azq9LYJvFSb588r%2F5AmX6tKXBS0CUF4OZSgeTINdoodCd	",
    "	USER=qZxjl7XxuwD3%3AV132820bKtA8x28DcGSZNG8FFTHuqxpnjE123J2Io1xV	",
    "	USER=rNkpXuPEuHqB%3AfZqNUKyGcUqcXz74JMRiEzzHsayg%2FEd5un4XuMEd0z2k	",
    "	USER=9r7%2B9GxJeTGz%3AYnXk8wrx9x2UADuE2Swd%2BredVY8dLsehI3du22aZgHjf	",
    "	USER=OUVTIQ0r2cbz%3ABEQu4MFUOlmjZSe2cNTzRJrs7NtQMcT%2B035%2FOW94dIDN	",
    "	USER=z%2Bh5dYkxcws3%3ARJNUTd%2BayzBi9vKXDZPrBxK4%2Bc2t%2FthMK3EthjvEmMpd	",
    "	USER=6qOPvnNJO%2Bii%3AC9xXAHc4mK4u%2BtSLyLiUj4ORBHqoMEf%2F844NGhqHhrvt	",
    "	USER=opqGP5caxSAB%3A%2F28Dow%2FObDp2hbmaY6kPIA%2BLImYqKmM96DPO4xu1DkRA	",
    "	USER=OnLcodMkwvSL%3AG3STAqstRQAe7KRMRjCsGiOG%2Fc7E8q3Uzy6X8wmy%2BKod	",
    "	USER=IzvEKdaOUvlz%3ARQ%2FANslEBADyUFGJ65b1aM6HpBjrlHukODbuhDZP32bW	",
    "	USER=mbIjVFJ%2F7OEK%3AtEp9YAdVB%2FnF1x%2BCg%2FCOVH0esgFLppvxk0IFJisTCI4A	",
    "	USER=d5zTBlO1k79l%3AxHyVOz80r%2F3cYGvVbRGnLclL2wMNoflE2FmSlnVxHuJ%2F	",
    "	USER=F7QElK7aSGNY%3AoT%2Bc3yv6BsiDqfJ3oDNwXuUniIlvG5yiiDkTiAGccd1H	",
    "	USER=qh7txrYyprvp%3AcmoP9tWB1hf%2FIO35Ij1qaSQvzjMU7ArCSk4FrJJLX2l2	",
    "	USER=fGXZYITNtFhQ%3AAD9f3B9uSeMRO14V6D7Yf%2BDFur348e1gNXxSVMzF%2BhUn	",
    "	USER=DEGTjcJt22%2Fl%3AXuWy0kvCk4bQnPw1%2FKVkXgaYg%2BY16kRhEzyRUTbgkMiR	",
    "	USER=nknYEjhFY%2BYn%3AYx1HdrcRI2sVv120B8mMDaIudRiXtgbVBu%2BXZ97qmXNZ	",
    "	USER=W3d7jjgmAhvh%3AoAWVfkSf85bFdI34gm4M561J6MTS1yQJ20Of81C1G%2BBY	",
    "	USER=5m1xjkx4KU%2Be%3A2nFiW3ZEPUag%2F6CrIsbXeXWk1i8DhFLWSrqMNVi3xGbC	",
    "	USER=ccIHvnD33Y%2B7%3Ay%2FFIu64i%2B8dnGPH9jo7WtFTHBSHJ%2FEGa07rPxsc35G2G	",
    "	USER=Z56yDS6F4scA%3AtzU4zjQReCn7XQRwhYAThMfs%2FWR85P8vJ1nHg%2BBA3TP6	",
    "	USER=OqXtx4Ab4oAB%3APoP4GinVFp63vSIgoUO4BPGzLWQAhwtL7jFvDD1v4d%2BM	",
    "	USER=EAat2P%2B6ZnMD%3ATKh6uBF4dVoIvx4Ce6JOCtsZBEh7jIwbs9evLD1bFvs3	",
    "	USER=LwCt%2FxkL%2BhfV%3AJTwNI6zwagJkbnuhCnzik5RBWnGsbdGt8XFMPVnnmw4d	",
    "	USER=Trne31HU7xVL%3ABXGm0z3mj96oycOup%2BuX8MGLKMJ1nDqydoKZXhl8b2yF	",
    "	USER=mnhBUvva29f7%3AHx0pMR2a5LFjQFQ9pMe3sD0fqPx0%2F8snO4%2FbYn1EdsQb	",
    "	USER=nEm3oy7PRSm0%3Ahn53yxrGERKK51OIOJGesl%2Bmlu80ZHZ%2BtEse%2FZaJq2ZY	",
    "	USER=UPSA9H6s4%2BXS%3AYrSScqIReeolBigM4XpBLW9hc3PcQASCuQmY3cwAEKM9	",
    "	USER=oFYBCpJSUH28%3AbP8tRUvOhPctLzPDyGp9kEpd6W6tIaYjeCWD3%2FnEo7jG	",
    "	USER=qDhPJwsB%2FES6%3A5aZifIVc%2FJBUJSuf83LA6VXrkczXm0fBcHSDyNWx%2FCeo	",
    "	USER=c3W03LJnmE5B%3AvtRxPOJq%2BOB6TMO7R7Tkg6Axgf8RKNHmLFAj1fXJpmZB	",
    "	USER=Rd9nJ2Skis8K%3A8Dmpuv0MxLVSypPH8smDjwlzqKmexbbB7Cnp5avR5NuL	",
    "	USER=CcwfKQvtIilP%3AQCyY2JX5sxFtqc9q88Yra1K3Nb9wV%2B%2F0C6yaaPFDbwNZ	",
    "	USER=tjKE%2FLSlr32%2B%3A1SwCGcaCAV7U4SR9valudKXDazqxwBYHX8elv4rZZ0yA	",
    "	USER=bkmcpQcPZ%2Bm3%3AwlE4X1uBgrskSak%2FRu7M2rl162%2FitlLKkyfZGmJPq8b5	",
    "	USER=tPJNixyvWwsa%3AlIEPah2RTFiCPIHWKbshgTwdWRSZ2x6D0plrDU%2FCuTbl	",
    "	USER=Pn17qEPbS8lb%3A4kgfSupqsHPT9ogEIQNiQQtRnThwK04JSTX3NoZfmSi2	",
    "	USER=ZbKKRAilZ9f7%3Au88SLxCRH52DzM2DOdLiDzoPQbItbsaCpXJ2leTGEBXX	",
    "	USER=fEdHjMo%2BU0eL%3AotHQGi2LAODWHvyL4Y%2BsVWFer93aTIGzzNc4X5tZa2lI	",
    "	USER=DsW41sLeABGI%3A5mt2xJzhN0hCIiBDGfMkhK03k5AFnPkpPKcfJSKvVtHF	",
    "	USER=GqUppktbCDfw%3ArdNPNiJf7zOyBxPJQyc5DA%2FldGU%2BygcLpiotQHf5OZPK	",
    "	USER=pGC%2Bty3TFF5a%3AqKTHvWWcs943n9R4Ul%2F5qBX9P2XjGpQX6aWu8pgrOQek	",
    "	USER=ZeynP%2B6EKJrG%3ASCZruBrgq4P6wnTXrhV3SPm%2Fjegrt4FaQ3LMlE1fe3xE	",
    "	USER=emRIoP66tC1c%3A%2FpMLu2Z2jRxWmiUI3SjzMdCtSaMIvbpYtm5SGlvMOpw%2B	",
    "	USER=2S3aZ5x3wMtF%3Az65T5fk50wPYYBA%2FtYMsDwb8gx9OQvOOZxhkarvRi0BQ	",
    "	USER=Ad264kdPtKyW%3AkIb7cB0Yr%2B8BOG3SPd4zBhLsLdsuRv0HQtKN03MhMFSr	",
    "	USER=bEMdWOYIIXYC%3A7Z274aWB2YydEd7RFsu87U%2B3HUqP9TS93ff%2F3a5V1HC8	",
    "	USER=p4YbBX7RwsEx%3AXWyaFf97E0zoc9isTA5h2fHWMJcTSsQQ4NUt2OMus4XS	",
    "	USER=97KeFv546YW2%3Aa%2BP9cmowRXKlHQVIO3Ot0PLF%2FHBWYU1u2scGG9dzEAxY	",
    "	USER=FVFeqU%2F4kGyf%3AmM2YYIZvaL0v85TuMYu8n9mRGIStNZPiz2htNMH8YFZf	",
    "	USER=%2FyUQ8feDxDGG%3A3Xa%2Ffftvp%2Fao0AwakfNv1x3ZWY1eDE%2BhFTj1JlZofFWI	",
    "	USER=v4AktjTWLKmU%3AG2sPgyWGpqbn%2Fzb3UcwLxXX4ExNR9cIryWyJrfG5tBBy	",
    "	USER=CkJfYypc%2BbCP%3A5FjK%2FvJQzVkr3YPrf9GJaniGEe1EFBUN%2BRN%2F0KG7Ftwr	",
    "	USER=0nrwqd2SbCla%3AqlNRE3Zp4qAsZ40Uc3t0zvYr6YGDMQwqlOduBsER1CbI	",
    "	USER=S26W9kPWX1Jt%3Am3ZGKxFWhZchhphQxFVxijkPwGOTk98Nqe1mLvVh4kp9	",
    "	USER=JqIZfuDNhFTg%3Ap9%2Fp5GL83pELi1u%2F3v4UIe8F4yZto3bDqv2IiCbFfWyt	",
    "	USER=pwDZE54rRVNI%3AQ8snePfQdGMrFvKbu%2FkvH3WRfptFqFgIOIyM4AtIaNzG	",
    "	USER=gSm9S7J%2BCF8k%3ApHAZLYeoN%2FDib%2BofvOoavKshxDZgPABTg2yOu7b9Q%2FSj	",
    "	USER=55YMzu2jVtgy%3AzCnNrNCGwNxtDkEc1tlYgIVX4vD0q44%2BblbHNrxB%2FrmQ	",
    "	USER=N0LGB9dNiyef%3AhoHsbEcZHBcwKrmvWn%2Fzl3lFzZTlMFvjkaVVBQKGWB%2Fi	",
    "	USER=Sx%2BmNBnomDog%3AltGXEY9%2BMKbvwPm0Qi0MGUSk4mE3uhVdDzlx9b3QW18w	",
    "	USER=%2BhNU0MylFCOg%3AT0hCEuWmSuBIuX2T6xlVu6c2wrUGqTYKRjZIMAdutGR8	",
    "	USER=43V810%2FNw38g%3A8EoSO8In%2FlJ8AV6B4qD9Zq3Pl9dLa1eacZSaTuwwzP7e	",
    "	USER=gCCGf%2BeXnOor%3AjWEl3L0%2BCh%2BEbNR%2FTeymMQYnGb7U4xtsGZcrWfuP%2B0%2Fm	",
    "	USER=X9qbRIdLs8S%2F%3ALE%2Bi57zWgOg%2BTfH3QbLfPF%2BZ9s7JUYbHGFaJSIOyBayQ	",
    "	USER=ixigMOc0IGF3%3AoAlpKiit4nrv6YqtGQh4nLmS7SpCFQoCIycS6L52H3uy	",
    "	USER=YEtGdXiXhth8%3AH43eMp%2BQJWsW%2BQE797Zhb8hHjnu%2BZxKZFDLHSg%2F2JAaP	",
    "	USER=ooUBxWiawP2G%3AP32NrbsP1zz%2FwIhojX3B5gykfnLZF%2Bj0L3vl7ZQLbPr8	",
    "	USER=re3qrFVeK3U%2F%3AaabmxrawYVmR4PHA%2FhqMJ4n3CE4XCC7RyiSEsDJ4Cm7f	",
    "	USER=BcmB3Fy0zOrq%3A7TtaSeA0Vew7LWZnF0gV8%2Bqls42KIxKVRAgiXYNsQN1G	",
    "	USER=Q29kraNAJ4hA%3Agoj7rlUn3Cec6Fxm%2F7mQt0o0SIuuaZFFOMAcvYx32Gdg	",
    "	USER=w4kasD9%2FdAVz%3A8%2F1vPbG6tG7QEfi5G%2B0o4VPBMiw4TyhsAg0%2FR2QZq59y	",
    "	USER=0ks2iVRtaiU%2F%3AOaP2zBb81SKSxvTm%2FRSBBr%2F%2Fy32hzuRYCYtHv0y%2BJ9DG	",
];

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const fetchHoSo = async (cookie) => {
    const response = await fetch("https://tutien.net/account/", {
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
            "cookie": cookie
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET"
    });

    const body = await response.text();
    const $ = cheerio.load(body);
    const Id = $('.media-body p:nth-child(1)').text().split('(ID: ')[1].split(')')[0];
    const bangPhai = $('.media-body p:nth-child(4)').text().split('Bang hội: ')[1];
    console.log(Id  + cookie);
}

setTimeout(async () => {
    console.log("=================" + (new Date()).toString() + "==================");
    for (let i = 0; i < COOKIES.length; i++) {
        const cookie = COOKIES[i];
        await fetchHoSo(cookie);
        await delay(2000);
    }
    console.log("Done!!!");
}, 1000);