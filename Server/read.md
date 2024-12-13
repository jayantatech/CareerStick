service: career-stick-backend

provider:
name: aws
runtime: nodejs18.x
stage: ${opt:stage, 'dev'}
  region: us-east-1
  environment:
    NODE_ENV: ${self:provider.stage}
    # MONGODB_URI: ${ssm:/careerstick/${self:provider.stage}/MONGODB_URI}
MONGODB_URI: ${env:MONGODB_URI} # Use environment variable instead of SSM # PORT: ${file(.env):PORT}
PORT: ${env:PORT}
FRONTEND_URL: ${env:FRONTEND_URL}
CLIENT_URL: ${env:CLIENT_URL}
JWT_REFRESH_SECRET: ${env:JWT_REFRESH_SECRET}
JWT_ACCESS_SECRET: ${env:JWT_ACCESS_SECRET}
OPENAI_API_KEY: ${env:OPENAI_API_KEY}
SESSION_SECRET: ${env:SESSION_SECRET}
GOOGLE_CLIENT_ID: ${env:GOOGLE_CLIENT_ID}
GOOGLE_CLIENT_SECRET: ${env:GOOGLE_CLIENT_SECRET}

    SMTP_HOST: ${env:SMTP_HOST}
    SMTP_PORT: ${env:SMTP_PORT}
    SMTP_USER: ${env:SMTP_USER}
    SMTP_SECURE: ${env:SMTP_SECURE}
    SMTP_PASS: ${env:SMTP_PASS}
    EMAIL_FROM: ${env:EMAIL_FROM}
    AWS_ACCESS_KEY_ID: ${env:AWS_ACCESS_KEY_ID}
    AWS_SECRET_ACCESS_KEY: ${env:AWS_SECRET_ACCESS_KEY}
    ARCJET_ENV: ${env:ARCJET_ENV}
    ARCJET_KEY: ${env:ARCJET_KEY}
    RESEND_API_KEY: ${env:RESEND_API_KEY}
    # NODE_ENV: ${self:provider.stage}
    # MONGODB_URI: ${ssm:/careerstick/${self:provider.stage}/MONGODB_URI}
    # MONGODB_URI: ${env:MONGODB_URI} # Use environment variable instead of SSM
    # APP_NAME: ${ssm:/careerstick/${self:provider.stage}/APP_NAME, 'CareerStick'}
    # PORT: ${ssm:/careerstick/${self:provider.stage}/PORT, '4000'}
    # FRONTEND_URL: ${ssm:/careerstick/${self:provider.stage}/FRONTEND_URL}
    # CLIENT_URL: ${ssm:/careerstick/${self:provider.stage}/CLIENT_URL}
    # JWT_REFRESH_SECRET: ${ssm:/careerstick/${self:provider.stage}/JWT_REFRESH_SECRET}
    # JWT_ACCESS_SECRET: ${ssm:/careerstick/${self:provider.stage}/JWT_ACCESS_SECRET}
    # OPENAI_API_KEY: ${ssm:/careerstick/${self:provider.stage}/OPENAI_API_KEY}
    # SESSION_SECRET: ${ssm:/careerstick/${self:provider.stage}/SESSION_SECRET}
    # GOOGLE_CLIENT_ID: ${ssm:/careerstick/${self:provider.stage}/GOOGLE_CLIENT_ID}
    # GOOGLE_CLIENT_SECRET: ${ssm:/careerstick/${self:provider.stage}/GOOGLE_CLIENT_SECRET}
    # # SMTP_HOST: ${ssm:/careerstick/${self:provider.stage}/SMTP_HOST}
    # # SMTP_PORT: ${ssm:/careerstick/${self:provider.stage}/SMTP_PORT}
    # # SMTP_USER: ${ssm:/careerstick/${self:provider.stage}/SMTP_USER}
    # # SMTP_SECURE: ${ssm:/careerstick/${self:provider.stage}/SMTP_SECURE}
    # # SMTP_PASS: ${ssm:/careerstick/${self:provider.stage}/SMTP_PASS}
    # EMAIL_FROM: ${ssm:/careerstick/${self:provider.stage}/EMAIL_FROM}
    # # ARCJET_ENV: ${ssm:/careerstick/${self:provider.stage}/ARCJET_ENV}
    # # ARCJET_KEY: ${ssm:/careerstick/${self:provider.stage}/ARCJET_KEY}
    # RESEND_API_KEY: ${ssm:/careerstick/${self:provider.stage}/RESEND_API_KEY}

