import { Component, OnInit } from '@angular/core';
import { Todo } from '../../../models/Todo'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  todosUrl:string = 'https://jsonplaceholder.typicode.com/todos?_limit=10'

  constructor(private http:HttpClient) { }
  newTodo:string
  todo:Todo
  todos:Todo[]

  ngOnInit() {
    this.getTodos().subscribe(todos => {
      this.todos = todos
    })
  }

  getTodos():Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl)
  }

}
