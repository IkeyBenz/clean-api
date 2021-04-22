type Controller = AuthController;

declare type ControllerFactoryDeps = Services & {
  Responses: ResponsesFactory;
}

declare type ControllerFactory = (deps: ControllerFactoryDeps) => Controller;