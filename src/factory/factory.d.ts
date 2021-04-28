type Controller = AuthController;

declare type ControllerFactoryDeps = Services & {
  Responses: ResponsesFactory;
};

declare type ServiceFactoryDeps = {
  Database: IDatabase;
};

declare type ControllerFactory = (deps: ControllerFactoryDeps) => Controller;
declare type ServiceFactory<Service extends Services[keyof Services]> = (
  deps: ServiceFactoryDeps
) => Service;
