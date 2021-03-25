import { Course } from './course';

export class AppUser {
  constructor(
    public id: number,
    public fName: string,
    public lName: string,
    public email: string,
    public password: string,
    public userRoleId: number,
    public studentCourses: Course[],
    public instructorCourses: Course[]
  ) {}
}
