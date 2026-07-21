import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    summary: z.string(),
    year: z.number().int(),
    startYear: z.number().int().optional(),
    endYear: z.number().int().optional(),
    category: z.string(),
    technologies: z.array(z.string()).min(1),
    featured: z.boolean(),
    order: z.number().int().positive(),
    coverImage: z.string(),
    gallery: z.array(z.string()).optional(),
    projectUrl: z.url().optional(),
    repositoryUrl: z.url().optional(),
    clientName: z.string().optional(),
    role: z.string().optional(),
    nda: z.boolean(),
    draft: z.boolean(),
    placeholder: z.boolean().default(true),
  }),
});

export const collections = { projects };
