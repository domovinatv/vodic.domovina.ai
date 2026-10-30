# Stablo odluka (hipoteza)

Stanje 2026-10-30, nakon analize videa (faza 0). Svaki čvor ima izvor
(članak ili video s vremenom); čvorove označene s **?** treba potvrditi
stvarnim prolaskom (faza 1).

Glavna promjena u odnosu na prvu verziju: **lozinka računa nije zaseban
kraj puta, nego prolazi kroz sve puteve.** Na putu A postavlja se tijekom
aktivacije. Na putu C bez nje se ne može ni početi, jer je smsID drugi korak
nakon lozinke, a ne zamjena za nju. Prijava u samu aplikaciju također uvijek
traži lozinku.

```mermaid
flowchart TD
    S([Start]) --> Q1{Aplikacija Certilia<br/>već radi na mobitelu?}
    Q1 -- da --> Q1L{Znaš lozinku<br/>Certilia računa?}
    Q1L -- da --> T
    Q1L -- ne --> R1[Zaboravljena lozinka<br/>→ OIB ili e-mail → link mailom] --> T
    Q1 -- ne --> Q2{Imaš Certilia račun?<br/>npr. ranije prijave na portal}
    Q2 -- da / možda --> Q3{Znaš lozinku?}
    Q3 -- ne --> R2[Zaboravljena lozinka<br/>na portal.certilia.com] --> C
    Q3 -- da --> C[Put C: aplikacija → „Imam Certilia račun"<br/>→ portal: lozinka + kod SMS-om<br/>→ mobileID „…" → Aktiviraj]
    Q2 -- ne / ne znam --> Q4{Osobna s čipom<br/>izdana nakon 2.8.2021.?}
    Q4 -- ne --> N([Nova osobna u MUP-u, pa ispočetka])
    Q4 -- da --> Q5{Što ti je lakše?}
    Q5 -- šalter MUP-a --> A[Put A: QR kod sa šaltera<br/>→ aplikacija → „Imam QR kod"<br/>→ SMS kod → e-mail i kod<br/>→ postavi dvije lozinke]
    Q5 -- imam čitač i PIN-ove --> B[Put B: portal.certilia.com karticom<br/>→ ? postavi lozinku računa<br/>→ mobileID → Aktiviraj → QR 30 s]
    A --> O
    B --> O
    C --> O
    O[Prijava u aplikaciju lozinkom<br/>+ dopusti obavijesti] --> T[Probna prijava u aplikaciju<br/>koja te poslala]
    T --> K([Gotovo ✔])
```

## Izvori po čvoru

Videi su navedeni kao `id @ vrijeme`; bilješke su u
`istrazivanje/videi/<id>/koraci.md` (lokalno).

| Čvor | Tvrdnja | Izvor | Stanje |
|---|---|---|---|
| Q1L, R1 | Reset lozinke iz ekrana prijave (OIB ili e-mail) | članak „zaboravio sam lozinku… mobilnom vjerodajnicom"; „Forgot Password?" na idp ekranu `LIk8cLgybaA @ 18 s` | potvrđeno izvorom |
| O | Prijava u aplikaciju: e-mail/OIB + lozinka, zatim mobileID ili smsID | `LIk8cLgybaA @ 18–26 s`, `c7uD8aZsx3o @ 26–32 s` | potvrđeno izvorom |
| O | Push potvrda ima odbrojavanje (~60 s) | `c7uD8aZsx3o @ 32 s` | potvrđeno izvorom |
| O | Bez dozvole za obavijesti push ne stiže | članak „notifikacije mi ne stižu" | potvrđeno izvorom |
| Q2 | Nova aplikacija (1.0.181) na prvom ekranu nudi „Imam Certilia račun / Imam QR kod / Nemam ništa" | `c7uD8aZsx3o @ 6 s` | potvrđeno izvorom; starije verzije imaju samo „Aktiviraj" (`f675WcRwN4E @ 6 s`) |
| C | Portal „samo mobitelom": korisničko ime + lozinka, pa smsID kod, pa „…" → Aktiviraj, „Open in Certilia" | `cm9rVAodkN4 @ 54–86 s`; članak „aktivacija samo mobitelom" | potvrđeno izvorom |
| C | Isto s računala: portal → mobileID → Aktiviraj → aplikacija skenira QR koji vrijedi ~30 s | `cm9rVAodkN4 @ 10–30 s` | potvrđeno izvorom |
| C | „Imam Certilia račun" u aplikaciji otvara isti portalni tok | `c7uD8aZsx3o @ 10–22 s` (prijava na portal izrezana iz videa) | **?** |
| Q4 | QR na šalteru samo za eOI izdane nakon 2.8.2021. | članak „QR kod za brzu aktivaciju" | potvrđeno izvorom |
| A | QR istječe; novi se traži u MUP-u | papir na `f675WcRwN4E @ 8 s`; isti članak | potvrđeno izvorom |
| A | Nakon skena: SMS kod na broj iz MUP-a → e-mail → kod na e-mail | `f675WcRwN4E @ 12–18 s` | potvrđeno izvorom |
| A | **Postavljaju se dvije lozinke: za Certilia račun i za udaljeni potpisni certifikat** | `f675WcRwN4E @ 18–20 s` | potvrđeno izvorom |
| A | Na kraju se prihvaća udaljeni potpisni certifikat (2 godine) | `f675WcRwN4E @ 26 s` | potvrđeno izvorom |
| B | Portal prima prijavu karticom („Certilia or eID card") | `CaUAnJ7hyCw @ 8 s`; `portal.certilia.com` nudi `x509CertificateAuthenticator` | potvrđeno izvorom |
| B | Prijavom karticom bez računa nastaje račun i može se postaviti lozinka | — (portal ima `CreateAccountAuthenticator`; registracija 2021. tražila je lozinku, `G1OkHbsl7gc @ 38–50 s`) | **?** glavno otvoreno pitanje faze 1 |
| — | Aktivacija na drugom mobitelu gasi stari | `lP4KsWphGE4 @ 10 s`; članak „više mobitela" | potvrđeno izvorom |
| — | Moja Certilia pokazuje stanje: lozinka, smsID (broj), mobileID aktivan ili ne | `CaUAnJ7hyCw @ 18 s` | potvrđeno izvorom; dobro za korak „Zapeo sam" |
| — | Istekom svih certifikata račun se briše; obnova ide iz aplikacije | članak „istekli certifikati"; `XVJBQF1uvlI` | potvrđeno izvorom |

## Grane koje još treba istražiti

- **Put B s računom ili bez njega**: što točno vidi netko tko prvi put uđe na
  portal karticom (prva korisnica e-satnice, faza 1).
- Nema osobne s čipom (strani državljani, stariji dokumenti).
- Kartica bez PIN omotnice: PIN se rješava u policijskoj upravi
  (`qkO1tGPYyTQ @ 56 s`).
- FINA/kID kartica; Certilia kartica (aktivacija kroz Middleware,
  `qTejTVPoa0I`).
- eOI mobileID na `mobile.eid.hr` (AKD, 2021.) nije Certilia mobileID.
