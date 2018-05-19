# release-mgmt-api

## Requerimientos

nodejs 10.x
yarn

## Usage

### Install dependencies

`yarn`

### Build

```bash
yarn build
```

### Start

```bash
yarn start
```

### Unit Testing

```
yarn test
```

### Development

```bash
yarn build:watch
yarn start
yarn test:watch
```

### Production

```bash
yarn build:prod
```

## Cmd Options

| arg            | default | description               |
| -------------- | ------- | ------------------------- |
| --dotenvConfig | ./.env  | location of a `.env` file |

## Configuration

### Environment Variables

| key                          | values         |
| ---------------------------- | -------------- |
| RELEASE_MGMT_API_DB_HOST     | localhost      |
| RELEASE_MGMT_API_DB_PORT     | 27017          |
| RELEASE_MGMT_API_DB_DATABASE | ReleaseMgmtApi |
| RELEASE_MGMT_API_DB_USER     | ReleaseMgmtApi |
| RELEASE_MGMT_API_DB_PASSWORD | ReleaseMgmtApi |
