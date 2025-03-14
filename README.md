# Mukuu (β)

<div align="center">
  <img src="media/home.png" alt="columns" width="880" height="auto">
  <p>Mukuu is the CUSTOM-ORDER-MAID-3D2(COM3D2) MOD Search Site.</p>
</div>

# Usage

Go to <a href="https://mukuu.herokuapp.com">https://mukuu.herokuapp.com</a>

# Status

<p align="left">
<a href="https://github.com/eiurur/Mukuu/actions?query=workflow%3Anodejs"><img src="https://github.com/eiurur/Mukuu/workflows/Node.js%20CI/badge.svg" alt="Node.js CI"></a>
</p>

# Requirement

- Node.js 18+
- MongoDB 3.4+

# Development

### First step

1. Clone project

```bash
git clone https://github.com/eiurur/Mukuu
cd Mukuu
```

2. Change enviroment variables.

```bash
cp packages/backend/.env.sample packages/backend/.env
vim packages/backend/.env
```

**.env**

```ini
PORT=9100
DB_URI=mongodb://127.0.0.1/Mukuu
APP_NAME=Mukuu
TWITTER_CONSUMER_KEY=<YOUR_KEY> <- change here
TWITTER_CONSUMER_SECRET=<YOUR_SECRET> <- change here
TWITTER_ACCESS_TOKEN=<YOUR_TOKEN> <- change here
TWITTER_ACCESS_TOKEN_SECRET=<YOUR_TOKEN_SCRENT> <- change here
TWITTER_CALLBACK_URL=<YOUR_CAKLLBACK> <- change here
```

3. install and setup

```bash
npm install
npm run bootstrap
```

4. launch

```
npm run dev
```

5. Go to `http://127.0.0.1:8100`

# Data Setup

### Overall

```
npm run crawl:search
```

### By User

```
npm run crawl:user
```

# Other commands

### Development Start

```
npm run dev
```

### Build

```bash
npm run build
```

### Production Start

```bash
npm run start
```
