import fetch from "node-fetch";
import cheerio from "cheerio";

const ACCOUNTS = [
    "747869|USER=HtZsLerGshRD%3AevvORjZHQ7GHFsFE%2BYOWK%2FGWSE7WZSGiiTPw87cDCEof	",
    "747870|USER=25gUCxVy00QE%3AfRLdLUVJs5gWL1WwvtX1gJJNBFvZ8JlgMnSv8EYTqSD1	",
    "747871|USER=1ERHLP8hm0TG%3A0Cza3ac%2Fn8w%2BgvbS%2BAa7gN1Fcjz%2FmQ9VHSkXp7m%2FBLrR	",
    "747872|USER=82zSLoCkMOja%3AsSSqLIuk1jr9BXpdY6urVpiWkPnjtsl8NIM%2Fmj37a74k	",
    "747873|USER=ac7tsDXrnAqo%3AltWTHF61qacrjHxMUoUFMVGCwmiCuMihfXVucJhOUvVt	",
    "747874|USER=HjmSW%2BU%2BTreE%3AmGh7Gnlo6j7xYDG1tZ1UKJhTbG%2FFmZeFj0lnos4rpOg%2B	",
    "747875|USER=HLKLUZhJ1D0k%3AXSZSRKfNSZZ%2FbitKLszA3Pey45sn367Saph2c2JarxEA	",
    "747876|USER=4%2FgJdSc8Mdz3%3AV%2FE5gBM6BwTSrMJxy5MOadGHvxNXJVjqQeJZcrvrVd9f	",
    "747877|USER=76ztFz3AJNK5%3AjdvLgxGz%2FR3GU%2Ba4qX3sgmxLRT%2F%2FIRV6SmORlpSApeVN	",
    "747878|USER=56Mik8xg8TYK%3AY62t%2F%2FOQ0xwQtEHAuLGbx0PutSmk9q%2BwGESZJ1kQAvxz	",
    "747879|USER=m066tV9S3oXK%3AaVtXWtuqD4wh3z8wlhlPSAL1r10T2HA8MhUruUc3DAg1	",
    "747880|USER=sk5lSOEbbPEa%3AOfqCJI5V8o1tS%2F3JZj%2BYrMV6HB5qA8wfkIEUx45SoSSt	",
    "747881|USER=tm6g%2FLfP%2FbBV%3A2hdCpEWONmCflOi1s6e6v4kdHQaGEqG4bF9YAwtA1tNL	",
    "747882|USER=M%2BcxlyK8yMyD%3AFUd%2ByQMcxOvwplZ4S3wNkCrXysXC8h%2F8BqS8mjKObRfT	",
    "747883|USER=j464xTPLWMmJ%3A9%2Bstk%2FpUjlhm%2FlB%2FbObdkb8ScaRzY2MqFfeNpC8JpQJs	",
    "747884|USER=qQDn6aAXCxbM%3AS6d62AJhIUKVlB157SqQJc6oMCVYTbXxXNxbFwv2rriL	",
    "747885|USER=0vxJzyNkbVXd%3AUZckjW3BEJIwy0RS%2FwRkSLnxfsxk3MTGI3KqDVKZ3QII	",
    "747886|USER=gaamxz3gNukN%3AY9Heb%2FZHTgevJt3zc1OuuZY5A7J1Yl4szinnPN94Gmyk	",
    "747887|USER=g6Djk3kl3PE%2B%3AKQywAbthmc9855EoahFhuNSySOmb0%2FxPZKqMvDF6yryh	",
    "747888|USER=By9aWh%2FThcbu%3AfEoAakO%2F%2Fbdfq0e%2FA2amXSvLwfBz3fjHIaynGeWJitYD	",
    "747889|USER=FRTEKcI6vq6O%3AuWlhxJVFofzoJ4TtkP5uMZAOvkDqKakiViRP2p6%2BkEow	",
    "747890|USER=pRRcjOIXw3R5%3AfPm8%2BgxDeJFpyPkJJ3q6RdCr5G59iuJO2Gg0uC869gm2	",
    "747891|USER=yrCrd%2FNZMTPu%3A6hWrG5K3n23acFIlSAfuIP4b%2Fyq2kAT1tZ%2FHDBQXaGeC	",
    "747892|USER=flbLJ0eI%2BreK%3Ajc7anMN5pt5DhZKWNuL3CunyiO3yoPUE8ByzOyb052rr	",
    "747893|USER=GMMyjUsSV%2FGM%3AgWt9Mi3adWyrCEK0WynNtPdUAWpkiI%2BwDRGA4ja6h6Cv	",
    "747894|USER=y4jcGg75b4Tm%3AGrY13wIwLfh8jiGjTizZIzKPK%2BjyYglnCU4aE83G9zo4	",
    "747895|USER=w0KqmYNiYAvy%3AmFYyDJefzMGuPnXPhd4y6S5priKCbA%2BcYIoBMaJ7deGe	",
    "747896|USER=8c5LkoJZOak8%3AbSVx2%2B%2B0MZKkkPQz7P9GmknbnqQboXd89sttstD4%2BKT9	",
    "747897|USER=N2ijodFf8yLl%3AFj%2Bek2vfqFfkJUyie5734TvcgDwS0ow5bGA5mc5Ecl09	",
    "747898|USER=s%2Fg5vcBipYx7%3Ae%2B0PNwB75b4%2FQltVgsqFC5%2BNej8SmNh%2FMvZEXs4vyzTE	",
    "747899|USER=kFSahWlPPcKs%3Ax1zpET%2BkUPM10%2Bk0LdgmWxLCxCsQYX4xpkBRhRHM6L8w	",
    "747900|USER=6vboN9%2FcnDIj%3AiMSnXLNlK6H6%2By7BcJTrNpNlnM3PgLp7r6N%2FA8iu6xLL	",
    "747901|USER=F2fpQAfkomKh%3Ay%2FrLJZrL4PSmYqDELOMRkr%2FUm8zEhCqAQYC9ooGO8UK6	",
    "747902|USER=ZJHOxf3ebQnK%3ARtAcQQ5v58HK6bKhcPuMt7BclEXkvc64Bwf6TXlscnel	",
    "747903|USER=Wz8lAJliDRrA%3AAVaVZzft8uxVK90nmT19mUHTLhSUatHd2d33GMDs1vtk	",
    "747904|USER=%2BXT3HExpvIBM%3AKGx5Rb4F%2FV6iY1pbO1hHqF6h5dx6jew%2FT6yHEuxW2Mcy	",
    "747905|USER=%2BXAptT4ud3c9%3Ak1tZzvzjIHeHf8%2B3Daf6SzC5UflH6IKsgEXiTHovP38w	",
    "747906|USER=0tDMYRDz7kGe%3A%2FpzHKYdTxBD%2BSwWHZIxU9%2FcotXL6IZFlIRqaQGYW0X3T	",
    "747907|USER=Qwe0H0am1oVl%3ArAZY%2F0vg2Z6y7cHP5M7fb9ZDe0bn%2B1da7v%2F9PqZcNHuS	",
    "747908|USER=tWTTzWdO0tPQ%3AxHKy%2FcjRI9mYJiDSE%2BhQ2XEkv05bWu%2FQDdFGsW5jRNg5	",
    "747909|USER=B5yFbGvkfGbZ%3ARN80wdFefCOU8TunodiOkHcD9AnAdP6Ju%2FyDYU%2BHq1bZ	",
    "747910|USER=B7sWnuzarJ8h%3AvqGke3rV7kYj8tfXzyYUK71FMYFLoBFJdhoQkygwITOT	",
    "747911|USER=3im7wpIKH%2Bm1%3Ayi72Z4zwABrLWG1YXf0j%2Fop%2FfMwS0GQremoSEV5iQwiR	",
    "747912|USER=epHh%2FueE3Wr4%3A8wav8BId6Iv3MMiiUM%2F4FyR43ysEVIRh2SH7GA3lronV	",
    "747913|USER=lVBqcmrcxe9g%3AGJQcexR2faPEw26sxxoirPx73GE7WM5VCcI7W7YCrUqV	",
    "747914|USER=4I8QdNyRNEzK%3AWuZA7h5b11j%2FxOr0S3JfN0Kx57dRTZBAvDP4n%2FEzMMhs	",
    "747915|USER=lcks%2FFXWpa%2B3%3AxbW%2ByrkHPBRb35oWCSuCOO8SkAmenfMiTfldPh0FCuZz	",
    "747916|USER=%2FuhH2Cp60Nsg%3AFQfoEI6IQiQC%2BgXOIFZx7NXykPGYy5wJTw0CXQIfy0Ub	",
    "747917|USER=BMkgJQDnPqBf%3A5tjjfpIsTH9AoyKaJdNV9LZYYlfADk6%2BqlnGk2zzJWQI	",
    "747933|USER=S2PF9qDsYz%2Fe%3AJKtgc%2BGK6hMyxXYNOh5kg%2BHBLruSMvSCO4aQ5DWOeCLh	",
    "747937|USER=bzbYtqtH5pDx%3AoJoaTzZuJ7sNQhc3JaMy7y8g2i9EaUwslrTm8lWphOsy	",
    "747938|USER=j7652jOus2iT%3AWEK1m%2Bum05gZjLYyr0XH0JcFAcOp3UA%2FUBgu2kVgUphk	",
    "747939|USER=fPkjZo3T%2Fmu4%3AQyta0Pic6y0GsAZpVNN3PJlCMKz3imEZ%2Bn3pErAnOO1o	",
    "747940|USER=%2BsG54WguwIQa%3Az2KgQtA594o50tl%2FEmOmKSOmGLgeEiJtQVAUDeq6b%2B0I	",
    "747941|USER=UoOeaq8bSQ6d%3A0vNTphbMCMjsGYzk0F3gGpaDOeceRjsrFZdmVYtJsn33	",
    "748003|USER=Qhkx5ogbGEaR%3AWHS431DebtQ3919J9tybhnbA6Btg3eslNgpv1PrpwxSj	",
    "748004|USER=mi3fDAQ1AGmw%3Akbtk1td0swUmKS4qqEDsGr5KsUcc1ks%2Bq1yGNCneldgo	",
    "748005|USER=stTjatcHGCL%2F%3AwBwoLWlucT%2FMIOU8%2BV1OrKefyoMTx1tWaKLthWcSxnYv	",
    "748006|USER=qr6xDjU7Gxq1%3A%2BX5AqBH1s%2BQbwbrhODvZkRPzx3Ea9SaTDmZAR71L0Hr7	",
    "748007|USER=QsZvpxMAnHIC%3AHtkx38Jp0YBP0uMyVjNq%2FSA4maDvq7T2Q45WwqE8Vk9D	",
    "748008|USER=GXlCl23Xp4tp%3AT0RqedY4nXJcwJZFw9QF87%2BxwMLq%2FAtNP7VFspC6mSeD	",
    "748009|USER=y70ZP%2FsfhBjq%3AND1T2uTSIvFEnyfQ8EnXXBSNPrvAONuQ04Ah%2BqdJZ3y5	",
    "748010|USER=gkaWv%2F6vMEUm%3AU0SEi6HkAlMNGmwGESrWKT95vXxwoxs8kn4Bey8AOYws	",
    "748011|USER=c4T1WVXwTySH%3AieTAbPdyKYr%2FLDIqCBFzXQLQ3Cq7pmla7nqHIaz7cRxZ	",
    "748012|USER=EpmGvz2SpXzs%3A3qGJ5b9ijX7d6mdjrQSs5jkOCjur8m%2B%2FzUfGt4%2BUr%2BRH	",
    "748013|USER=5sQop%2BX%2BZNrr%3AfyDR0MZNpopxXrpTqzb2GJ5EBzvcIC038i7mqy4lpmxT	",
    "748014|USER=ix0Rdv7TEAmg%3AoyOi25Vsmwqp%2Ff4Dlxhg%2BOP4Nv5P1NIKNCNn%2B9axJqrf	",
    "748015|USER=PFFD5UL8z%2FiF%3AarghxI0ZFu613rQtlHdpsbd3I9E8X%2FKAsZsj05g9zIRq	",
    "748016|USER=rJ%2BTaLFJsmWv%3AtGnZiy46qGT9Cc9wO3LU4BXn4YjHhyM81T3vqiinE7nr	",
    "748017|USER=qTrIrYy%2FejRO%3Aez7T4ECcItm5HBcRoD7yi%2FD82L%2BdoT89tzB9wzm0J5gD	",
    "748018|USER=3P%2FkKMDoVGuu%3A2FZ7lTWMQZF%2BxGQ8ZHvJ7EwsjUciL6avYmxrQLRQZ9kS	",
    "748019|USER=zODhLwdANVM%2B%3ATuf5ZRlm1rV%2F10qolJNzM4gK68TENiUCpFLis0st4OvY	",
    "748020|USER=shekoIOkcGtY%3A%2FbNlLTbPN7ddZz3dYJ%2FEfBYA3IJN2AWxjO4XdaX4KMhk	",
    "748021|USER=StWWXHtbHxUT%3A2S9dsugSxhYZ1qbWgwGmgh1SX8xGZAKpfRhN%2B9PiC6MD	",
    "748022|USER=O8SIB0SM3OX6%3A2pHI31Gc6N8tcsGAI6d%2FyO82oJHt9A%2FxtHrRCPq25hBC	",
    "748023|USER=evPoQganYNTq%3Anhm%2B2PK95eh9t1dfI2oX2I0CPSbIDvSGIPPPK3J%2BeXIQ	",
    "748024|USER=SPo7%2FWYuzWSM%3AvwUvn7zqujB1P77Ewd11d8I0OdQYh7wQxD5DByVTVrbI	",
    "748025|USER=gNUUYXfPuTA1%3AjaKI9%2Bg4HocpH4KjxonZ5%2F%2FX9UVcZBBNCpJuFu4m2t8L	",
    "748026|USER=iWw%2BF4ZmR5Bd%3A7R5A3XN7G4ImjJrc26D9%2FLVrIh%2FGIS%2BqNfXiY58qM9O5	",
    "748027|USER=QOpcyuDpHUDb%3Auq0kbyIkhkbKf9%2BN8b8TDB0GTfGMCP7H9qbLf4AI5Ps3	",
    "748028|USER=ubbOYCkpyaW%2F%3AcZdfE2riYLDOUc9fk4AlybYH4Fks1cHywawSH8TkLdcW	",
    "748029|USER=iVwucZQDBSj8%3AGrUflUrXAgXdSsCwyDQqlI4vFIyqcleaJqw%2BA8XBmW%2Fq	",
    "748030|USER=37gcdht3ea0d%3AoF5E%2FTEr27vNgcehGEWbX2LBxgWsKHpT9euX1NFIc1Bf	",
    "748031|USER=Neye8l7gUqN0%3ALnF5BbSBDRHenyxY%2BIiA68LMDynBX%2FI4UUQ2uo7kaVFv	",
    "748032|USER=sACAQo4jcZ4y%3AXvY6il9GEH2PAQmMddKWSXpNKTLI%2BnmmPkYSsXZddb%2BP	",
    "748033|USER=Kr3gakbTatcN%3A0HxY9nKr5rtvBW5FA1QR79Yvke85T3XF3GfzUjCmj1KX	",
    "748034|USER=3p1E4CpCrlyG%3A1zeiCsFazxbzA0rjV%2B7ARkWLGDSamCqpI1agOhfy8YdT	",
    "748035|USER=pjh7GvLXgTIF%3A1e1F7%2BCPWepElLjrOEI4CC3SG0KfYr3B42Nxd42vX9EL	",
    "748036|USER=nmU2gqhqbppj%3A8gnB8BPhUASUSwoCu30lKaEcD3GfOLuAa2j4FpaBogdi	",
    "748037|USER=GFwKU30K8Wiu%3A1%2FgQOKG3tROT91%2FWt4luti1J2GKMJlTw0cOPLMWIoQDh	",
    "748038|USER=FrCs0A5BqqVa%3AuoyBhV8T19d3UPTEMWE5srTpqu1NJ6AVoL9jnx0Bqy8B	",
    "748039|USER=MeJmaBVpeanw%3A%2F9wJg8xdlrYfFMYpdUje%2B9KpjVJV2TjBelnDkXiqm9x%2B	",
    "748040|USER=D1HJovKysBBv%3A4N%2FOIudm7QrgNTOD1kWi2IMIlDv%2FYbj8QqGf4gWAuLEM	",
    "748041|USER=1FccurmqzKrz%3A0ER%2Bbaem4L7%2FaX79Ru9wdPEyBntCAxuRufLWYd7av7Qp	",
    "748042|USER=IB%2BmxXl6JeNm%3A3918S7fiDLChQ627FMIprYXldxRxADSzJg4WTJsQ8Nza	",
    "748043|USER=mGiKxIfWSvQz%3AaNXCFZGmZZ5fAzy0U5uWQubqwsF1DzO17Ssmg3sJS3n4	",
    "748044|USER=DACdq2ts2K%2Fk%3AHXHJIg1SRxMQF1VibP7da6KU%2Ble3EAi9%2BIsb6En9wxv9	",
    "748045|USER=yO8nwbin7%2FOV%3ARvbINczFl2eFV3Bd5rNToW42e3wpzFQqRPgQ2SqNx%2Bpu	",
    "748046|USER=B6Nvfrw1zADX%3AjbXFP1L14L0YRE2thllBHVj0kEO2qbAJQvbzjj1aHZwt	",
    "748047|USER=ESd6wl3ht%2BrG%3AjpzmVCFfmX6y6%2B4jDfXGDNj4ANATc4UVYVxtxDfNRM0%2F	",
    "748048|USER=BbL5JekPAl3g%3AHRxQSug1AMkxpH6HiMF4Uxa9H3349yseohw0hlGCXUnm	",
    "748049|USER=T3u5026dGfbL%3Ab81hif3FcrNiSff8qxF6wakst%2BwEAkntk0bxFOUp6Ok%2F	",
    "748050|USER=8dyZw4A2CYKu%3AAx%2Bnc0ACrk%2FTch4r%2BGFEXw8VHdgq1cT6f9Etsp%2FAq%2Bqi	",
    "748054|USER=Z%2FHN6wH4TZkQ%3A47HNGekwT3CJq8i589nKE7j2zE8zsZePtjiJjce8qwOW	",
    "748149|USER=SLX8zBzwR%2Fhe%3A%2BMsK30p6yuFK3KTIE2V8Prjn%2FaMHkxnQvcIWrTw4mFha	",
    "753444|USER=CbnEbvZGAktY%3AK0u4zDuyGujmb5Djz6f9kz%2BmLLP3ca1reht%2FwWZ%2FULQ2	",
    "753445|USER=oerEsjxRLgXr%3AwRux2d8oBQAXa0Ah2qRn%2B8bhTbdhXCs6OY9fkFiAxmQG	",
    "753450|USER=qsprfvThXXXW%3AR1Znx8E7oI8IQ8GGbTrRAhMrlkLyuHWQkl16VwzYTnlJ	",
    "753454|USER=8bpZw%2FjKtoxS%3AJZmW392KkfAbUoXZ9YnwB%2Bk0Y%2BmW%2B21evMAgaVH4k6kP	",
    "753456|USER=rMmob2ClaQ%2Fm%3AZShJ9QVaXpwcxWlT%2B2j%2FGtTl%2Bwuqf%2BncdpfIdnoMnt70	",
    "753458|USER=9T21L8I5l99B%3AkwFj7HwE8vKsuOhZ%2BcU3keGNbiAq5NAKqW4fHr4tQiW5	",
    "753461|USER=zD6Li7kiMxpN%3AnUEiDkrGqCjsWJKac07G2KGtl33EXwAlljCwS8QcBv2C	",
    "753462|USER=nRPuYlO0iC17%3ADoK7rd9lBnwIyWD7tvmmXGsssi0dsp7tsRONKXOWJ1T%2F	",
    "753463|USER=S5cObJvGNmgn%3Ai%2BAvgnlFhRDKMTtHfi%2B01T0qxzUe1HLMVEFJPhCvE2Gs	",
    "753467|USER=gHOEIOq2OX3N%3AN5cYH68TSMsAGVeZX%2BDoQuWeoTlT5EqbB6C4HwhHgRBi	",
    "753471|USER=SIJ1NCnu3z0U%3AtZpLfd3DUUodQxfzHsBb0XELoKMM4ZqUvcmBAhY2VuR5	",
    "753474|USER=kBxWnEMzthvW%3AxXRCgSejC4OWKySH350jM%2FxXNO12ONly5Qu0d8qc3W4I	",
    "753477|USER=CqwbLGeYDUV%2B%3Afi0mix3Q%2BuhP2tky7vt0nfpKJK5J2veQLTfkqtRUOzoR	",
    "753478|USER=%2BjgJhZaVJAFK%3APso4JFmxN3LnMgO%2BE3kRmlu%2BL97plsZcpB%2FK2ckP1NPS	",
    "753479|USER=MC5es5gkgiIY%3AkGr2VJBP3vQjzSMsldkJ7lk09y5v8C%2BuEoOdcAnSYwhz	",
    "753480|USER=b0CEsGjJanjk%3A1K9Tyg98kicHzgmqDHzj%2BiSiIcAOAkA2tr5m%2FNXSfVzd	",
    "753481|USER=i%2F3woJ6uMoJA%3AER1TS%2FTacYDdeZwo2HKz%2FgyTiBAlAVxouw%2FA81gHqI42	",
    "753486|USER=bX8tYNKpTSGm%3APQ%2B3QvkCM%2FCXUQp%2BI66Q0wz0gHIqiacNL0KRnhm%2FsTk6	",
    "753489|USER=d5alQbeligvu%3A09Qi5WjFVaoBGvKQM0mdLg%2BgCFHfPMe7BKYnJCh4yrhN	",
    "753490|USER=kxbXWiFHzjWW%3AMdSEq3JhweE4vJf5kRNmC9y4pGLZ3mMtxQ74uONUcVrX	",
    "753494|USER=RrdMTyF%2FFOyM%3AU%2BIJEc6xkUx47Ft3yaED3j%2BWB4HgMdIBlmDMFS1kDJaT	",
    "753495|USER=Axpj%2FsTqNZOe%3AmSqFiE29zRlVctJPacnLVJwFi2AOiXyCYdCXcjun8afF	",
    "753499|USER=HiApxGr8QFoZ%3AFRa5YeLu52ezOaAqDPSRmS6cm8cAgwxB6ntc9dGlRwTR	",
    "753502|USER=MBewcGnIPh3y%3AIRfEeWaj6pYPLp9bMbGvOZk7P8R64OzMvBCe6lM6l8o5	",
    "753504|USER=5s19pYgSjkri%3A2oYVHq1v0py52yb6wG0vhmxNtLGqSa528EmKtAgzyU%2Be	",
    "753514|USER=7AnhiN30e%2Bqj%3AZVXjvdPQwnZsbjefqES%2Ba8wXJN09RTN7DG6zn6OGPolJ	",
    "753517|USER=PBfvF6WJEg72%3AcN44PYYG9RUcuyG19aT5i1XuN74HAMBo5qjtQhvpQnR8	",
    "753518|USER=BWWAhbGJ8tkB%3ARl7OV0Ldl46NKz8r0cYt1RGCxrEa6%2B3Htl0jDJmDEZo%2F	",
    "753522|USER=z44yEHRdo6D6%3A4hnjwzq9zrMjKI3tbyEv6T1rWzM5FzD9GaU9GLIWfaq%2B	",
    "753523|USER=YSz2FIKwSxMO%3AfBY%2BTRdqHU%2FXfAGzN4vPnckSNvUbs0VqOvAkTEJuQLs3	",
    "753524|USER=dJnpM9%2BFZHE7%3AE%2BLsUEIgED2c%2BB80EuZd6xFH0T4yZRzcJUhbcxlC1MAQ	",
    "753527|USER=vKnstEgueEZs%3AuVcpMJocsVXRAZSdh89mWfEXsDvsrwtJ%2FGagzLf%2FOph%2F	",
    "753528|USER=lkkQn2YF4EgL%3AHYxlT%2BfUWD0fLqtO2zqizlrjMeYGQJTuINXEnR%2FIfnz%2F	",
    "753529|USER=aV%2BtpnsNlcT4%3ANTtVnlEhJOtotOGmPnpxCsc4WkN6QmXwUGFZTJNJSXmQ	",
    "753531|USER=3pwdQ5d532W6%3AOxPgDdrJm8uSU3YK4FypMhZ8R9s2D3VDpyvuBnPLQrji	",
    "753534|USER=BC0Gy5nnxWkl%3AnN%2B%2FBOoE%2FKawtcPAkLR9XAB826YjMORzi6a7U9U%2Fo0Qz	",
    "753537|USER=LEJ2RG6e5faZ%3AZAXOR9dno3lok3Hc6I6zdz%2BE7%2BpSDmN6oEIEUKP62Tyc	",
    "753538|USER=lEPmTgVRl9RL%3Amr9ocpY8QEc8voPLyZHBrRFcMhSVa2pB7TgHraJi7FcC	",
    "753539|USER=a3TnHEM1a662%3AQnvTpG3BfManbDLcGQot66meliNmx1pBVpia%2BYg7gCK4	",
    "753544|USER=ScM31iHk5HKN%3AOjWQUEwo2V1IaFuLMC35dHNtbbtag2A3tbCc3RfgVk5%2B	",
    "753545|USER=uF03AO5Ek6nH%3AtZpX1%2Fj9vhhLjYygnEUx3PMOKd1ml7qCKpO72e7IF7cr	",
    "753546|USER=1IrYSiXdt3bV%3Auh7Kgamz%2BtG7X3Ek6mf3CgvqkNvTXiII%2FenSMW7FY2O5	",
    "753549|USER=j0Tnq%2BOBK7uc%3AFTybC0BWDUZ%2FebkW%2BEl8AvlyqqTfShgDtj5DXi1gsk5z	",
    "753551|USER=5OjgrFmtCYCV%3Aec4HpHMgLyI2GBH5W3IPL8Q2KLSWVCVgYPQI0kAYjW9%2F	",
    "753552|USER=bzvXRttKKPPt%3AbCzymTtnw06qTSs9KgTz%2F3%2Fjcks1RNW7CwWKNEXwishs	",

];

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const fetchLinhMach = async (accountId, cookie) => {
    const response = await fetch("https://tutien.net/account/bang_phai/linh_mach/", {
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
    await chuyenBac("AUTO", accountId, 100);
    //await delay(2000);
    await daoKhoang(cookie);
}

const daoKhoang = async (cookie) => {
    const body = 'btnDaoLinhMach=1&txtHour=72';
    const res = await fetch("https://tutien.net/account/bang_phai/linh_mach/", {
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
            "Referer": "https://tutien.net/account/bang_phai/linh_mach/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": body,
        "method": "POST"
    });
    const content = await res.text();
    if (content == '1') {
        console.log("Đang tiến hành đào");
    } else {
        console.log(content)
    }
    return content;
}

const chuyenBac = async (fromId, toId, amount) => {
    const referrer = `https://tutien.net/member/${toId}`;
    const body = `btntangNganLuong=1&txtMoney=${amount}&member=${toId}`;
    const response = await fetch("https://tutien.net/index.php", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9,vi;q=0.8",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not A Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
            "cookie": "USER=Zf2CHIgzwART%3Au542MCcAWKHgrQ6bNfZRRg9z4gmOl6noVHa3Q5WGRyUp",
        },
        referrer,
        "referrerPolicy": "strict-origin-when-cross-origin",
        body,
        "method": "POST",
        "mode": "cors"
    });

    const res = await response.text();
    if (res == '1') {
        console.log(`[success] ${amount} bạc: ${fromId} => ${toId}`)
    } else {
        console.log(`[false] ${amount} bạc: ${fromId} => ${toId}`);
    }
    return res === '1';
}

setTimeout(async () => {
    console.log("=================" + (new Date()).toString() + "==================");
    for (let i = 0; i < ACCOUNTS.length; i++) {
        console.log(i, ACCOUNTS.length);
        const accountId = ACCOUNTS[i].split('|')[0]
        const accountCookie = ACCOUNTS[i].split('|')[1];
        await fetchLinhMach(accountId, accountCookie);
        await delay(3000);
    }
}, 10000);