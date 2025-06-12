module.exports = {
  apps: [
    {
      name: 'encuestas',
      script: 'dist/main.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        CORS_ORIGIN: 'localhost',
        DATABASE_HOST: 'db',
        DATABASE_PORT: 5432,
        DATABASE_USER: 'postgres',
        DATABASE_PASSWORD: 'postgres',
        DATABASE_NAME: 'encuestas_db',
        EMAIL_USER: 'brianretamar0101@gmail.com',
        EMAIL_PASS: 'yzibodrszgrzmxhy',
        DB_LOGGING: 'false',
      },
      time: true,
    },
  ],
};