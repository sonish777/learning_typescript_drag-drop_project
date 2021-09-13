export function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  console.log("BINDING");
  const originalMethod = descriptor.value;
  const newDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      return originalMethod.bind(this);
    },
  };
  return newDescriptor;
}
