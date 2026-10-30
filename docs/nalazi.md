# Nalazi

## e-satnica nudi samo prijavu lozinkom (2026-10-30)

Kad `https://e-satnica.domovina.ai/auth/certilia/start` preusmjeri na
`idp.certilia.com`, stranica za prijavu nosi parametar
`authenticators=BasicAuthenticator:LOCAL`: samo e-mail/OIB + lozinka, zatim
potvrda push obavijesti u aplikaciji. Nema prijave karticom/čitačem ni smsID-a.

Za usporedbu, `portal.certilia.com` nudi
`BasicAuthenticator`, `x509CertificateAuthenticator` (kartica) i
`CreateAccountAuthenticator`. Popis autentifikatora određuje Certilia po
klijentu.

Posljedica: korisnik koji u e-Građane ulazi čitačem osobne ne može ući u
e-satnicu dok ne aktivira aplikaciju i ne postavi lozinku. Upravo se to
dogodilo prvoj stvarnoj korisnici (30.10.: pet napuštenih pokušaja zaredom,
pa poruka „preko čitača ulazim u Certiliju, ali u e-satnicu me odbija").

Provjera za bilo koju aplikaciju:

```bash
u=$(curl -s -o /dev/null -w "%{redirect_url}" https://<app>/auth/certilia/start)
curl -s -o /dev/null -w "%{redirect_url}\n" "$u" | tr '&' '\n' | grep authenticators
```

(Svaki takav poziv u e-satnici ostavi red `napusten` u tablici `prijave`.)

## Baza znanja Certilije

`support.certilia.com` (Faveo helpdesk): ~80 članaka u 11 kategorija, bez slika.
Za onboarding je bitna kategorija `certilia-mobileid` i `korisnicki-racun`.
Najkorisnije (sažeto našim riječima):

- **Aktivacija samo mobitelom** (2025.): portal.certilia.com → prijava smsID
  (kod SMS-om) → Moja Certilia → Sigurnost → Certilia mobileID → „…" →
  Aktiviraj ili Aktiviraj na drugom uređaju → Potvrdi u aplikaciji → Prijava
  → potvrdi push.
- **QR kod na šalteru** (2025.): uz eOI izdanu nakon 2.8.2021. na šalteru za
  uručenje osobnih odmah se dobije QR kod za aktivaciju aplikacije; kod
  istječe, novi se traži u policijskoj postaji.
- **Zaboravljena lozinka**: na ekranu prijave „Zaboravljena lozinka" → OIB
  ili e-mail → mail s linkom.
- **Pravila lozinke**: velika i mala slova, broj, najmanje 8 znakova.
- **Jedan mobitel**: aplikacija aktivna samo na jednom uređaju; promjena
  neograničena, stari uređaj se može deaktivirati s portala.
- **Ponovna aktivacija** treba nakon deinstalacije ili brisanja podataka
  aplikacije.
- **Obavijesti**: bez dozvole push ne stiže; inače „Aktiviraj na drugom uređaju".
- **Istekli certifikati**: kad isteknu svi, račun se automatski briše; tihi
  uzrok kod ljudi koji su Certiliju nekad koristili.
- **Jezik**: portal je na jeziku preglednika (otud engleski ekrani).
- **Mail s aktivacijom** dolazi s `no-reply@certilia.com` (provjeriti spam);
  helpdesk `helpdesk@certilia.com`.
- Prvi Google rezultat („Kako aktivirati Certilia mobileID?", 2021.) je zbrkan
  oko preduvjeta (reg.certilia.com, udaljeni certifikat); ne pratiti ga.

## Videi (faza 0, 2026-10-30)

14 videa iz [izvori.md](izvori.md), analizirano lokalno: kadar svake 2 s
(rezanje na promjeni scene daje samo 1–5 kadrova, jer su to animirani snimci
ekrana), Apple Vision OCR (`scripts/ocr.swift`), jedan kontakt-list po videu.
Nijedan nema titlove. Govor nije provjeren: zvuk je stalan (srednja glasnoća
−7 do −23 dB, gotovo bez tišina), što odgovara glazbenoj podlozi, a pokušaj
transkripcije (`agy_glasovna.sh` na `c7uD8aZsx3o`) vratio se bez izlaza nakon
308 s. Tekst na ekranu nosi sve korake, pa to ne mijenja zaključke. Bilješke po videu: `istrazivanje/videi/<id>/koraci.md`
(lokalno, gitignored). Postupak je u `scripts/videi.sh`.

Najvažnije:

- **Na putu A (QR sa šaltera) korisnik postavlja lozinku računa.** Nakon
  skena QR-a stiže SMS kod na broj zapisan u MUP-u, zatim se upisuje e-mail
  i kod s e-maila, pa na jednom ekranu dvije lozinke: za Certilia korisnički
  račun i za udaljeni potpisni certifikat (`f675WcRwN4E @ 12–20 s`). Ljudi ih
  lako zamijene. Vodič mora reći da za prijavu treba prva i da je treba
  zapisati.
- **smsID nije zamjena za lozinku.** Na portalu se prvo upišu korisničko ime
  i lozinka, a tek onda bira drugi korak: smsID, mobileID ili „low level
  login" (`cm9rVAodkN4 @ 60–70 s`, `LIk8cLgybaA @ 18–24 s`). Članak „aktivacija
  samo mobitelom" to prešućuje. Tko nema lozinku, prvo je resetira.
- **Prijava u aplikaciju nakon aktivacije uvijek ide lozinkom** + push
  potvrdom (`c7uD8aZsx3o @ 26–32 s`, `cm9rVAodkN4 @ 38–46 s`).
- **Nova aplikacija (1.0.181, svibanj 2026.) na prvom ekranu pita** „Imam
  Certilia račun / Imam QR kod / Nemam ništa" (`c7uD8aZsx3o @ 6 s`). Naše prvo
  pitanje treba ići istim redom, da korisnik prepozna ekran.
- **QR za aktivaciju s portala vrijedi ~30 s** (odbrojavanje,
  `cm9rVAodkN4 @ 22–26 s`). Ako se prebacuje između preglednika i aplikacije
  na istom mobitelu, tok ide preko „Open in Certilia?", a ne preko QR-a
  (`cm9rVAodkN4 @ 80 s`).
- **Push potvrda ima odbrojavanje od ~60 s** (`c7uD8aZsx3o @ 32 s`).
- **Ekrani prijave (idp) često su na engleskom** („Sign In", „Forgot
  Password?", „Continue"). U vodiču zato navodimo oba naziva.
- Registracija osobnom i čitačem iz 2021. također je tražila lozinku
  (`G1OkHbsl7gc @ 38–50 s`). Tko je tada prošao, ima račun, ali možda je
  zaboravio lozinku ili mu je račun obrisan istekom certifikata.
- e-Građani nude „eOsobna iskaznica" (čitač) i „Certilia osobni mobile.ID"
  kao zasebne vjerodajnice (`4kkT_XNbByA @ 4–10 s`). Ulazak u e-Građane
  čitačem zato ne znači da korisnik ima Certilia račun. Upravo to je slučaj
  korisnice od 30.10.
- Kanal AKD-a (`qkO1tGPYyTQ`, `O2vCVVep310`, `4_dEvVquoSs`) pokriva
  aktivaciju same osobne (PIN-ovi, Middleware) i promociju. Za Certilia
  račun ne daje korake.

Otvoreno za fazu 1: što vidi netko tko se prvi put prijavi na portal karticom
(nastaje li račun i gdje se postavlja lozinka). Moja Certilia ima stavku
„Certilia lozinka" (`CaUAnJ7hyCw @ 18 s`), ali tok nijedan video ne pokazuje.

## developer.certilia.com: može li klijent tražiti karticu ili smsID?

Sam ne može. Obrazac za OIDC servis na developer portalu nudi Callback URL,
Grant Types, Scope, tražene podatke o korisniku i trajanje tokena, ali ne i
izbor načina prijave. U dokumentaciji piše samo „The user authenticates
using Certilia Mobile ID". OIDC discovery (`idp.certilia.com/oauth2/oidcdiscovery/.well-known/openid-configuration`)
vraća `acr_values_supported: null`, dakle ni razina sigurnosti ne može se
tražiti parametrom. Popis autentifikatora (`authenticators=` u URL-u prijave)
postavlja Certilia po klijentu. Kartica ili smsID za e-satnicu mogu se dobiti
samo zahtjevom helpdesku (`helpdesk@certilia.com`), ako uopće.

## Dva različita „mobileID-a"

- **Certilia mobileID**: aplikacija Certilia, koristi je „Prijava s Certilijom".
- **mobileID osobne iskaznice** (AKD, `mobile.eid.hr`, video `G1OkHbsl7gc`
  iz 2021.): udaljeni certifikat eOI. Ljudi ih miješaju; vodič mora jasno reći
  da nam treba prvi.
