import type { CapacitorConfig } from '@capacitor/cli';

let config: CapacitorConfig;

const baseConfig: CapacitorConfig = {
  appId: 'app.papille.app',
  appName: 'Papille',
  webDir: 'dist'
};

if(process.env.NODE_ENV === 'development') {
  config = {
    ...baseConfig,
    server: {
      url: 'http://192.168.1.63:5173',
      cleartext: true
    }
  };
}
else {
  config = baseConfig;
}

export default config;
