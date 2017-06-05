/**
 * Created by mukadder on 3/11/17.
 */
/*
 Actions
 These are Actions in our Application. They can be originated by the User or
 the Server-side. They are the only source of information for the Store.
  Actions are plain JavaScript objects describing a change and using a type property as identifier.
   See an example below:

 */
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const SET_CURRENT_FILTER = 'SET_CURRENT_FILTER';

export class TodoActions {
    constructor() {
        this.nextToDoId = 0;
    }

    addTodo(text){
        return {
            type: ADD_TODO,
            id: this.nextToDoId++,
            text: text,
            completed: false
        };
    };

    toggleTodo(id){
        return {
            type: TOGGLE_TODO,
            id: id
        };
    };

    removeTodo(id){
        return {
            type: REMOVE_TODO,
            id: id
        };
    }

    setCurrentFilter(filter){
        return {
            type: SET_CURRENT_FILTER,
            filter: filter
        };
    };
}