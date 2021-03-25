export class Rating {
  constructor(
    public id: number,
    public stars: number,
    public comment: string,
    public courseId: number,
    public userId: number
  ) {}
}
