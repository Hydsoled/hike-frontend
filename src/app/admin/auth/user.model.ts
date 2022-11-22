export class User {
  constructor(
    public email: string,
    public access_token: string,
    public exDate: number,
  ) {
  }

  get token(): any {
    if (!this.exDate || (new Date()).getTime() > this.exDate){
      return null;
    }
    return this.access_token;
  }
}
