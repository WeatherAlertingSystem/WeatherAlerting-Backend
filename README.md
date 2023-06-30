# Weather Alerting - Backend

## Project overview

This application lets users subscribe to **Weather Events** for a specific location and with a given time offset. The time offset may vary from 0 hours to 72 hours.
The app repeatedly requests weather forecast from _OpenWeather API_ and compares every trigger's condition with the forecasted value. In case the condition is fulfilled, all the alerts associated with the trigger are send over to recipients.

## Technologies

### The tech stack includes:

#### Backend (API)

- Typescript
- NestJS
- OpenWeather API

#### Frontend (UI) [See WeatherAlerting-Frontend repository](https://github.com/WeatherAlertingSystem/WeatherAlerting-Frontend)

- Typescript
- Angular

#### Database

- NoSQL
- Amazon AWS DocumentDB

#### Infrastructure [See WeatherAlerting-IaC repository](https://github.com/WeatherAlertingSystem/WeatherAlerting-IaC)

- Amazon AWS
- Pulumi (Infrastructure as Code)

## Scope of functionalities

- Creating user account
- Creating **Weather Triggers**
- Associating alert notifications with a Trigger
- Sending alerts via different channels (currently **email** only)

## Examples of use

1. I want to know if there will be freezing temperatures at my tomato farm, so I can react and turn or the heater by the greenhouse. I need some time to do that, so I better be notified a day before.
2. My capybara is allergic to high humidity, so I need a notifier if the humidity in my area is greater than, say 80%, so I can keep my capybara safe at home.

## Project status

MVP, production ready, infrastructure is up only when developing to cut costs
