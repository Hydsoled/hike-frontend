export class User {
  constructor(
    public firstName: string,
    public lastName: string,
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
