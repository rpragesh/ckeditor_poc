import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'editor_poc',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
