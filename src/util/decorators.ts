export function handleAsyncError<R>(returnVal: (errMsg: string) => R) {
  const decorator = (
    target: Object,
    key: string | symbol,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => Promise<any>>,
  ) => {
    const originalMethod = descriptor.value!;
    descriptor.value = (...args) => {
      return originalMethod(...args).catch(returnVal);
    }
    
    return descriptor;
  }
  return decorator;
}