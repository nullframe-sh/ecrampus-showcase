const RealDate = Date;
const demoNow = new RealDate('2026-09-23T10:00:00+02:00').getTime();
globalThis.Date = class extends RealDate {
  constructor(...args) { super(...(args.length ? args : [demoNow])); }
  static now() { return demoNow; }
};
