export class CourseMaterial {
  constructor(
    public id: number,
    public materialType: string,
    public description: string,
    public courseId: number
  ) {}
}
