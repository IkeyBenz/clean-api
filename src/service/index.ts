import createMockDatabase from 'database/BuildMockDatabase';
import buildAuthService from './BuildAuthService';
import buildUserService from './BuildUserService';

function createTestableServices(): Services {
  function withServiceDeps<R extends Services[keyof Services]>(
    createService: ServiceFactory<R>
  ) {
    return createService({ Database: createMockDatabase() });
  }
  return {
    UserService: withServiceDeps(buildUserService),
    AuthService: withServiceDeps(buildAuthService),
  };
}

const services = {
  testable: createTestableServices(),
};

export default services;
