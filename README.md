# Visual Novel Template

A flexible, browser-based visual novel engine built with **TypeScript**, **Tailwind CSS**, and **Vite** — no frameworks or libraries required.

This project is designed to allow anyone to write, edit, preview, and play through custom visual novel scenes using structured JSON files. It aims to combine the visual feel of classic visual novels with the flexibility of a modern web development stack.

You can use it to:
- Build full-fledged visual novels with dialogue, avatars, and dynamic scenes
- Create a VN-style storytelling layer for web games or interactive experiences
- Rapidly prototype storyboards for narrative design
- Generate and preview scene JSON using an in-browser dashboard

---

## 🚨 Important Notes

This engine is currently in **alpha** — it's a work-in-progress and **not ready for production use** yet. Expect breaking changes, missing features, and rough edges.

That said, contributions, feedback, and support are very welcome ❤️

If you like this project and want to support development, feel free to visit my Ko-fi:

👉 [https://ko-fi.com/godokadev](https://ko-fi.com/godokadev)

Thank you!

---

## 🛠 How to Install & Run

1. **Clone the repository**

```bash
git clone https://github.com/victorgodoka/vnjs.git
cd vnjs
```

2. **Install dependencies**

```bash
npm install
```
```bash
yarn install
```

3. **Start the development server**

```bash
npm run dev
```
```bash
yarn dev
```

This will start Vite and open the project at `http://localhost:5173`.

- Access the **Visual Novel** at `/`
- Access the **Dashboard** at `/dashboard`
- Use `/` (Home page) to test custom JSONs and preview them at `/preview`

4. **Build for production**

```bash
npm run build
```

The output will be in the `dist/` folder, ready for deployment.

---

## 🚀 Deploying

### GitHub Pages

You can use the `vite-plugin-static-copy` or serve the `dist/` folder as a static site:

1. In `vite.config.ts`, set:
```ts
base: '/your-repo-name/',
```

2. Build the project:
```bash
npm run build
```

3. Push the `dist/` folder to the `gh-pages` branch or use a tool like [`gh-pages`](https://www.npmjs.com/package/gh-pages):
```bash
npm install -D gh-pages
npx gh-pages -d dist
```

4. Enable GitHub Pages on your repo settings.

### Vercel

1. Go to [https://vercel.com](https://vercel.com) and import your GitHub repo
2. Set the framework to **Vite** (it will auto-detect)
3. Make sure the output directory is set to `dist`
4. Click **Deploy**

That's it! You’ll have a live URL ready to share.

---

## Image Structure

To keep your assets organized and functional within the engine, follow this structure:

- **All images must be placed inside the** `public/assets/` **directory.**
- **Backgrounds** go inside: `public/assets/backgrounds/`
- **Character avatars** go inside: `public/assets/chars/`

You can create subfolders freely inside `backgrounds` and `chars` — for example:

```
public/assets/chars/petra/PETRA_IDLE.png
public/assets/chars/nyx/NYX_SMILE.png
public/assets/backgrounds/town/night.jpg
```

The dashboard will **automatically detect all PNG files** in these folders and populate avatar selectors accordingly.

This makes it easy to manage large projects or organize by chapter, character, or scene.

---

## 🏷 Attribution for Default Images

Some default background and character images used in the project come from **Unsplash** and are included for demo purposes only. All rights belong to their respective authors.

- [Jack Deng](https://unsplash.com/@jacdeng) on [Unsplash](https://unsplash.com/photos/4vCGlBMxtMs)
- [Anthony Riera](https://unsplash.com/@frenchriera) on [Unsplash](https://unsplash.com/photos/PjqQ0hRlONs)
- [Cody Boileau](https://unsplash.com/@cboileau) on [Unsplash](https://unsplash.com/photos/Powgsxla7Es)
- [Alexander Zaytsev](https://unsplash.com/@anwaltzzz) on [Unsplash](https://unsplash.com/photos/C8K6kxNe-dQ)

Please do not use these images in production projects unless you verify the licensing terms on Unsplash.

---

## 🙌 Final Words

This is a passion project built out of love for storytelling, design, and visual novels. While it’s still evolving, the goal is to keep it lightweight, intuitive, and endlessly customizable.

If you have ideas, feedback, or want to contribute, feel free to open an issue or reach out.

Thanks for checking out this project — and may your stories shine as brightly as your code! ✨