export interface Entity {
  id: number
}

export interface Authenticable {
  password: string
}

export enum UserRole {
  ADMIN = 'admin',
  INSTRUCTOR = 'teacher',
  STUDENT = 'student'
}

export interface User extends Entity, Authenticable {
  name: string,

  email: string,

  birthDate: string,

  neptunCode: string,

  department: Department,

  roles: UserRole[]
}

export enum InstructorStatus {
  ASSOCIATE_PROFESSOR = 'associate_professor', // docens
  SENIOR_LECTURER = 'senior_lecturer', // adjunktus
  MASTER_INSTRUCTOR = 'master_instructor', // mesteroktató
  ASSISTANT_LECTURER = 'assistant_lecturer', // tanársegéd
  OTHER = 'other'
}

export interface Instructor extends User {
  status: InstructorStatus,
}

export enum Department {
  VIRT = 'virt',
  RSZT = 'rszt',
  MATH = 'math',
  UNKOWN = 'unkown'
}

export interface Course extends Entity {
  name: string,

  code: string,

  creditScore: number,

  department: Department,
}

export interface Semester extends Entity {
  name: string,

  startDate: string,

  endDate: string,
}

export interface Student extends User {
  major: Major,
}


export enum Major {
  COMPUTER_SCIENCE_ENGINEERING_BSC = 'computer_science_engineering_bsc',
  COMPUTER_SCIENCE_ENGINEERING_MSC = 'computer_science_engineering_msc',
  COMPUTER_SCIENCE_BSC = 'computer_science_bsc',
  COMPUTER_SCIENCE_MSC = 'computer_science_msc',
  BUSINESS_INFORMATICS_BSC = 'business_informatics_bsc'
};

export interface InstructorCourseBySemester extends Entity {
  instructorId: number,

  courseId: number,

  semesterId: number
}

export interface StudentCourseBySemester extends Entity {
  studentId: number,

  courseId: number,

  semesterId: number
}