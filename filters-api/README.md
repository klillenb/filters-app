# Filters API

## Technologies
- Java 25
- Spring Boot 3.5.8
- liquibase for DB migrations
- H2 as in-memory DB (handles schema migration and seeding)
- Logbook & Logstash for HTTP request/response logging

## Requirements
- Java 25 SDK
- Gradle 8+

## Setup
1. Clone the repo
```bash
git clone https://github.com/klillenb/filters-app.git
cd ./filters-app/filters-api
```
2. Build the project
```bash
./gradlew build
```
3. Run the application
```bash
./gradlew bootRun
```
Application will start on default port 8080.

## What could've been done better
- Not store H2 credentials (default values) in application.yaml
- Could've kept the schema more simple
- Enforce criteria conditions, right now it's basically free for all, so in case of any frontend changes (for example removing "Title"), then existing data would basically be unusable with transformation.
- Better validation on request body, instead of _hoping_ that incoming data binds to DTO and fails if it differs.
- Add authentication and authorization.
- Entity metadata (updated_at, created_at) is redundant right now, because no relevant action is taking place.