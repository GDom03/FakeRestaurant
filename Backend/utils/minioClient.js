import { Client } from 'minio';

export const minioClient = new Client({
    endPoint: '172.28.0.4',
    port: 9000,
    useSSL: false,
    accessKey: 'minioadmin',
    secretKey: 'minioadmin',
    region: 'us-east-1',
    pathStyle: true
});