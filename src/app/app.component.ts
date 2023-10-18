import { Component, OnInit } from '@angular/core';
import { Student } from './student';
import { StudentService } from './student.service';
import { CourseService } from './course.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Course } from './course';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public students!: Student[];
  public courses!: Course[];
  public editStudent!: Student;
  public deleteStudent!: Student;
  public editCourse!: Course;
  public deleteCourse!: Course;

  constructor(private studentService: StudentService, private courseService: CourseService){}

  ngOnInit() {
      this.getStudents();
      this.getCourses();
  }

  public getStudents(): void {
    this.studentService.getStudents().subscribe(
      (response: Student[]) => {
        this.students = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onAddStudent(addForm: NgForm): void {
    document.getElementById('add-student-form')?.click();
    this.studentService.addStudent(addForm.value).subscribe({
      next: (response: Student) => {
        console.log(response);
        this.getStudents();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    }
    );
  }

  public onUpdateStudent(student: Student): void {
    document.getElementById('edit-student-form')?.click();
    this.studentService.updateStudent(student).subscribe({
      next: (response: Student) => {
        console.log(response);
        this.getStudents();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    }
    );
  }

  public onDeleteStudent(studentId: number): void {
    document.getElementById('delete-student-form')?.click();
    this.studentService.deleteStudent(studentId).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getStudents();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    }
    );
  }

  public searchStudents(key: string): void {
    const results: Student[] = [];
    for (const student of this.students) {
      if (student.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(student);
      }
      this.students = results;
      if (!key) {
        this.getStudents();
      }
    }
  }

  public getCourses(): void {
    this.courseService.getCourses().subscribe(
      (response: Course[]) => {
        this.courses = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onAddCourse(addCForm: NgForm): void {
    document.getElementById('add-course-form')?.click();
    this.courseService.addCourse(addCForm.value).subscribe({
      next: (response: Course) => {
        console.log(response);
        //this.getCourses();
        addCForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addCForm.reset();
      }
    }
    );
  }

  public onUpdateCourse(course: Course): void {
    document.getElementById('edit-course-form')?.click();
    this.courseService.updateCourse(course).subscribe({
      next: (response: Course) => {
        console.log(response);
        this.getCourses();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    }
    );
  }

  public onDeleteCourse(courseId: number): void {
    document.getElementById('delete-course-form')?.click();
    this.courseService.deleteCourse(courseId).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getCourses();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    }
    );
  }

  public onOpenModal(student: Student, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addStudentModal');
    }
    if (mode === 'edit') {
      this.editStudent = student;
      button.setAttribute('data-target', '#editStudentModal');
    }
    if (mode === 'delete') {
      this.deleteStudent = student;
      button.setAttribute('data-target', '#deleteStudentModal');
    }
    container!.appendChild(button);
    button.click();
  }

  public onOpenModalC(course: Course, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addCourseModal');
    }
    if (mode === 'edit') {
      this.editCourse = course;
      button.setAttribute('data-target', '#editStudentModal');
    }
    if (mode === 'delete') {
      this.deleteCourse = course;
      button.setAttribute('data-target', '#deleteStudentModal');
    }
    container!.appendChild(button);
    button.click();
  }
}