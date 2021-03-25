import { CourseMaterial } from './course-material';

export class Course {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public instructorId: number,
    public courseMaterials: CourseMaterial[]
  ) {}
}
