# Izvori

Javni materijali Certilije i AKD-a. Koristimo ih samo kao izvor znanja; ne
objavljujemo njihove kadrove ni tekstove. Lokalne kopije su u gitignored
`istrazivanje/`.

## Videi za fazu 0

Kanal Certilia (`youtube.com/@certilia`), stanje 2026-10-30:

| ID | Trajanje | Naslov |
|---|---|---|
| `f675WcRwN4E` | 0:33 | Brza aktivacija Certilia aplikacije sa QR kodom dobivenim kod preuzimanja osobne iskaznice u MUP-u |
| `cm9rVAodkN4` | 1:34 | Aktivacija Certilia mobilne aplikacije (2025-09-26) |
| `c7uD8aZsx3o` | 0:43 | Aktivacija aplikacije sa Certilia računom |
| `_8ldfgqcR1Q` | 1:21 | Kupnja certifikata i aktivacija Certilia aplikacije |
| `lP4KsWphGE4` | 0:33 | Aktivacija Certilije na drugom uređaju |
| `LIk8cLgybaA` | 0:35 | Prijava u Certilia aplikaciju |
| `4kkT_XNbByA` | 0:29 | Prijava u e-Građane sa Certilijom |
| `CaUAnJ7hyCw` | 0:36 | Certilia Portal app |
| `qTejTVPoa0I` | 0:33 | Online aktivacija kartice |
| `XVJBQF1uvlI` | 0:42 | Obnova potpisnih certifikata |

Kanal AKD (`youtube.com/@akdd.o.o.7061`):

| ID | Trajanje | Naslov |
|---|---|---|
| `4_dEvVquoSs` | 0:32 | eOsobna I Aktivacija eOsobne iskaznice |
| `qkO1tGPYyTQ` | 1:31 | Aktivacija elektroničke osobne iskaznice |
| `O2vCVVep310` | 2:03 | e-Osobna iskaznica Gen2 |
| `G1OkHbsl7gc` | 1:49 | Aktivacija mobileID osobne iskaznice (2021., druga usluga) |

Popis se osvježava s:

```bash
yt-dlp --flat-playlist --print "%(id)s | %(duration_string)s | %(title)s" https://www.youtube.com/@certilia/videos
```

## Baza znanja

- Svi članci: https://support.certilia.com/article-list (više stranica, `?page=N`)
- Kategorije: https://support.certilia.com/category-list
- Najvažnija: https://support.certilia.com/category-list/certilia-mobileid
- Tekst članka iz spremljenog HTML-a: `python3 -I scripts/clanak-u-tekst.py <datoteka.html>`

## Ostalo

- Portal korisnika: https://portal.certilia.com
- Za integratore: https://developer.certilia.com (vidi i `~/git/domovinatv/certilia-esign`)
- eid.hr (AKD): https://eid.hr/en/mobile-identitity
- gov.hr, lista prihvaćenih vjerodajnica: https://gov.hr/hr/lista-prihvacenih-vjerodajnica/1792
- Referentna OIDC integracija: `~/git/zef/zef-certilia-worker`, `~/git/most/e-satnica/e-satnica/docs/certilia.md`
