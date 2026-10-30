# vodic.domovina.ai

Neslužbeni vodič, korak po korak, kojim svaki građanin RH dođe do ispravne
Certilia prijave: aplikacija Certilia na mobitelu + lozinka Certilia računa +
probna prijava koja uspije.

**Uživo: <https://vodic.domovina.ai>**

**Nije službena stranica Certilije ni AKD-a.** Svi tekstovi su naši;
postojeći Certilia/AKD videi i baza znanja služe samo kao izvor znanja (vidi
[`docs/izvori.md`](docs/izvori.md)). Službena podrška Certilije:
helpdesk@certilia.com, 0800 0440.

## Zašto

Prijava Certilijom preduvjet je za ulazak u
[e-satnicu](https://e-satnica.domovina.ai), a ljudi zapinju prije nego što
stignu do nje. Najčešći razlog: u e-Građane ulaze čitačem osobne, a nemaju
aktiviranu aplikaciju ni lozinku Certilia računa. Neke aplikacije (među njima
e-satnica) od Certilije dobivaju samo prijavu lozinkom i potvrdom na mobitelu.
Detalji su u [`docs/nalazi.md`](docs/nalazi.md).

## Kako radi

1. Dva do pet pitanja (radi li aplikacija, postoji li račun, kakva je osobna).
2. Korisnik vidi samo svoj put kao popis koraka. Svaki korak ima kratak tekst,
   „Zapeo sam" s rješenjima i, gdje postoji, poveznicu na službeni video.
3. Napredak se pamti u pregledniku (`localStorage`), bez računa i bez
   slanja podataka. Stranica radi i kad je spremanje blokirano.
4. Zadnji korak je probna prijava u aplikaciju koja je korisnika poslala.

Putevi i izvori za svaki korak opisani su u [`docs/stablo.md`](docs/stablo.md).
Koraci označeni kao „još provjeravamo” nisu potvrđeni stvarnim prolaskom.

## Poveži svoju aplikaciju

Svaka aplikacija s „Prijava s Certilijom" može slati korisnike ovamo:

```
https://vodic.domovina.ai/?app=<ime>
```

Za novu aplikaciju dodaj `src/content/aplikacije/<ime>.json`:

```json
{
  "naziv": "e-satnica",
  "povratak": "https://e-satnica.domovina.ai/prijava",
  "autentifikatori": ["BasicAuthenticator"]
}
```

`povratak` je adresa na koju vodi zadnji korak. Koje autentifikatore tvoja
aplikacija dobiva od Certilije vidi se u URL-u prijave (`authenticators=`),
upute su u [`docs/nalazi.md`](docs/nalazi.md). Bez `?app` vodič završava na
portal.certilia.com.

## Struktura

```
src/content/koraci/*.md       jedan korak: naslov, izvor, „Zapeo sam", tekst
src/content/aplikacije/*.json aplikacije koje šalju korisnike (?app=)
src/putevi.ts                 pitanja i redoslijed koraka po putu
src/pages/index.astro         stranica i klijentska logika
scripts/videi.sh              faza 0: kadrovi i OCR iz javnih videa
scripts/ocr.swift             Apple Vision OCR (macOS)
docs/                         plan, stablo odluka, nalazi, izvori
```

Tekst koraka mijenja se u Markdownu, bez diranja koda. Ispravci su dobrodošli
kao issue ili pull request.

## Razvoj

Treba Node 22+.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # statički izlaz u dist/
npm run preview    # wrangler dev, kao u produkciji
```

## Objava

Statička stranica (Astro) na Cloudflare Workers static assets, račun D.O.M.,
custom domena `vodic.domovina.ai` (`wrangler.jsonc`).

```bash
npm run deploy     # astro build && wrangler deploy
```

## Istraživanje

`istrazivanje/` je u `.gitignore`: preuzeti videi, kadrovi, OCR i članci
tuđi su autorski sadržaj i ostaju lokalno. U repo idu samo naši zaključci
(`docs/`) i skripte kojima se istraživanje ponavlja.

## Licenca

[MIT](LICENSE). Licenca pokriva naš kod i tekstove; nazivi Certilia i AKD te
sadržaj na koji vodimo pripadaju svojim vlasnicima.
