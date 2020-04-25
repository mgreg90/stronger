# Workout App

## Resources:
* [kanban board](https://tree.taiga.io/project/mgreg90-workout-app/epics)
* [mockups](https://www.figma.com/file/woAnBZf3PtHUiJZZOLU8SD/Workout-App)
* [color palette](https://tree.taiga.io/project/mgreg90-workout-app/epics) - used [coolors.co](https://coolors.co/)

## Server

### API Errors
API Responses will have an error response with the following structure:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "messages": [
      "Email has already been taken",
      "Email is invalid"
    ]
  }
}
```

## Client

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```