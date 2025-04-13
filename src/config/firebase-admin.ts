import admin from 'firebase-admin';

const firebaseAdminConfig = {
  type: 'service_account',
  project_id: process.env.FIREBASE_ADMIN_PROJECT_ID,
  private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_ADMIN_CLIENT_ID,
  auth_uri: process.env.FIREBASE_ADMIN_AUTH_URI,
  token_uri: process.env.FIREBASE_ADMIN_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
};

// Validate environment variables
function validateFirebaseConfig(config: Record<string, string | undefined>) {
  for (const [key, value] of Object.entries(config)) {
    if (!value) {
      throw new Error(`Missing Firebase Admin configuration for: ${key}`);
    }
  }
}

export function initAdmin() {
  validateFirebaseConfig(firebaseAdminConfig); // Validate config before initializing

  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(firebaseAdminConfig as admin.ServiceAccount),
    });
  }
  return {
    db: admin.firestore(),
    auth: admin.auth(),
  };
}