plugins:

- serverless-dotenv-plugin
- serverless-offline

functions:
app:
handler: dist/serverless.handler
events: - http:
path: /
method: ANY - http:
path: /{proxy+}
method: ANY

# "org" ensures this Service is used with the correct Serverless Framework Access Key.

# "app" enables Serverless Framework Dashboard features and sharing them with other Services.

app: career-stick-backend
service: career-stick-backend

provider:
name: digitalocean
runtime: nodejs20.x
stage: ${opt:stage, 'dev'}
region: blr1
environment:
NODE_ENV: ${do:stage, 'dev'}
MONGODB_URI: ${env:MONGODB_URI} # Use environment variable instead of SSM
PORT: ${env:PORT}
FRONTEND_URL: ${env:FRONTEND_URL}
CLIENT_URL: ${env:CLIENT_URL}
JWT_REFRESH_SECRET: ${env:JWT_REFRESH_SECRET}
JWT_ACCESS_SECRET: ${env:JWT_ACCESS_SECRET}
OPENAI_API_KEY: ${env:OPENAI_API_KEY}
SESSION_SECRET: ${env:SESSION_SECRET}
GOOGLE_CLIENT_ID: ${env:GOOGLE_CLIENT_ID}
GOOGLE_CLIENT_SECRET: ${env:GOOGLE_CLIENT_SECRET}

    SMTP_HOST: ${env:SMTP_HOST}
    SMTP_PORT: ${env:SMTP_PORT}
    SMTP_USER: ${env:SMTP_USER}
    SMTP_SECURE: ${env:SMTP_SECURE}
    SMTP_PASS: ${env:SMTP_PASS}
    EMAIL_FROM: ${env:EMAIL_FROM}
    AWS_ACCESS_KEY_ID: ${env:AWS_ACCESS_KEY_ID}
    AWS_SECRET_ACCESS_KEY: ${env:AWS_SECRET_ACCESS_KEY}
    ARCJET_ENV: ${env:ARCJET_ENV}
    ARCJET_KEY: ${env:ARCJET_KEY}
    RESEND_API_KEY: ${env:RESEND_API_KEY}

# plugins:

# - serverless-dotenv-plugin

# - serverless-offline

package:
patterns: - "!**" # Exclude everything by default - "dist/**" # Only include dist folder - "package.json" # Include package.json for dependencies - "package-lock.json" # Include package-lock for consistent installs

project:
namespace: fn-755783f2-a42b-4442-bbae-471b22ff33d1

functions:
main:
handler: dist/app.handler
runtime: nodejs20.x
routes: - path: /
method: ANY - path: /{proxy+}
method: ANY

service: careerstick-backend # Name of your service/project

provider:
name: aws
runtime: nodejs18.x
stage: ${opt:stage, 'dev'}
region: us-east-1
environment:
NODE_ENV: ${self:provider.stage}
MONGODB_URI: ${env:MONGODB_URI}
PORT: ${env:PORT}
FRONTEND_URL: ${env:FRONTEND_URL}
CLIENT_URL: ${env:CLIENT_URL}
JWT_REFRESH_SECRET: ${env:JWT_REFRESH_SECRET}
JWT_ACCESS_SECRET: ${env:JWT_ACCESS_SECRET}
OPENAI_API_KEY: ${env:OPENAI_API_KEY}
SESSION_SECRET: ${env:SESSION_SECRET}
GOOGLE_CLIENT_ID: ${env:GOOGLE_CLIENT_ID}
GOOGLE_CLIENT_SECRET: ${env:GOOGLE_CLIENT_SECRET}
SMTP_HOST: ${env:SMTP_HOST}
SMTP_PORT: ${env:SMTP_PORT}
SMTP_USER: ${env:SMTP_USER}
SMTP_SECURE: ${env:SMTP_SECURE}
SMTP_PASS: ${env:SMTP_PASS}
EMAIL_FROM: ${env:EMAIL_FROM}
ARCJET_ENV: ${env:ARCJET_ENV}
ARCJET_KEY: ${env:ARCJET_KEY}
RESEND_API_KEY: ${env:RESEND_API_KEY}

plugins:

- serverless-dotenv-plugin
- serverless-offline

functions:
app:
handler: dist/app.handler
events: - http:
path: /
method: ANY - http:
path: /{proxy+}
method: ANY
