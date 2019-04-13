import {SelectionModel} from '@angular/cdk/collections'
import { Component, OnInit, ViewChild } from '@angular/core';
import { Todo } from '../../../models/Todo'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  todosUrl:string = 'https://jsonplaceholder.typicode.com/todos?_limit=10'

  constructor(private http:HttpClient, private snackBar: MatSnackBar) { }
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort;

  newTodo:string
  todo:Todo
  todos:Todo[]
  displayedColumns: string[] = ['id', 'title']
  dataSource = new MatTableDataSource<Todo>(this.todos)
  selection = new SelectionModel<Todo>(true, [])

  ngOnInit() {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort

    this.getTodos().subscribe(todos => {
      this.todos = todos
    })
  }

  getTodos():Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl)
  }

  addTodo():void {
    if(this.newTodo) {
      this.todos.push(new Todo(11, this.newTodo, false))
      this.newTodo = undefined
    }
    else {
      this.snackBar.open('Todo is required', 'Close', {
        duration: 3000,
      })
    }
  }

  markAsCompleted(todo:Todo):void {
    todo.completed = !todo.completed
  }

  // Whether the number of selected elements matches the total number of rows.
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  // Selects all rows if they are not all selected; otherwise clear selection.
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  // The label for the checkbox on the passed row 
  checkboxLabel(row?: Todo): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}
