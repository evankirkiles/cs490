# Senior Project

Student: Evan Kirkiles

Advisor: Scott Petersen

FOR SCOTT 3/8/2024: My current working draft of my writeup can be found as [4. CPSC490 – Evan Kirkiles Midway Draft](https://github.com/evankirkiles/cs490/blob/main/files/4.%20CPSC490%20–%20Evan%20Kirkiles%20Midterm%20Report.pdf)

This repo hosts my (admittedly disorganized, for now) senior project work. Most importantly:

The `files` directory hosts all of my writeups so far in the course. This includes proposals, presentations, and will eventually include the final writeup.

The `apps` directory hosts demo sites built with JS frameworks. This is where the web tool for debugging cache headers will be implemented, as well as a testing Astro website for debugging the `cf-cache` package.

The `packages` directory hosts shared code for the `apps` directory—ESLint and TypeScript configs, as well as the `cf-cache` package, a pull-style server caching layer that can be dropped into a middleware function (I've used this with Astro SSR) to prevent re-execution of route building. Because this cache supports manual revalidation, it effectively implements Vercel-style Incremental Static Regeneration in Astro, a much-requested technique not currently supported out-of-the-box by the framework. The caching layer is not limited just to caching Astro SSR outputs—it can also be used to cache fetch request responses, similar to Vercel's "Data Cache" with Next.js.
