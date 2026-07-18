import { env } from '$env/dynamic/private';
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Env dinámicas (runtime) para no hornear credenciales en el build
const BUCKET = env.R2_BUCKET_NAME ?? '';

export const r2 = new S3Client({
    region: 'auto',
    endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: env.R2_ACCESS_KEY_ID ?? '',
        secretAccessKey: env.R2_SECRET_ACCESS_KEY ?? ''
    }
});

export async function uploadFile(key: string, body: Buffer | Uint8Array, contentType: string) {
  return r2.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType
    })
  );
}

export async function getDownloadUrl(key: string, expiresIn = 3600) {
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: key
  });
  return getSignedUrl(r2, command, { expiresIn }); // en segundos
}

export async function deleteFile(key: string) {
  return r2.send(
    new DeleteObjectCommand({
      Bucket: BUCKET,
      Key: key
    })
  );
}
