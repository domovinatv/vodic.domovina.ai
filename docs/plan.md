# Plan

Dogovoreno 2026-10-30 (Matija + Claude, sesija iz `~/git/most/e-satnica`).

## Cilj

Što više građana RH što lakše postane ispravan Certilia korisnik, jer je to
preduvjet za autentifikaciju u našim aplikacijama. Kraj vodiča nije
„instalirao sam aplikaciju", nego **uspješna probna prijava** u aplikaciju koja
je korisnika poslala.

Zašto to nije trivijalno: e-satnica kod Certilije ima samo prijavu
lozinkom (`BasicAuthenticator`), pa korisniku trebaju i aktivirana aplikacija i
lozinka računa. Ljudi s čitačem osobne to obično nemaju (vidi
[nalazi.md](nalazi.md)).

## Odluke

- Samostalna Astro aplikacija, repo `domovinatv/vodic.domovina.ai`, MIT.
- **Sve vlastito.** Iz Certilia/AKD videa i baze znanja uzimamo samo znanje;
  tekst, snimke ekrana i redoslijed pišemo sami. Njihove kadrove i tekstove ne
  objavljujemo (autorsko pravo). Njihove videe smijemo ugraditi s YouTubea kao
  „službeni video" uz korak.
- Jasno „neslužbeni vodič"; „Certilia" nije naziv stranice ni domene.
  Domena `vodic.domovina.ai`, uživo od 2026-10-30.
- Bez baze i osobnih podataka. Napredak u `localStorage` (uz try/catch;
  stranica radi i bez njega).

## Faze

### 0. Istraživanje (lokalno, `istrazivanje/` je gitignored)

1. `yt-dlp` relevantnih videa (popis u [izvori.md](izvori.md), ~12 min ukupno).
2. `ffmpeg` kadrovi na promjeni scene
   (`select='gt(scene,0.3)'`, ~10–15 po videu) + kadar svake 2 s kao rezerva.
3. Apple Vision OCR (Swift skripta, `VNRecognizeTextRequest`, `hr-HR`) na svim
   kadrovima: lokalno i besplatno, a tekst na ekranu nosi većinu uputa.
4. Provjeriti ima li govora (`ffmpeg -af silencedetect`/`volumedetect`). Ako
   ima: `~/.claude/scripts/agy_glasovna.sh` (Gemini, $0). Očekujem glazbu.
5. Claude čita kadrove složene u kontakt-listove (`ffmpeg tile`), ~1 list po
   videu, ne stotine pojedinačnih slika. Bez subagenata.
6. Članke iz baze znanja (25 već skinuto u `istrazivanje/izvori/support-certilia/`,
   ukupno ~80 na `support.certilia.com/article-list`) pretvoriti u tekst
   (`scripts/clanak-u-tekst.py`).
7. Pogledati `developer.certilia.com`: može li klijent (relying party) dobiti i
   druge autentifikatore (kartica, smsID) i kako se to traži.

Izlaz: po videu `istrazivanje/videi/<id>/koraci.md` (koraci s vremenom i
OCR tekstom) i dopunjen [stablo.md](stablo.md), svaki korak s izvorom.

### 1. Potvrda stabla na stvarnim ljudima

- Glavno otvoreno pitanje: dobije li korisnik na putu A (QR kod iz MUP-a)
  lozinku računa? Ako ne, korak „postavi lozinku" je obavezan za sve
  aplikacije s `BasicAuthenticator`.
- Testeri: prva korisnica e-satnice (čitač, bez lozinke, zapela 30.10.), Matija
  („Aktiviraj na drugom uređaju"), ostatak e-satnica tima.
- Vlastite snimke ekrana snimamo tijekom tih prolazaka (iOS i Android,
  HR jezik preglednika).

### 2. Aplikacija (prva verzija objavljena 2026-10-30)

- Astro, statički (prerender), Cloudflare Workers static assets, račun
  D.O.M. (`7dc7167b7e2e00923bfa7cd697df14e4`, zona domovina.ai).
- Tok: 2–3 pitanja → korisnik vidi samo svoj put kao TODO listu. Svaki korak:
  kratki tekst, naša slika, „Gotovo ✔", „Zapeo sam" (rješenja iz nalaza), po
  potrebi ugrađeni službeni video.
- Sadržaj u Astro content collections (Markdown + frontmatter), odvojen od
  koda, da se može preuzeti i izvan aplikacije.
- Višekratnost: `src/content/aplikacije/*.json` po aplikaciji:
  `{ ime, naziv, povratak, autentifikatori: ["BasicAuthenticator"] }`.
  Ulaz `?app=e-satnica`; koraci koje autentifikatori ne trebaju se preskaču;
  zadnji korak „Probaj prijavu" vodi na `povratak`. Bez `app` vodič završava
  na portal.certilia.com.
- Hrvatski, jednostavan jezik, mobitel prvi (većina će ga čitati na istom
  mobitelu na kojem instalira aplikaciju: paziti na prebacivanje između
  preglednika i aplikacije).

### 3. Spajanje s e-satnicom

- `/prijava`: link „Nemaš Certiliju ili ne znaš lozinku?".
- `/upute`: zamijeniti ili preusmjeriti na vodič.
- Povratak bez uspjeha (ishod `napusten`) → ponuditi vodič.
- Mjera uspjeha: udio `napusten` u `prijave` prije i poslije
  (`e-satnica/scripts/prijave.sh`; vremena u D1 su UTC).

## Otvoreno

- Želimo li anonimno brojati na kojem koraku ljudi odustaju (bez identiteta)?
  Zasad ne; prvo vidjeti treba li.
- Tražiti od Certilije da e-satnici uključi i prijavu karticom/smsID?
