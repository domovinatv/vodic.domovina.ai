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

## Videi

Nijedan nema titlove (`yt-dlp`: `subtitles: NA`). Popis u [izvori.md](izvori.md).
Analiza (faza 0) još nije napravljena.

## Dva različita „mobileID-a"

- **Certilia mobileID**: aplikacija Certilia, koristi je „Prijava s Certilijom".
- **mobileID osobne iskaznice** (AKD, `mobile.eid.hr`, video `G1OkHbsl7gc`
  iz 2021.): udaljeni certifikat eOI. Ljudi ih miješaju; vodič mora jasno reći
  da nam treba prvi.
