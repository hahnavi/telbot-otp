# telbot-otp

OTP Server with Telegram Bot

## Setup

1.  Install all NPM package
    ```
    npm install
    ```
2.  Copy ```.env.example``` file to ```.env```
    ```
    cp .env.example .env
    ```
3.  Configure your ```.env``` file
4.  Run database migration
    ```
    npx sequelize db:migrate
    ```
5.  Run service
    ```
    npm run start
    ```
