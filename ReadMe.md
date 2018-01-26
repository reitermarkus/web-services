# <img src="arriven-logo.svg" height="50" alt="arriven">

![Package Version](https://img.shields.io/github/package-json/v/reitermarkus/web-services.svg)
[![NPM Dependencies](https://david-dm.org/reitermarkus/web-services.svg)](https://david-dm.org/reitermarkus/web-services)
[![NPM Dev Dependencies](https://david-dm.org/reitermarkus/web-services/dev-status.svg)](https://david-dm.org/reitermarkus/web-services?type=dev)
[![Build Status](https://travis-ci.org/reitermarkus/web-services.svg)](https://travis-ci.org/reitermarkus/web-services)
[![Test Coverage](https://coveralls.io/repos/github/reitermarkus/web-services/badge.svg)](https://coveralls.io/github/reitermarkus/web-services)
[![Code Quality](https://api.codacy.com/project/badge/Grade/1e771028d09c4a159e804f265422a7b6)](https://www.codacy.com/app/reitermarkus/web-services)

<br/>

## Install Dependencies

First, install NodeJS (>= 9.3), MongoDB (>= 3.6) and Yarn (>= 1.3), then run

```shell
yarn install
```

## Run Development Server

To start the server and database, run

```shell
yarn start
```

## Import Demo Users and Locations

First, start the development server, then run

```shell
yarn user-import
yarn location-import
```

### Demo Users

| email               | username | password |
|---------------------|----------|----------|
| `admin@admin.com`   | `admin`  | `passwd` |
| `email@email.com`   | `user1`  | `passwd` |
| `email2@email2.com` | `user2`  | `passwd` |

**Admins** can access the backend by using the top-right menu, where you can
edit all stored locations.
