# Funny Movies - Remitano Assessment Test
This is the Front-end Repository for this assessment test UI, where user can:
- Sign Up / SignIn / Logout
- Share a Video (through valid Youtube Link)

## Packages:
| Framework | Description |
| --- | --- |
| antd | Ant Design Component|
| umi-request | AntD request fetcher and interceptor |
| redux-toolkit | Global state Management |
| redux-persist | Persist in local storage if needed |
| react-helmet | Help with SEO and head title |
| react-router-dom | Help with Navigation |
| classNames | className state management, compatible with tailwind |
| urlcat | conventional for API Path/URL replacement |
| tailwind & less | tailwind and less with preprocessor config |
| eslint | tracking code and convention |
| husky & commitlint | linting towards git commit messages |
| storybook | StorybookJS Components Testing |
| cypress | Cypress E2E Testing |


## How to run:
- Install Dependencies

```
cd <project-folder>
npm install
```

- Enable Husky for commitlint
```
npm run prepare
```

- Run the Project

```
npm run dev
```

- Navigate to `http://localhost:8000`

## Run tests:
### StorybookJS:
StorybookJS provides developers with an interacting UI to showcase the component / widgets.
This command will navigate to storybook local site when done, from which you can choose and test those components.
```
npm run storybook
```
You can run all tests with this commands (storybook needs to be running beforehand)
```
npm run storybook:test
```

### Cypress:
Cypress provides developers with an UI to run testcases, helps tracking running testcase and debugging.
This command will open Cypress UI, from which you can choose E2E testing to show all test, choose a test suite and run them.
```
npm run cypress:open
```
To run all test suites in headless mode, you can use the following command (no need cypress:open to be executed beforehand)
```
npm run cypress:run
```

## Environment:
Use the provided .env from this repo

## Folder Structure

```
├── src
│   ├── components (common components which can be shared and re-use in multiple place)
│   │   ├── **/*.less (Additional style in case tailwind can not support)
|   |   ├── hooks/use*.ts (Custom hook to handle logic for that component (may not can be reuse))
|   |   ├── index.tsx (Component only contain UI state)
│   ├── locales (i18n)
│   ├── layout
│   │   ├── components (common layout components which can be shared and re-use in multiple layout)
│   │   ├── LayoutName (folder: Define page container for specific page)
|   |   |   ├── components(components serves for specific Layout)
|   |   |   ├── hooks/use*.ts (Custom hook to handle logic for that Layout (may not can be reuse))
|   |   |   ├── index.tsx (Component only contain UI state)
│   ├── services (API calls)
│   │   ├── ServiceName (related to one model)
│   ├── hooks (custom hook handle common logic (not related to one component))
|   |   ├── use*.ts
│   ├── pages
|   |   |   ├── page-name (folder contain page source code)
|   |   |   |   ├── components (Container all components use in specific page)
|   |   |   |   |   ├── ComponentName
|   |   |   |   |   |   ├── hooks/useComponentName.ts (Custom hook to handle logic for component (may not can be reuse))
|   |   |   |   |   |   ├── ComponentName.tsx
|   |   |   |   |   |   ├── ComponentName.less
|   |   |   |   |   |   ├── index.ts
|   |   |   |   ├── hooks/*.ts (Define logics for specific page)
|   |   |   |   ├── index.tsx
|   |   |   |   ├── PageName.less (styles for page)
│   ├── styles
|   |   ├── globals.less (Declare global css here)
│   ├── utils (Define commonly used Logic here)
|   |   ├── *.ts
|   ├── wrappers (Define route protecting logics and storage)
|   |   ├── *.ts
├── public (image, logo, fav.ico)
├── package.json
├── package-lock.json
├── postcss.config.ts
└── tsconfig.json (Config path, import and export for TypeScript)
```
