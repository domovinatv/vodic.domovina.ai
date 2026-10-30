// Putevi iz docs/stablo.md: koji koraci, kojim redom.
export const putevi: Record<string, string[]> = {
  // Aplikacija radi i lozinka je poznata.
  spreman: ["obavijesti", "probna-prijava"],
  // Aplikacija radi, lozinka zaboravljena.
  "spreman-bez-lozinke": ["reset-lozinke", "obavijesti", "probna-prijava"],
  // Put C: postojeći račun, aktivacija preko portala.
  racun: ["instaliraj", "c-prijava-portal", "aktiviraj-portal", "prijava-aplikacija", "obavijesti", "probna-prijava"],
  "racun-bez-lozinke": ["reset-lozinke", "instaliraj", "c-prijava-portal", "aktiviraj-portal", "prijava-aplikacija", "obavijesti", "probna-prijava"],
  // Put A: QR kod sa šaltera MUP-a.
  salter: ["salter-qr", "instaliraj", "a-skeniraj", "a-sms-email", "a-lozinke", "prijava-aplikacija", "obavijesti", "probna-prijava"],
  // Put B: osobna u čitaču.
  citac: ["instaliraj", "b-portal-kartica", "b-lozinka", "aktiviraj-portal", "prijava-aplikacija", "obavijesti", "probna-prijava"],
  // Osobna bez čipa ili starija od 2.8.2021.
  "nova-osobna": ["nova-osobna"],
};

export type Pitanje = {
  id: string;
  tekst: string;
  pomoc?: string;
  odgovori: { tekst: string; dalje: string }[]; // dalje: id pitanja ili "put:<ime>"
};

export const pitanja: Pitanje[] = [
  {
    id: "radi",
    tekst: "Imaš li na mobitelu aplikaciju Certilia i otvara li se bez traženja aktivacije?",
    odgovori: [
      { tekst: "Da, aplikacija radi", dalje: "lozinka" },
      { tekst: "Ne, ili ne znam", dalje: "racun" },
    ],
  },
  {
    id: "lozinka",
    tekst: "Znaš li lozinku svog Certilia računa?",
    pomoc: "To je lozinka koju upisuješ uz e-mail ili OIB na ekranu „Prijava” (Sign In). Nije PIN osobne iskaznice ni lozinka potpisnog certifikata.",
    odgovori: [
      { tekst: "Da", dalje: "put:spreman" },
      { tekst: "Ne, ili se ne sjećam", dalje: "put:spreman-bez-lozinke" },
    ],
  },
  {
    id: "racun",
    tekst: "Imaš li već Certilia račun?",
    pomoc: "Imaš ga ako se na portal.certilia.com već prijavljuješ e-mailom ili OIB-om i lozinkom, ili ako imaš kupljen Certilia certifikat. Ulazak u e-Građane čitačem osobne ne znači da imaš račun.",
    odgovori: [
      { tekst: "Da", dalje: "racun-lozinka" },
      { tekst: "Ne, ili ne znam", dalje: "osobna" },
    ],
  },
  {
    id: "racun-lozinka",
    tekst: "Znaš li lozinku tog računa?",
    odgovori: [
      { tekst: "Da", dalje: "put:racun" },
      { tekst: "Ne, ili se ne sjećam", dalje: "put:racun-bez-lozinke" },
    ],
  },
  {
    id: "osobna",
    tekst: "Je li tvoja osobna iskaznica izdana 2. kolovoza 2021. ili kasnije?",
    pomoc: "Datum izdavanja piše na poleđini. Te osobne imaju čip i mogu se koristiti za Certiliju.",
    odgovori: [
      { tekst: "Da", dalje: "nacin" },
      { tekst: "Ne", dalje: "put:nova-osobna" },
    ],
  },
  {
    id: "nacin",
    tekst: "Što ti je lakše?",
    odgovori: [
      { tekst: "Otići na šalter za osobne iskaznice u policiji", dalje: "put:salter" },
      { tekst: "Imam čitač kartica na računalu i znam PIN-ove osobne", dalje: "put:citac" },
    ],
  },
];
