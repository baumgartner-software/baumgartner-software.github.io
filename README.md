# Baumgartner Software Website

Dies ist eine minimalistische Astro-Seite, die automatisch nach jedem Push mit GitHub Actions gebaut und auf GitHub Pages bereitgestellt wird.

## Inhalt bearbeiten

Legen Sie neue Markdown-Dateien im Ordner `src/pages` an. Jede Datei kann optional Frontmatter verwenden und ein Layout einbinden.

## Lokale Entwicklung

```
npm install
npm run dev
```

## Deployment

Das Deployment erfolgt automatisch über den Workflow in `.github/workflows/jekyll-gh-pages.yml`. Die gebaute Seite wird auf dem Branch `gh-pages` veröffentlicht.

