# FiltersAppUi

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.3.

## Development server

### Prerequisites
- Node.js >= 20.19.0
- npm >= 9
- Angular CLI 21: `npm install -g @angular/cli`

## Setup
```bash
git clone https://github.com/klillenb/filters-app.git
cd ./filters-app/filters-ui
npm install

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```
No data will be visible nor saved when running UI separately without API application.

## What could've been done better
- The table showing saved filters could definitely be more user friendly in terms of UI and UX, for example having collapsable accordions when there is more than 1 criteria present.
- Better use of tailwind - first time playing with it, I'm sure it's not following the best practices and is way too verbose in terms of what it actually could be like.
- Following the "design idea" more precisely.
- Better validation, for example using FormBuilder, instead of using conditional statements.
- Better alerting in case of validation error, backend error. Currently just using alert() and that's no bueno, some kind of snackback would look better.