import { Component, OnInit } from '@angular/core';
import { Student } from './student';
import { StudentService } from './student.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public students!: Student[];
  public editStudent!: Student;
  public deleteStudent!: Student;

  constructor(private studentService: StudentService){}

  ngOnInit() {
      this.getStudents();
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
    document.getElementById('add-student-form')?.click();
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
    document.getElementById('add-student-form')?.click();
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
}
