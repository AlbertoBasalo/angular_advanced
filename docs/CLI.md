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

```bash
# Shared components for lists
ng g c shared/list --export

# configure Angular.json for using the type flag
```

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
