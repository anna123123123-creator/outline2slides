# Outline2Slides

**[Live demo →](https://anna123123123-creator.github.io/outline2slides/)**

A free, open-source tool that splits a text outline into slides with a live preview, then exports [Marp](https://marp.app/) Markdown — which Marp CLI or Marp for VS Code turns into real PPTX, PDF or HTML slides. No install, no signup, no network.

![screenshot](screenshot.png)

## Run it

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## Outline syntax

```
# First slide title
- Point one
- Point two

# Second slide title
- Point one
```

A line starting with `#` begins a new slide, `-` lines are that slide's bullets, and a blank line also separates slides.

## Using the export

The exported `slides.md` is standard Marp. With [Marp CLI](https://github.com/marp-team/marp-cli) installed:

```bash
npx @marp-team/marp-cli slides.md --pptx
```

## License

MIT.
