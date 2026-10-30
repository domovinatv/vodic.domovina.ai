# Stablo odluka (hipoteza)

Stanje 2026-10-30: složeno iz baze znanja, prije analize videa. Svaki čvor
treba potvrditi izvorom (članak/video s vremenom) ili stvarnim prolaskom.

```mermaid
flowchart TD
    S([Start]) --> Q1{Imaš aplikaciju Certilia<br/>i znaš lozinku računa?}
    Q1 -- da --> T[Probna prijava]
    Q1 -- ne znam lozinku --> L
    Q1 -- ne --> Q2{Osobna s čipom izdana<br/>nakon 2.8.2021.?}
    Q2 -- ne --> N([Nova osobna u MUP-u, pa ispočetka])
    Q2 -- da --> Q3{Koji put ti je najlakši?}
    Q3 -- A: odem na šalter --> A[Šalter za osobne: traži QR kod<br/>→ instaliraj Certilia → skeniraj QR]
    Q3 -- B: imam čitač i PIN-ove --> B[portal.certilia.com karticom<br/>→ Moja Certilia → Sigurnost → mobileID → Aktiviraj<br/>→ skeniraj QR aplikacijom]
    Q3 -- C: imam Certilia račun s mobitelom --> C[portal.certilia.com sa smsID<br/>→ isto: Aktiviraj → potvrdi u aplikaciji]
    A --> L
    B --> L
    C --> L
    L{Imaš lozinku računa?} -- ne / ne znam --> R[Ekran prijave → Zaboravljena lozinka<br/>→ OIB ili e-mail → link mailom → nova lozinka]
    L -- da --> O
    R --> O[Dopusti obavijesti aplikaciji Certilia]
    O --> T
    T --> K([Gotovo ✔ natrag u aplikaciju])
```

## Što svaki čvor treba potvrditi

| Čvor | Pretpostavka | Izvor dosad |
|---|---|---|
| Q2 | QR na šalteru samo za eOI izdane nakon 2.8.2021. | članak „QR kod za brzu aktivaciju" |
| A | Put bez računala i čitača; QR brzo istječe | isti članak; video `f675WcRwN4E` |
| A → L | **Nepoznato**: postoji li nakon QR aktivacije lozinka? | video `c7uD8aZsx3o`, `LIk8cLgybaA` |
| B | Portal prima prijavu karticom (x509) | `portal.certilia.com` nudi `x509CertificateAuthenticator` |
| C | smsID radi samo ako račun već ima broj mobitela | članak „aktivacija samo mobitelom" |
| R | Reset lozinke s OIB-om radi i s ekrana prijave aplikacije | članak „zaboravio sam lozinku… mobilnom vjerodajnicom" |
| O | Bez dozvole za obavijesti push ne stiže | članak „notifikacije mi ne stižu" |
| — | Aplikacija aktivna samo na jednom mobitelu | članak „više mobitela" |
| — | Istekom svih certifikata račun se briše | članak „istekli certifikati" |

Grane koje još treba istražiti: nema osobne s čipom (strani državljani,
stariji dokumenti), kartica bez PIN omotnice, FINA/kID kartica, eOI mobileID
na `mobile.eid.hr` (AKD-ova usluga, nije isto što i Certilia mobileID).
