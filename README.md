# Project 3 · To-Do List Application

**Sangam B R** · **PES1PG25CA426**  
PES University · MCA · Web Application Frameworks-II  
Unit 4 · Experiential Learning

My Tasks is a browser-based to-do list. Add tasks, check them off, or delete them. The list and completion status survive a refresh in the same browser profile and site origin.

## Installation and execution

Install Node.js 20.9 or later and npm. Open a terminal in the project folder and run the commands below. [Next.js installation requirements](https://nextjs.org/docs/app/getting-started/installation)

```sh
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser. The root page redirects to `/todos`. If the terminal reports a different port, open the address it prints.

Run the following commands to check TypeScript and create a production build.

```sh
npm run typecheck
npm run build
```

Stop the development server with **Ctrl+C**, then run `npm start` from the project folder to try the production build.

If a Windows rebuild stalls while cleaning the previous build, stop the preview and remove the generated `.next` folder in this project before running `npm run build` again.

## Project files

| Path | Purpose |
| --- | --- |
| `app/page.tsx` | Redirects visits from `/` to `/todos`. |
| `app/todos/page.tsx` | Defines the `/todos` route and displays the task component. |
| `app/todos/TodoApp.tsx` | Holds the task state, event handlers, localStorage effects, and interface. |
| `app/todos/todo.module.css` | Styles the task interface, completed rows, and mobile layout. |

## Viva preparation

### 1. React Hooks

`useState` gives the component a value and a setter. The component uses it for the input text, validation feedback, and the task list. `useEffect` runs code after React renders. One effect loads the saved list when the component mounts. Another saves changes after the initial load finishes.

### 2. State management

Each task stores a unique ID, its text, and a Boolean completion status. Adding a task trims the input and appends a new object if that text has content. Toggling a checkbox updates the matching task by ID. Deleting a task filters it out by ID. These updates create new arrays, which React uses to render the latest list. The checkbox and strikethrough both read the same completion value.

### 3. Client-side rendering

`'use client'` marks `TodoApp.tsx` as a Client Component, so its event handlers, hooks, and storage access can run in the browser. Next.js can prerender the initial HTML. After hydration, React handles edits and updates the displayed list without a page reload. The effect reads browser storage after mounting, when `localStorage` is available. [Next.js Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)

### How does the app preserve tasks on the first render?

React begins with an empty task array while the component mounts. A readiness flag keeps the save effect from writing that array over existing data. The load effect reads and parses the saved JSON, then marks the list ready. After that, changes to the list are serialized and written under the `pes-todo-list` key. Reloading the same origin in the same browser profile restores those values.

## Verification checklist

| Check | Expected result |
| --- | --- |
| Open `/` in a fresh browser profile or private window. | The address changes to `/todos` and the empty-state message appears. |
| Submit a blank input and then one containing only spaces. | Validation feedback appears and the list stays empty. |
| Add two or more tasks. Try the **Add** button and the Enter key. | Each submission creates its own row. |
| Check a task, then uncheck it. | The task gains a strikethrough when checked and loses it when unchecked. |
| Check a task and refresh. | All tasks return with the correct completion status. |
| Delete one task and refresh again. | The deleted task stays gone and the other task retains its status. |
| Delete the remaining tasks. | The empty-state message returns. |
| Open responsive mode in browser developer tools and select a phone-width viewport. | The card fits the screen with no horizontal scrolling, and the form and task actions remain usable. |
| Run `npm run typecheck` and `npm run build`. | Both commands exit successfully. |

Local verification passed with `npm run typecheck`, `npm run build`, and Chrome. The interface was tested at a desktop width and at 320 px and 390 px in mobile emulation. In a malformed-storage test, the app showed feedback, preserved the original storage entry, and allowed tasks to be managed for that visit.

## Upload to GitHub

Install Git if it is missing from your computer.

1. Sign in to GitHub and create a repository named **`PES1PG25CA426-Sangam`**.
2. Leave the repository empty during creation. The project already contains its README and Git ignore rules.
3. Copy the repository's HTTPS URL from GitHub's **Quick setup** page.
4. Run the following commands from the project folder. Replace `YOUR_REPOSITORY_URL` with the actual URL you copied.

   ```sh
   git init -b main
   git add app .gitignore README.md package.json package-lock.json next.config.ts tsconfig.json
   git commit -m "Build to-do list application"
   git remote add origin YOUR_REPOSITORY_URL
   git push -u origin main
   ```

5. Refresh your GitHub repository and check that the source files and README are visible. Copy the repository URL for your submission. [GitHub source upload guide](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github)

## Deploy to Vercel

1. Sign in to Vercel and connect your GitHub account.
2. In the Vercel dashboard, choose **Add New…** → **Project** and import **`PES1PG25CA426-Sangam`**.
3. Use the repository root and the **Next.js** framework preset. Accept the default build settings. The app requires no environment variables.
4. Select **Deploy** and wait until the deployment is ready.
5. Open the URL generated by Vercel. Confirm that the root redirects to `/todos` and try adding a task and refreshing. Copy the actual deployment URL for your submission. [Vercel Git deployment guide](https://vercel.com/docs/git)

## PESU Academy submission

Compile the submission PDF with the GitHub source link, screenshots of the app, evidence of successful and unsuccessful test cases, the Vercel production URL after testing it, and a short explanation of the three core concepts. The supplied `WAF-II-EL-4.pdf` provides the assignment instructions.

## Screenshot checklist

Capture the following screens while running the app or after deploying it.

- [ ] Empty list with the **My Tasks** heading, input, and **Add** button visible.
- [ ] Validation message after submitting an empty or whitespace-only task.
- [ ] Multiple tasks with one completed row visibly checked and struck through.
- [ ] The same list after refreshing, with the completed row still checked.
- [ ] The list after deleting one task and refreshing again.
- [ ] Mobile layout at a phone-width viewport with at least one task visible.
- [ ] Successful `npm run typecheck` and `npm run build` terminal output.
- [ ] GitHub repository and Vercel deployment once both are available.
