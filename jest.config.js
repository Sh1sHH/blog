const nextJest = require('next/jest');

// Jest için Next.js yapılandırmasını oluşturmak üzere next/jest'i çağırıyoruz.
const createJestConfig = nextJest({
  // Next.js uygulamanızın bulunduğu yolu belirtin.
  dir: './',
});

// Jest'e eklemek istediğiniz özel yapılandırmalar.
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // Alias'larınızı Jest'e tanıtın.
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
  },
};

// createJestConfig'i export ederek Next.js'in Jest ayarlarını yüklemesini sağlıyoruz.
module.exports = createJestConfig(customJestConfig);