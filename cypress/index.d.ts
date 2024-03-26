declare namespace Cypress {
  interface Chainable<Subject = any> {
    getByDataCy(id: string): Chainable<JQuery<HTMLElement>>;
    increaseSearchByN(N: number): Chainable<JQuery<HTMLElement>>;
    decreaseSearchByN(N: number): Chainable<JQuery<HTMLElement>>;
  }
}
