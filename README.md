# TODO LIST 기반 내 인생 RPG게임으로 만들기 프로젝트

## 제작일지
[블로그에 훈수두러 가기]()

## 프로젝트 소개
- 이 프로젝트는 TODO LIST를 기반으로 내 인생 RPG게임을 만들어보는 프로젝트입니다.
- 아직 한게 없어서 일단 여기까지만 적겠습니다. 아래는 기존 nestjs starter README.md 파일 내용입니다.
- [제작일지 구경하러 가기](https://velog.io/@dead_rice_cake/life-rpg-%EC%A0%9C%EC%9E%91%EC%9D%BC%EC%A7%801-%EC%8B%9C%EC%9E%91%EC%9D%B4-%EB%B0%98%EC%9D%B4%EB%8B%A4)

## NestJS Starter Kit [v2]

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![build](https://github.com/monstar-lab-oss/nestjs-starter-rest-api/actions/workflows/build-workflow.yml/badge.svg?branch=master&event=push)](https://github.com/monstar-lab-oss/nestjs-starter-rest-api/actions/workflows/build-workflow.yml)
[![tests](https://github.com/monstar-lab-oss/nestjs-starter-rest-api/actions/workflows/tests-workflow.yml/badge.svg?branch=master&event=push)](https://github.com/monstar-lab-oss/nestjs-starter-rest-api/actions/workflows/tests-workflow.yml)

This starter kit has the following outline:

- Monolithic Project
- REST API

This is a Github Template Repository, so it can be easily [used as a starter template](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template) for other repositories.

## Sample implementations

To view sample implementations based on this starter kit, please visit the [nestjs-sample-solutions](https://github.com/monstar-lab-oss/nestjs-sample-solutions) repository.

## Starter kit Features

One of our main principals has been to keep the starter kit as lightweight as possible. With that in mind, here are some of the features that we have added in this starter kit.

| Feature                  | Info               | Progress |
|--------------------------|--------------------|----------|
| Authentication           | JWT                | Done     |
| Authorization            | RBAC (Role based)  | Done     |
| ORM Integration          | TypeORM            | Done     |
| DB Migrations            | TypeORM            | Done     |
| Logging                  | winston            | Done     |
| Request Validation       | class-validator    | Done     |
| Pagination               | SQL offset & limit | Done     |
| Docker Ready             | Dockerfile         | Done     |
| Devcontainer             | -                  | Done     |
| Auto-generated OpenAPI   | -                  | Done     |
| Auto-generated ChangeLog | -                  | WIP      |

Apart from these features above, our start-kit comes loaded with a bunch of minor awesomeness like prettier integration, commit-linting husky hooks, package import sorting, SonarCloud github actions, docker-compose for database dependencies, etc. :D

## Consulting

Most of the features added to this starter kit have already been tried out in production applications by us here at MonstarLab. Our production applications are more feature rich, and we constantly strive to bring those features to this OSS starter kit.

If you would like to use a more feature rich starter kit, with more awesome features from Day 1, then please reach out to us and we can collaborate on it together as technology partners. :)

## Installation

Note: when using docker, all the `npm` commands can also be performed using `./scripts/npm` (for example `./scripts/npm install`).
This script allows you to run the same commands inside the same environment and versions than the service, without relying on what is installed on the host.

```bash
$ npm install
```

Create a `.env` file from the template `.env.template` file.

Generate public and private key pair for jwt authentication:

### With docker

Run this command:
```bash
./scripts/generate-jwt-keys
```

It will output something like this. You only need to add it to your `.env` file.
```
To setup the JWT keys, please add the following values to your .env file:
JWT_PUBLIC_KEY_BASE64="(long base64 content)"
JWT_PRIVATE_KEY_BASE64="(long base64 content)"
```

### Without docker

```bash
$ ssh-keygen -t rsa -b 2048 -m PEM -f jwtRS256.key
# Don't add passphrase
$ openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
```

You may save these key files in `./local` directory as it is ignored in git.

Encode keys to base64:

```bash
$ base64 -i local/jwtRS256.key

$ base64 -i local/jwtRS256.key.pub
```

Must enter the base64 of the key files in `.env`:

```bash
JWT_PUBLIC_KEY_BASE64=BASE64_OF_JWT_PUBLIC_KEY
JWT_PRIVATE_KEY_BASE64=BASE64_OF_JWT_PRIVATE_KEY
```

## Running the app

We can run the project with or without docker.

### Local

To run the server without Docker we need this pre-requisite:

- Postgres server running

Commands:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Docker

```bash
# build image
$ docker build -t my-app .

# run container from image
$ docker run -p 3000:3000 --volume 'pwd':/usr/src/app --network --env-file .env my-app

# run using docker compose
$ docker compose up
```

Learn more about Docker conventions [here](https://github.com/monstar-lab-group/nodejs-backend/blob/master/architecture/docker-ready.md). (WIP - Currently this is an internal org link.)

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Migrations

```bash
# using docker
$ docker compose exec app npm run migration:run

# generate migration (replace CreateUsers with name of the migration)
$ npm run migration:generate --name=CreateUsers

# run migration
$ npm run migration:run

# revert migration
$ npm run migration:revert
```

## Architecture

- [Project Structure](./docs/project-structure.md)

## Contributors

- [Yash Murty](https://github.com/yashmurty)
- [S M Asad Rahman](https://github.com/asad-mlbd)
- [Tanveer Hassan](https://github.com/war1oc)
- [Saad Bin Amjad](https://github.com/Saad-Amjad)
- [Sivan Payyadakath](https://github.com/sivanpayyadakath)
- [Sébastien Caparros](https://github.com/Seb-C)

## External Links

<a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo.svg" width="150" alt="Nest Logo" /></a>

[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-white.svg)](https://sonarcloud.io/dashboard?id=monstar-lab-oss_nestjs-starter-rest-api)
