# 1. Open and edit files with VS Code

[Tutorial index](README.md) · Next: [The terminal and paths](cli.md)

## Cheatsheet

| Action | How |
| --- | --- |
| Open the course | **File > Open Folder**, select `Graz_402.407` |
| Save a file | **Cmd+S** on macOS; **Ctrl+S** on Windows/Linux |
| Find an action | **Cmd+Shift+P** on macOS; **Ctrl+Shift+P** on Windows/Linux |
| Preview Markdown | Command Palette > **Markdown: Open Preview to the Side** |
| Preview a website | Right-click `index.html` > **Open with Live Server** |
| Inspect a website | Browser menu > Developer tools > Console |

Allow about 20 to 30 minutes. Start with the repository you cloned using the [course README](../README.md#clone-the-course-repository).

By the end, you should be able to open the course root, create and save a text file, and preview Markdown.

## 1. Install the editor

Download [Visual Studio Code](https://code.visualstudio.com/download) for your operating system and follow the installer. On macOS, move the application to Applications if prompted. On Windows, use the user installer unless your institution provides another installation method. On Linux, choose the package for your distribution.

Open VS Code from your application menu. You may skip account sign-in, themes, and AI setup. They are not needed for these exercises.

> [!NOTE]
> VS Code edits files. Your browser runs HTML, CSS, and JavaScript. Live Server serves the files over a local HTTP connection.

## 2. Open the course folder

1. Choose **File > Open Folder**.
2. Select the cloned `Graz_402.407` folder containing `README.md`.
3. In the Explorer on the left, check that you can see `README.md`, `tutorials`, and `code_snippets`.
4. Click `README.md` to open it.

If a Workspace Trust dialog appears, trust the folder only if it is the course copy you intended to open. Trust allows VS Code to run tools supplied by that folder. See [Workspace Trust](https://code.visualstudio.com/docs/editing/workspaces/workspace-trust) for details.

The Explorer is a view of real files on your computer. Renaming or deleting a file there also changes it on disk.

## 3. Find the parts you will use

| Part | How to open it | What you do there |
| --- | --- | --- |
| Explorer | **View > Explorer** | Browse files and folders |
| Editor | Click a file in Explorer | Read and change the file's contents |
| Command Palette | **View > Command Palette** | Search for editor actions by name |
| Extensions | **View > Extensions** | Add language support when needed |

The [interface guide](https://code.visualstudio.com/docs/editing/getting-started/userinterface) explains the other panels. You do not need to learn them all now.

> [!TIP]
> Use the Command Palette when you cannot remember a shortcut. Type a few words from the action, such as `Markdown: Open Preview to the Side`.

## 4. Create a file and preview it

1. Right-click an empty area in Explorer and choose **New Folder**. Name it `practice`.
2. Right-click `practice` and choose **New File**. Name it `learning_log.md`.
3. Paste the following into the editor, then use **File > Save**.

```markdown
# My 402.407 learning log

I opened the course folder in VS Code.

## A question to revisit

How does a browser find the CSS file for a page?
```

The `.md` ending means Markdown, a plain-text format for headings, links, and lists. `#` creates a heading; `##` creates a smaller heading. Blank lines separate paragraphs.

With this file active, open the Command Palette and choose **Markdown: Open Preview to the Side**. You should see a large title and a smaller heading in the preview. Change the question, save, and watch the preview update. The [Markdown documentation](https://code.visualstudio.com/docs/languages/markdown) covers links and other formatting.

> [!IMPORTANT]
> Save with **Ctrl+S** on Windows/Linux or **Cmd+S** on macOS before running a file. A dot on the editor tab usually means the file contains unsaved changes.

### Markdown notation to keep handy

| Write this in a `.md` file | Meaning |
| --- | --- |
| `# Title` | Main heading |
| `## Section` | Section heading |
| `**important**` | Bold text |
| `*term*` | Italic text |
| `` `area_ha` `` | Inline code |
| `- A point` | Bullet list item |
| `1. A step` | Numbered list item |
| `[Course](../README.md)` | Link with a relative path |
| `> A quotation` | Blockquote |
| `- [ ] Try the exercise` | Unchecked task box |

Put blank lines around paragraphs, lists, and code blocks. To display several lines of code, put three backticks \`\`\` on a line before and after them. Add the language after the opening backticks, such as `html`.


## 5. Install Live Server

In **View > Extensions**, search for **Live Server** by **Ritwick Dey**. Check the [extension page](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) and ID `ritwickdey.LiveServer`, then install it. HTML, CSS, and JavaScript support already comes with VS Code. No other extension is required.

## 6. Edit a page and see the result

1. Copy the whole `code_snippets/01_web_page` folder into `practice` and rename the copy `first_page`.
2. Open `practice/first_page/index.html`, right-click, and choose **Open with Live Server**.
3. Check the browser address starts with `http://localhost` or `http://127.0.0.1`, not `file://`.
4. Change the heading in `index.html`, save, and watch the browser reload.
5. Open `style.css`, change the background colour, and save again.
6. Open your browser's developer tools from its menu. Choose **Console**, click the page's button, and look for the message.

Keep the editor and browser side by side. HTML describes the content, CSS styles it, and JavaScript changes it in response to actions. Live Server serves files and refreshes the page after a save. It is not a database and does not make your page public.

Stop the server by clicking its port number in VS Code's bottom status bar. Restart it using **Open with Live Server**. Refreshing resets this example's click count because it only lives in memory.

## If something looks wrong

| Symptom | Try this |
| --- | --- |
| Explorer shows only one file | Use **File > Open Folder** and select the course root |
| You see another `Graz_402.407` folder inside Explorer | Open that inner folder containing `README.md` |
| The file is named `learning_log.md.txt` | Rename it to `learning_log.md` in Explorer |
| The preview shows old text | Save and check that the preview belongs to the file you edited |
| Open with Live Server is missing | Check the extension is enabled, open a folder, then right-click an HTML file |
| The page shows old content | Save, check the browser URL points to your copy, then reload |
| Styles or scripts do not load | Check filenames, letter case, and browser Console/Network for 404 errors |
| The map is blank | Check internet access, Leaflet script loading, and the map element's CSS height |

## Documentation and a video

- [VS Code interface documentation](https://code.visualstudio.com/docs/editing/getting-started/userinterface): look up the Explorer, editor, and Command Palette.
- [Microsoft's getting started video](https://code.visualstudio.com/docs/introvideos/basics): follow the folder-opening and file-editing demonstration. Skip the AI features for this course.

## Exercise: change a page and leave yourself a note

1. Change the heading and button text in your copied page. Save and test the button. Add a `## What I can do now` heading to `practice/learning_log.md`.
2. Under it, write two bullet points describing actions you actually performed.
3. Add a Markdown link to the [course README](../README.md). Work out the relative path from your file in `practice`.
4. Save, preview, close the file tab, and reopen it from Explorer.
5. Reflect in one sentence: what is the difference between closing a tab and deleting a file?

You are done when the reopened file contains your changes and the preview displays a working link.

<details>
<summary>Check your work</summary>

Use `- ` before each bullet. The link from `practice/learning_log.md` is `[Course README](../README.md)`. The two dots mean the parent folder. Closing a tab leaves the file on disk; deleting removes it.

</details>
