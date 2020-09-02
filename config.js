module.exports = {
    api: {
        port: process.env.API_PORT || 3000
    },
    jwt: {
        secret: process.env.JWT_SCRET || 'notasecret!'
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'remotemysql.com',
        user: process.env.MYSQL_USER || 's3ajphdLMx',
        password: process.env.MYSQL_PASSWORD || 'RuQYwAzUcg',
        database: process.env.MYSQL_DATABASE || 's3ajphdLMx',
    }
}
