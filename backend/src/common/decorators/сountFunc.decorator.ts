export const CountFunc = (...args): void => {
  if (typeof args[0] === 'function') {
    const ctor = args[0];

    const proto = ctor.prototype;

    const methods = Object.getOwnPropertyNames(proto).filter(
      (prop) => prop !== 'constructor',
    );

    console.log(methods.length, ' - functions in', args[0].name);
  }
};
