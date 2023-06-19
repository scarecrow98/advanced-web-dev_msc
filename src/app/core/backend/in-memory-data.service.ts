import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Course, Department, Instructor, InstructorCourseBySemester, InstructorStatus, Major, Semester, Student, StudentCourseBySemester, User, UserRole } from '../models/main';
import signJwt from 'jwt-encode';
import { environment } from 'src/environments/environment';
import jwtDecode from 'jwt-decode';
import { HttpRequest } from '@angular/common/http';


const users: User[] = [
  {
    id: 1,
    name: 'Student Mike',
    email: 'student@email.com',
    birthDate: new Date().toISOString(),
    neptunCode: 'BOSXXA',
    department: Department.UNKOWN,
    roles: [
      UserRole.STUDENT,
    ],
    major: Major.BUSINESS_INFORMATICS_BSC,
    password: 'password123'
  } as Student,
  {
    id: 2,
    name: 'Instructor Adam',
    email: 'instructor@email.com',
    birthDate: new Date().toISOString(),
    neptunCode: 'FHJIK4',
    department: Department.RSZT,
    roles: [
      UserRole.INSTRUCTOR
    ],
    password: 'password123',
    status: InstructorStatus.MASTER_INSTRUCTOR
  } as Instructor,
  {
    id: 3,
    name: 'Admin Jason',
    email: 'admin@email.com',
    birthDate: new Date().toISOString(),
    neptunCode: 'PMNK4R',
    department: Department.UNKOWN,
    roles: [
      UserRole.ADMIN
    ],
    password: 'password123'
  }
];

const courses: Course[] = [
  {
    id: 1,
    name: 'Programming 1',
    code: 'programming-1',
    creditScore: 5,
    department: Department.RSZT
  },
  {
    id: 2,
    name: 'Advanced Algorithms',
    code: 'advanced-algo',
    creditScore: 4,
    department: Department.RSZT
  },
  {
    id: 2,
    name: 'Numerical Analysis',
    code: 'num-analysis',
    creditScore: 5,
    department: Department.MATH
  }
];

const semesters: Semester[] = [
  {
    id: 1,
    name: '2022/23/1',
    startDate: '2022-09-01',
    endDate: '2023-01-31'
  },
  {
    id: 2,
    name: '2022/23/2',
    startDate: '2023-02-01',
    endDate: '2023-06-31'
  },
  {
    id: 3,
    name: '2023/24/1',
    startDate: '2023-09-01',
    endDate: '2024-01-31'
  },
  {
    id: 4,
    name: '2023/24/2',
    startDate: '2024-02-01',
    endDate: '2024-06-31'
  }
];

const instructorCoursesBySemester: InstructorCourseBySemester[] = [
  {
    id: 1,
    instructorId: 2,
    courseId: 1,
    semesterId: 1
  },
  {
    id: 2,
    instructorId: 2,
    courseId: 2,
    semesterId: 2
  }
];

const studentCoursesBySemester: StudentCourseBySemester[] = [
  {
    id: 1,
    studentId: 1,
    courseId: 1,
    semesterId: 1
  },
  {
    id: 2,
    studentId: 1,
    courseId: 2,
    semesterId: 2
  }
];

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    return { users, courses, semesters, instructorCoursesBySemester, studentCoursesBySemester };
  }

  post(requestInfo: RequestInfo) {
    if (requestInfo.url.includes('auth/login')) {
      return this.login(requestInfo);
    }

    // if (requestInfo.url.startsWith('/api/instructorCoursesBySemester/delete') && requestInfo.method === 'post') {
    //   return this.deleteInstructorCoursesBySemester(requestInfo);
    // }

    return undefined;
  }

  get(requestInfo: RequestInfo) {
    if (requestInfo.url.includes('auth/check')) {
      return this.authCheck(requestInfo);
    }

    if (requestInfo.url.startsWith('auth/check')) {
      return this.authCheck(requestInfo);
    }

    if (requestInfo.url.startsWith('/api/instructorCoursesBySemester') && requestInfo.method === 'get') {
      return this.getInstructorCoursesBySemester(requestInfo);
    }

    if (requestInfo.url.startsWith('/api/studentCoursesBySemester') && requestInfo.method === 'get') {
      return this.getStudentCoursesBySemester(requestInfo);
    }

    return undefined;
  }

  private login(requestInfo: RequestInfo) {
    const req = requestInfo.req as any;

    return requestInfo.utils.createResponse$(() => {
      const email = req.body?.email;
      const password = req.body?.password;

      const user = users.find(u => u.email === email && u.password === password);

      if (!user) {
        return {
          status: 401,
          body: {  }   
        }
      }

      // create jwt for the user
      const payload = {
        sub: user.id,
        name: user.name,
        email: user.email,
        neptunCode: user.neptunCode,
        roles: user.roles
      };

      const token = signJwt(payload, environment.jwtSecret);

      return {
        status: 200,
        body: {
          token
        }
      }
    });
  }

  private authCheck(requestInfo: RequestInfo) {
    return requestInfo.utils.createResponse$(() => {
      const authHeader = (requestInfo.req as HttpRequest<any>).headers.get('Authorization') || '';
      const jwtToken = authHeader.substring(7); // cut "Bearer " from the beginning

      try {
        const payload = jwtDecode(jwtToken) as any;
        const user = users.find(u => u.id === payload.sub);

        if (!user) {
          throw new Error(); 
        }

        return {
          status: 200,
          body: user
        }
      } catch {
        return {
          status: 401,
          body: { }
        }
      }      

    });
  }

  private getInstructorCoursesBySemester(requestInfo: RequestInfo) {
    return requestInfo.utils.createResponse$(() => {
      const filterSemesterId = parseInt(requestInfo.query.get('semesterId')!.at(0)!);
      const filterInstructorId = parseInt(requestInfo.query.get('instructorId')!.at(0)!);
  
      const db = this.createDb();

      const courseIds = db.instructorCoursesBySemester
                      .filter(item => item.semesterId === filterSemesterId && item.instructorId === filterInstructorId)
                      .map(item => item.courseId)
        
      const results = courseIds.map(courseId => db.courses.find((course: Course) => course.id == courseId))

      return {
        status: 200,
        body: results
      }
    });
  }

  private getStudentCoursesBySemester(requestInfo: RequestInfo) {
    return requestInfo.utils.createResponse$(() => {
      const filterSemesterId = parseInt(requestInfo.query.get('semesterId')!.at(0)!);
      const filterStudentId = parseInt(requestInfo.query.get('studentId')!.at(0)!);
  
      const db = this.createDb();

      const courseIds = db.studentCoursesBySemester
                      .filter(item => item.semesterId === filterSemesterId && item.studentId === filterStudentId)
                      .map(item => item.courseId)
        
      const results = courseIds.map(courseId => db.courses.find((course: Course) => course.id == courseId))

      return {
        status: 200,
        body: results
      }
    });
  }

  // private deleteInstructorCoursesBySemester(requestInfo: RequestInfo) {
  //   return requestInfo.utils.createResponse$(() => {
  //     const { instructorId, semesterId, courseId } = (requestInfo.req as any).body;

  //     const entitiesToDelete = instructorCoursesBySemester.filter(entity => {
  //       return entity.courseId === courseId && entity.semesterId === semesterId && entity.instructorId === instructorId;
  //     });

  //     instructorCoursesBySemester = instructorCoursesBySemester.filter(entity => !entitiesToDelete.includes(entity));

  //     console.log(instructorCoursesBySemester);
  //     return {
  //       status: 200,
  //       body: entitiesToDelete[0]
  //     }
  //   });
  // }
}
