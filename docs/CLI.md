# Angular advanced

> Command Line Interface

## 0-root

```bash
# Install Angular CLI globally
npm i @angular/cli
# Generate a new minimal application
ng new angular_advanced --minimal=true --routing=true --style=css
# 🧙🏼‍♂️ Alternatively, you can skip global installation by running
npx @angular/cli new angular-intro --minimal=true --routing=true --style=css

# Add a bit of style
npm install @picocss/pico
# angular.json : "./node_modules/@picocss/pico/css/pico.fluid.classless.min.css",

npm run start

# install a development server with a fake api
npm i -D json-server json-server-auth
npm run api

```

## 1-Components

- follow the container(parent, smart) / presenter(child, dumb) pattern
- use template elements for dynamic views with context

```bash
# Shared components for lists of dynamic item content
ng g c shared/list --export

```

- configure Angular.json for using the type flag

```json
"@schematics/angular:component": {
  "inlineTemplate": true,
  "inlineStyle": true,
  "flat": true,
  "skipTests": true,
  "skipSelector": false,
  "type": "Component"
},
```

## 2-Speed

- do not abuse of function calls (use custom pipes instead)

- divide big components into several small ones
- use | pipe async for http and observable data
- use onPush when possible

```bash
# use onPush at angular.json or per component
ng g c your-component -c=onPush
# use pipes
ng g pipe home/agency-status
ng g pipe home/agencies-header
```

## 3-router

- Can Load guard to prevent loading data before page load
- Protect against unauthorized access, prevent downloading the lazy module

```bash
# Register the guard on the router with the loadChildren function
# Redirect user to login, but with returnUrl as a parameter
ng g g auth/authenticated --implements CanLoad

# A service to store authentication status
ng g s auth/authentication

# A guard that checks if a component is dirty or can leave anyway
ng g g shared/not-dirty --implements CanDeactivate

# An interface to facilitate access to component status
ng g interface models/component-status --type=interface

# a component to be used as a nested route
ng g c agencies/agency-trips

# resolver dedicated to fetch data for a page
ng g r agencies/agencies-view/agencies-view


# ASYNC PARAMETERS (AGENCIES -> ?/SELECTED=AGENCY_ID )
ng g c agencies/agency-trips

# ROUTER EVENTS (LOGS, META, ... TITLE! on app.component)

# NESTED ROUTES (ABOUT US -> HISTORY, MISSION...)
ng g c about/history
ng g c about/mission
# AUXILIARY ROUTES (footer)
ng g c info


```

## 4-Forms

```bash
ng g c auth/login/login --type=form
ng g i models/credentials --type=interface
ng g s services/validation

ng g c shared/email --type=control --export
ng g c shared/input --type=control --export

ng g class shared/control --type=base
ng g class shared/form --type=base
```

## 5-Injection

```bash
ng g s services/logger-base
ng g s services/logger-console
ng g s services/logger-http
# services/logger.tokens.ts
ng g interceptor services/error
```

## 6-RxJs

```bash
# with changes on Angular json
ng g m trips --route=trips --module=app
ng g c shared/search --type=control
```

## 7-Redux

```
ng g s services/error-mediator
ng g class services/global-error --type=handler
ng g c notifications --type=control
ng g class auth/authentication --type=store
```

## 8-NgRx

```bash
ng add @ngrx/store@latest
ng add @ngrx/schematics@latest --defaultCollection
ng add @ngrx/store-devtools@latest
ng add @ngrx/effects@latest
ng g m future --route=future -m=app
ng g store Future --module future/future.module.ts --state-path=future/state  --state-interface=FutureState
ng g action future/state/Trips --prefix=load --api=true
# createReducer(initialState, on(action, reducerFunction))
# ng g reducer future/state/Trips --prefix=load --api=true
# reducer functions on reducers file
ng g selector future/state/Trips  --skip-tests
ng g effect future/state/Trips --skip-tests --api=true -m future/future.module.ts --prefix=load
ng add @ngrx/router-store@latest
```

## 9-PWA

```bash
npm i
# commit after each command
ng update
ng update @angular/cli
ng update @angular/core
ng add @angular/pwa@latest
npm install pwa-asset-generator -D
# remove fav.ico and icons from assets folder
# "icon": "pwa-asset-generator logo.png ./src/assets/icons -c -f -w -m ./src/manifest.webmanifest -i ./src/index.html"
npm run icon
```
