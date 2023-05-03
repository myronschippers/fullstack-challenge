# Full Stack Engineer Challenge

## Description

Code challenge solution for hiring process.

**The Problem:**
A Company is in the process of onboarding a new warranty provider. They are looking to ingest their list of active purchases and make it available to the provider’s clients. With this access, the clients can manage their claims and monitor their claim status. Admins will have access to reports and the ability to monitor claim progress through the fulfillment pipeline. These purchases are sourced from the provider’s internal systems, which have few (if any) validation capabilities built in.

The data set consists of three tables - Purchases, Customers, and Claims.

**The Stack:**

- Docker
- Node.js
- Typescript
- Express
- PostgreSQL
- React
- Redux

## Table of Contents

- [Install](#Install)
- [Usage](#Usage)
- [License](#License)

## Install

The project is setup using Docker containers so that local dependencies are taken care of for the local development environment. The overall stack is as follows. You will need to [install Docker](https://docs.docker.com/get-docker/) if you don't have it locally already. Make sure to have node loaded on your machine as well. It shouldn't be needed but better to have it for debugging the build.

1. run `docker compose up`
1. validate the server is running
  - navigate to `http://localhost:8080/` in your web browser
  - should see the text "SUPER!!! Server is running." printed on the page
1. validate the front-end is running
  - navigate to `http://localhost:3000/` in your web browser
  - should see the application running with "Fullstack Challenge" displayed in the header

## Usage

Usage comes in 3 parts following the 3 parts of the Code Challenge; Data, API, and Front-end UI.

### Part 1, Data

For details on the **Data** portion of the Code Challenge please reference the [Data Documentation](./database/README_DATA.md).

### Part 2, API

For details on the **API** portion of the Code Challenge please reference the [API Documentation](./server/README_API.md).

### Part 3, Front-end UI

For details on the **Front-end UI** portion of the Code Challenge please reference the [UI Documentation](./client/README_CLIENT.md).

## License

[MIT Licensed](./LICENSE)
