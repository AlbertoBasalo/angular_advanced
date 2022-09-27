# Angular advanced

## 1-Components

```bash
npm i
npm start
npm run api
# Shared components for lists
ng g c shared/list --export
```

## 2-Speed

```bash
# use onPush at angular.json or per component
ng g c your-component -c=onPush
# use pipes
ng g pipe home/agency-status
ng g pipe home/agencies-header
# do not abuse of function calls
# divide big components into several small ones
```
