# SPINGIII

Calisthenics program app: handstand push-ups, front lever and planche.
It's a PWA, so it installs to the Home Screen and works offline. Language switches between EN and IT.

## Files
| File | What it is |
|---|---|
| `program.json` | The program: days, exercises, warm-up and bands. The coach editor writes to this file. |
| `index.html`, `app.css`, `app.js` | The app. The three palettes are at the top of `app.css`. |
| `sw.js` | Offline cache. **Bump `V` (e.g. `spingiii-v2`) whenever you change app.css or app.js.** |
| `manifest.webmanifest`, `icon*` | Install metadata and icons |

## Put it online (GitHub Pages, once)
1. On github.com, create a new **public** repo called `spingiii`.
2. Click **Add file → Upload files** and drag in every file from this folder. Commit.
3. Go to **Settings → Pages**. Under Source pick *Deploy from a branch*, then `main` and `/ (root)`. Save.
4. After about a minute it's live at `https://<your-username>.github.io/spingiii/`. Send Darius that link.
   On iPhone: Safari → Share → *Add to Home Screen*. On Android: Chrome → ⋮ → *Install app*.

## Editing the program (coach)
1. Open the app on your phone → **Settings → Coach mode** → **Edit program**.
2. The first time, create a token: GitHub → Settings → Developer settings → *Fine-grained tokens* → Generate.
   Under Repository access choose *Only select repositories → spingiii*. Under Permissions set *Contents: Read and write*.
   Paste the token in the GitHub section of the editor. It's stored only on your phone.
3. Make your changes. While you edit, the app shows your draft so you can preview it.
4. Tap **Publish**. This commits `program.json`. About a minute later Darius gets a "Program updated" toast the next time he opens the app.

## Reordering the week
- Tap **Reorder** on the home page (or press `R`). Then hold a day and drag it, or grab the ≡ handle to drag straight away. On a computer you can also use ↑ ↓.
- **Coach mode on:** the change goes into your draft. Publish it to change the plan for Darius.
- **Coach mode off:** the order is only changed on that phone. **Back to coach’s order** undoes it.
  If the coach later publishes a new day order, Darius's own order is reset and he sees a message.
- Warnings appear under the list when the order is risky: two pushing days in a row, the same skill twice in a row, or 4+ training days without rest.

## Logging (athlete)
- Type reps or seconds into each set box. A box fills with the skill colour once the goal is hit.
- The faded numbers in the boxes are last session's values.
- Tap the band chip under a set to cycle through: none → L → M → H.
- **Share session** sends a text summary (e.g. to WhatsApp).
- **Settings → Export log** sends the whole history as a file. The coach can then use **Import log** to see Darius's charts.

The log lives on the device, so clearing browser data deletes it. Export it now and then.

## Keyboard
`1–7` days · `←/→` previous/next day · `T` today · `W` week · `H` history · `S` settings · `L` EN/IT · `P` palette · `R` reorder · `E` editor · `Enter` next set · `Esc` back
