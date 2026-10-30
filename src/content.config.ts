import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Jedan korak vodiča. Tekst je naš; izvor je članak ili video iz docs/izvori.md.
const koraci = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/koraci" }),
  schema: z.object({
    naslov: z.string(),
    izvor: z.string(),
    // Korak koji još nismo potvrdili stvarnim prolaskom (docs/stablo.md, „?").
    nepotvrdeno: z.boolean().default(false),
    // Službeni Certilia video uz korak (YouTube id), samo kao poveznica.
    video: z.string().optional(),
    zapeo: z.array(z.object({ problem: z.string(), rjesenje: z.string() })).default([]),
  }),
});

// Aplikacija koja šalje korisnike u vodič: ?app=<ime datoteke>.
const aplikacije = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/aplikacije" }),
  schema: z.object({
    naziv: z.string(),
    povratak: z.string().url(),
    autentifikatori: z.array(z.string()),
  }),
});

export const collections = { koraci, aplikacije };
