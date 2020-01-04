import { observable, configure } from "mobx";
import { TodoStore } from "./TodoStore";

configure({
  enforceActions: "always"
});
export class Store {
  @observable name: string = "zz";

  @observable todoStore: TodoStore = new TodoStore();
}
