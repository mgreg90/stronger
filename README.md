# Workout App

## Resources:
* [kanban board](https://tree.taiga.io/project/mgreg90-workout-app/epics)
* [mockups](https://www.figma.com/file/woAnBZf3PtHUiJZZOLU8SD/Workout-App)
* [color palette](https://tree.taiga.io/project/mgreg90-workout-app/epics) - used [coolors.co](https://coolors.co/)
* [icons](https://material.io/resources/icons/)

## Server

## Start Dev Server
```
rails s
```

### API Errors
NOTE: TODO Update this!
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

### Compiles and hot-reloads for local development
```
npm run local
```

### Compiles and hot-reloads for use with ngrok
```
npm run dev
```

## Production Deployment

### Run Dockerfile

```
docker build -t workout-app
docker run -p 3000:80 workout-app
```

### Single line deploy
```
  bin/prod-deploy
```

