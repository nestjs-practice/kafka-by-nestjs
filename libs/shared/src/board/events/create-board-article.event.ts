export namespace BoardArticleEvent {
  export class Created {
    constructor(readonly userId: number) {
      this.userId = userId;
    }
  }

  export class Deleted {
    constructor(readonly userId: number) {
      this.userId = userId;
    }
  }
}
