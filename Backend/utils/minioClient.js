import { Client } from 'minio';

// Abilita certificati auto-firmati globalmente
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export const minioClient = new Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: true,
    accessKey: 'minioadmin',
    secretKey: 'minioadmin',
    region: 'us-east-1',
    pathStyle: true
});