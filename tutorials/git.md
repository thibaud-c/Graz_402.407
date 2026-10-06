# 3. Receive class updates and save your work with Git

[Tutorial index](README.md) · Previous: [Terminal and paths](cli.md) · Next: [Coding concepts](coding_concepts.md)

## Cheatsheet

Run commands in your class directory clone, using a separate PowerShell or Terminal window.

| Command | Use |
| --- | --- |
| `git status` | See changed files and any unfinished merge |
| `git diff` | Read unstaged changes to tracked files |
| `git add practice/learning_log.md` | Select a file's current changes for the next commit |
| `git diff --staged` | Check that selection |
| `git commit -m "Complete the area calculation"` | Record the selected changes locally |
| `git pull` | Fetch and merge the instructor's updates |
| `git log --oneline -5` | View the five most recent commits |
| `git merge --abort` | Cancel an unfinished merge and return to the pre-merge state |

Replace the lab filename with the file you actually edited. Save and commit your work before pulling. This makes it easier to resolve or abort a merge without losing edits.

Allow about 40 to 60 minutes. GitHub is required for the course. You will use your course clone, then deliberately create a conflict in a separate practice repository.

## 1. Install Git and sign in to GitHub

Create an account at [GitHub](https://github.com/signup) and sign in through your browser. You will use it to access course materials and raise issues.

Install [Git](https://git-scm.com/downloads) for your operating system. On Windows, allow the installer to make Git available from the command line. On macOS, running `git --version` may offer to install Apple's command-line tools. On Linux, follow the instructions for your distribution.

Close and reopen your separate terminal, then run:

```sh
git --version
```

You should see a version number. Git is the program on your computer; GitHub is the website hosting the repository. A public repository can be cloned without signing in, but you still need your account to participate in the class.

## 2. Clone once and configure your copy

Follow [the course cloning steps](../README.md#clone-the-course-repository) if you have not cloned it yet. Otherwise, enter your existing clone:

```sh
cd ~/university/Graz_402.407
git remote -v
git status
```

`origin` is Git's short name for the source repository. It should point to `https://github.com/thibaud-c/Graz_402.407.git`. Do not run `git init` inside this clone. It already has history.

Set your identity for local commits. Replace both example values:

```sh
git config user.name "Your Name"
git config user.email "your-address@example.com"
git config pull.rebase false
```

The first two commands record the author of your commits. They do not sign you in. The third tells this repository to merge incoming updates into your local history when you use `git pull`.

These settings apply only to this clone. For email privacy, copy the exact no-reply address shown in your [GitHub email settings](https://github.com/settings/emails). See [GitHub's commit-email guide](https://docs.github.com/en/account-and-profile/how-tos/email-preferences/setting-your-commit-email-address).

## 3. Save your work before pulling

There are three different actions:

| Action | Result |
| --- | --- |
| Save in VS Code | Writes your file to disk |
| Commit in Git | Records selected file changes in local history |
| Push | Uploads commits to a repository where you have write permission |

You can make local commits in your course clone without permission to push to the instructor's repository. Receiving materials uses `git pull`; follow the lab's instructions for submitting your work.

Suppose you edited `practice/learning_log.md`. Save it in VS Code before updating files. In the terminal:

```sh
git status
git diff
git add practice/learning_log.md
git diff --staged
git commit -m "Save my learning notes"
```

`git add` stages the named file, meaning it selects that file's current contents for the next commit. `git diff --staged` lets you review the selection. The commit records it locally, even if the exercise is unfinished.

> [!TIP]
> Stage named files. Avoid `git add .` while learning, because it can include downloads, participant responses, or unrelated changes. `git diff` does not display the contents of new, untracked files; inspect them in VS Code.

If `git status` lists other edits you want to preserve, save and commit those named files too. The course's `.gitignore` hides common system files and response filenames; it is not a privacy guarantee. Do not commit credentials or large downloaded datasets. A clean working tree is the simplest starting point for a pull.

## 4. Pull at the beginning of class

After saving your work:

```sh
git status
git pull
```

`git pull` fetches new commits from GitHub and merges them into your current branch. It can add new lab files, update instructions, and bring in solutions without replacing your entire folder.

| Git reports | Meaning |
| --- | --- |
| `Already up to date` | Your copy already has the available updates |
| `Fast-forward` | Git advanced to newer commits without combining separate edits |
| A successful merge | Git combined local and incoming history |
| `CONFLICT` | Some changes need your decision; follow the next section |
| Local changes would be overwritten | Git stopped before merging; save and commit those files, then pull again |

A successful merge may open an editor for a commit message. Keep the proposed message, save, and close the editor. If the terminal opens Vim, press Escape, type `:wq`, then Enter. In Nano, press Ctrl+O, Enter, then Ctrl+X. To accept the proposed message without opening an editor on a future pull, use `git pull --no-edit`.

Once the pull finishes successfully, reload your page in the browser. If an untracked file blocks an incoming file with the same name, move your local file to a clearly named backup using VS Code, then retry. Do not delete it to get past the message.

## 5. Resolve a merge conflict

A conflict can happen when you and the instructor edit the same part of an exercise. Git keeps both versions and asks you to decide what the combined file should contain.

1. Run `git status`. It lists the files that need attention.
2. In VS Code, open the conflicted file as text.
3. Find the conflict markers. A simplified example looks like this:

   ```text
   <<<<<<< HEAD
   Minimum area: 0.5 hectares
   =======
   Minimum area: 1 hectare
   >>>>>>> incoming-commit
   ```

   The part above `=======` is your current version. The part below is the incoming version. The labels after `>>>>>>>` vary.

4. Read the updated instructions and decide what to keep. For example, if the instructor corrected the required threshold, the result might be:

   ```text
   Minimum area: 1 hectare
   My earlier experiment used 0.5 hectares.
   ```

5. Remove all three marker lines and any content you do not want. Resolve every conflict in the file, then save.
6. Repeat for each conflicted file. Check the result:

   ```sh
   git diff --check
   git status
   ```

7. Stage each resolved file and finish the merge:

   ```sh
   git add practice/learning_log.md
   git diff --staged
   git commit -m "Merge class updates and keep my lab work"
   git status
   ```

8. Preview the resolved Markdown or reload the edited website to check the result.

> [!IMPORTANT]
> VS Code's **Accept Current**, **Accept Incoming**, and **Accept Both** buttons are shortcuts, not decisions about correctness. Accepting both versions can duplicate content or break HTML or JavaScript. Read the resulting file and test it.

If you need to stop an unresolved merge, use `git merge --abort`. Because you committed your work first, Git can return to that pre-merge state. Do not use `git reset --hard` or a force-push to make a conflict disappear. The [Git merge guide](https://git-scm.com/docs/git-merge) explains resolution and aborting.

## 6. Use discussions/issues to improve the course

Use [the course Discussions page](https://github.com/thibaud-c/Graz_402.407/discussions) (or [Issues page](https://github.com/thibaud-c/Graz_402.407/issues)) for errors, ideas, or useful resources. Search existing issues first, then open **New discussion/issue** with a specific title and enough information to act on. A reproducible error report should include the file, command or browser action, expected result, actual message, and operating system.

Follow [the issue-writing steps in the course README](../README.md#help-improve-the-class). Do not create an issue just to report that a tutorial worked.

## 7. Work in a group repository

Keep your course clone for receiving materials. For each project, one member creates a separate repository on GitHub and invites the others through **Settings > Collaborators**. Choose visibility with the instructor. Never put participant responses in it.

1. The owner creates the repository with a README. Each member clones that repository into a sibling folder, outside the course clone.
2. Copy one complete starter folder's contents into the group repository. Its `index.html`, `style.css`, and `app.js` should be together at the root. Copy the group contract too.
3. Configure your commit name and email there, as in section 2. Run `git config pull.rebase false` in this clone as well.
4. Before editing, run `git pull`. Agree who edits which file. Save, stage named files, review, and commit as above.
5. Run `git push` to share committed work. Use Git's browser sign-in flow when prompted. A normal GitHub password is not used as an HTTPS Git password. Never paste tokens into project files or shared messages.
6. Other members run `git pull` to receive the changes. If a push is rejected because the remote has newer commits, pull, resolve any conflict, test, then push again.

`git remote -v` tells you where a push will go. A permission error in the instructor's repository usually means you are in the course clone instead of the group repository. Each member keeps their own local clone; avoid editing one shared cloud-synced folder simultaneously.

## Documentation and a blog walkthrough

- [Git pull](https://git-scm.com/docs/git-pull) and [Git merge](https://git-scm.com/docs/git-merge): receiving updates and completing merges.
- [GitHub: resolving a merge conflict from the command line](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line): illustrated conflict-resolution steps.
- [GitHub's beginner guide to essential Git commands](https://github.blog/developer-skills/github/top-12-git-commands-every-developer-must-know/): revisit `status`, `diff`, `add`, and `commit`.

## Exercise: resolve a conflict on purpose

Use a separate folder for this controlled exercise, so the course history stays usable. A **branch** is a named line of development. Here two branches stand in for your work and an instructor update.

1. In your terminal, run:

   ```sh
   cd ~/university
   mkdir webgis-merge-practice
   cd webgis-merge-practice
   git init -b main
   git config user.name "Your Name"
   git config user.email "your-address@example.com"
   ```

   Replace the name and email. If that practice folder already contains work, choose a new name.

2. Open this folder in a new VS Code window. Create `notes.md` containing `Minimum area: 1 hectare`. Save, then run:

   ```sh
   git add notes.md
   git commit -m "Record the initial area threshold"
   git switch -c instructor-update
   ```

3. Change the line to `Minimum area: 2 hectares`, save, then run:

   ```sh
   git add notes.md
   git commit -m "Update the required threshold"
   git switch main
   ```

4. The file returns to the original version. Change its line to `Minimum area: 0.5 hectares`, save, then run:

   ```sh
   git add notes.md
   git commit -m "Try a smaller threshold"
   git merge instructor-update
   ```

5. Expect a conflict in `notes.md`. Resolve it by keeping the required threshold of 2 hectares and adding a separate sentence recording your 0.5-hectare experiment.
6. Save, run `git diff --check`, stage `notes.md`, and commit the resolution. Check `git status`.
7. Explain why Git could not choose the threshold for you, and why committing before a class update helps you recover your work.

You are done when there are no conflict markers, Git reports a clean working tree, and both pieces of information are in the file. Return to your course folder afterward.

<details>
<summary>Check your work</summary>

One possible result is:

```text
Minimum area: 2 hectares
My earlier experiment used 0.5 hectares.
```

Finish with:

```sh
git add notes.md
git commit -m "Resolve the threshold conflict"
git status
```

The exercise uses `git merge` directly. A class `git pull` performs a fetch followed by a merge under our configuration, so the conflict-resolution steps are the same.

</details>
