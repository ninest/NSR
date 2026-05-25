
- This is a Nuxt 2 static content site. Articles live in `src/content/articles/*.md`; shared layout is in `src/components/layouts/Default.vue`.
- Global typography and markdown content styling belong in `src/styles/font.scss`.
- Keep UI changes compact and information dense. Prefer small shared style edits over page-specific overrides.
- Use `npm run build` to verify. Existing Nuxt/Sass deprecation warnings and asset-size warnings are expected.

## Content writing
- Match my writing style
- Never use em dashes
- Use short paragraphs, bullet lists, subheadings, etc, to make content easier to read

## Agents and harness
- Be as concise as possible, and sacrifice grammar for the sake of concision
- While planning:
  - Interview me relentlessly about every aspect of this plan until we reach a shared understanding; walk down each branch of the design tree, resolving dependencies between decisions one-by-one
  - For each question, provide your recommended answer; ask the questions one at a time
  - If a question can be answered by exploring the codebase, explore the codebase instead
