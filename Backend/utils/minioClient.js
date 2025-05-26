import { Client } from 'minio';

export const minioClient = new Client({
    endPoint: process.env.MINIO_IP || 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: 'minioadmin',
    secretKey: 'minioadmin',
    region: 'us-east-1',
    pathStyle: true
});