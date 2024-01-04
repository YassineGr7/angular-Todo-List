import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/services/crud.service';
import { Task } from '../Model/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  taskObj : Task = new Task();
  allTasks : Task[] = [];
  newTask : string = '';
  create_at : string = '';
  editedTask : string = '';
  constructor(private crudSercvice:CrudService){}
  
  ngOnInit(): void {
    this.editedTask = '' ;
    this.newTask ='' ;
    this.taskObj = new  Task();
    this.allTasks = [];
    this.getAllTasks();
  }

  getAllTasks() {
    this.crudSercvice.getAllTask().subscribe(res => {
        this.allTasks = res ;
    },err => {
      alert("Error getting all tasks !");
    });
  }

  addTask() {
    this.taskObj.task_desc = this.newTask ;
    this.create_at = new Date().toUTCString().slice(5, 30);
    this.crudSercvice.addTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
      this.newTask = '' ;
    }, err => {
      alert(err)
    })
  }

  updateTask() {
    this.taskObj.task_desc = this.editedTask;
    this.crudSercvice.updateTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
    }, err => {
      alert("faild to update task");
    })
  }

  deleteTask(task: Task) {
    this.crudSercvice.deleteTask(task).subscribe(res => {
      this.ngOnInit();

    }, err => {
      alert("Error deleting task");
    }) 
  }

  call(task:Task) {
    this.taskObj = task ;
    this.editedTask = task.task_desc ;
  }


}


