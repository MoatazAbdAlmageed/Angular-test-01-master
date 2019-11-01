import {
  Application,
  Request,
  Response,
  NextFunction
} from "express";
import { TodoModel } from "../model/todoModel";
import { todos } from "./todos";

export class TodoResource {
  public index: number = 1;
  public todoList: Array<TodoModel>;

  constructor(private contextRoot:string,private exp: Application) {
    this.todoList = todos;
    this.index = this.todoList.length;
    this.index++;
    this.initEndPoints(contextRoot,exp);
  }

  initEndPoints(contextRoot:string,exp: Application) {
    exp.get(`/${contextRoot}/todos`, (req: Request, res: Response, next: NextFunction) => {
      res.send(this.getAllTodo());
    });
    exp.post(`/${contextRoot}/todo`, (req: Request, res: Response, next: NextFunction) => {
      this.todoList = this.addTodo(this.todoList, req.body,this.index++);
      res.send(this.todoList);
    });
    exp.patch(`/${contextRoot}/todo`, (req: Request, res: Response, next: NextFunction) => {/*  */
      this.todoList = this.updateTodo(this.todoList, req.body);
      res.send(this.todoList);
    });
    exp.delete(`/${contextRoot}/todo/:id`, (req: Request, res: Response, next: NextFunction) => {
      this.todoList = this.removeTodo(this.todoList, req.params.id);
      res.send(this.todoList);
    });
  }

  getAllTodo() {
    return this.todoList;
  }

  addTodo(todoList: TodoModel[], todoModel: TodoModel,index:number) {
  todoModel.id = index;
    todoModel.date = new Date();
    todoList.push(todoModel);
    return todoList;
  }

  updateTodo(todoList: TodoModel[], todoModel: TodoModel) {
    todoList.forEach((value, index, arr) => {
      if (value.id === todoModel.id) {
        arr[index] = todoModel;
        arr[index].date = new Date();
      }
    });
    return todoList;
  }

  removeTodo(todoList: TodoModel[], id: string | number | undefined) {
    todoList = todoList.filter(e => e.id != id);
    return todoList;
  }
}
