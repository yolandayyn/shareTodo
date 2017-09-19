import { Component, OnInit} from '@angular/core';
import {TodoService} from '../../services/todo/todo.service';
import {Todo} from '../../Todo';
import {Auth} from '../../services/auth/auth.service';

@Component({
  moduleId: module.id,
  selector: 'todos',
  templateUrl: 'todos.component.html'
})

export class TodosComponent implements OnInit {
  todos: Todo[];
  email: String;

  constructor(private _todoService: TodoService, private auth: Auth){
  }

  ngOnInit(){
    this.todos = [];
    var pro = JSON.parse(localStorage.getItem('profile'));
    var uid = pro.email;
    this.email = uid;
    this._todoService.getTodos(uid)
      .subscribe(todos => {
        this.todos = todos;
      });
  }

  addTodo(event, todoText){
      var result;
      var newTodo = {
        text: todoText.value,
        isCompleted: false,
        uid: this.email,
        isPublic: false
      };

      result = this._todoService.saveTodo(newTodo);
      result.subscribe(x => {
        newTodo._id = x._id;
        this.todos.push(newTodo);
        todoText.value = '';
      });
  }

  setEditState(todo, state){
    if(state){
      todo.isEditMode = state;
    } else {
      delete todo.isEditMode;
    }
  }

  updateCompleteStatus(todo){
    var _todo = {
      _id:todo._id,
      text: todo.text,
      isCompleted: !todo.isCompleted,
      uid: todo.uid,
      isPublic: todo.isPublic
    };

    this._todoService.updateTodo(_todo)
      .subscribe(data => {
        todo.isCompleted = !todo.isCompleted;
      });
  }

  updateTodoText(event, todo){
    if(event.which === 13){
        todo.text = event.target.value;
        var _todo = {
          _id: todo._id,
          text: todo.text,
          isCompleted: todo.isCompleted,
          uid: todo.uid,
          isPublic: todo.isPublic
        };

        this._todoService.updateTodo(_todo)
          .subscribe(data => {
            this.setEditState(todo, false);
          })
    }
  }

  deleteTodo(todo){
    var todos = this.todos;

    this._todoService.deleteTodo(todo._id)
      .subscribe(data => {
        if(data.n == 1){
          for(var i = 0; i < todos.length; i++){
            if(todos[i]._id == todo._id){
              todos.splice(i, 1);
            }
          }
        }
      })
  }

  updatePublicStatus(todo){
    var _todo = {
      _id:todo._id,
      text: todo.text,
      isCompleted: todo.isCompleted,
      isPublic: !todo.isPublic,
      uid: todo.uid
    };

    this._todoService.updateTodo(_todo)
      .subscribe(data => {
        todo.isPublic = !todo.isPublic;
      });
  }
}
