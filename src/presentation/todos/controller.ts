import { Request, Response } from "express";

const todos = [
    { id: 1, name: 'TASK1', createdAt: new Date() },
    { id: 2, name: 'TASK2', createdAt: new Date() },
    { id: 3, name: 'TASK3', createdAt: new Date() }
];

export class TodosController {

    constructor() { }

    public getAll = (req: Request, res: Response) => {
        res.json(todos);
    }


    public getById = (req: Request, res: Response) => {
        const id = +req.params.id
        if( isNaN(id) ) {
            res.status(400).json({error: 'ID no es un numero entero.'})
            return;
        } 

        const todo = todos.find(todo => todo.id == id);

        ( todo ) 
            ? res.json(todo)
            : res.status(404).json({error: `Tarea con id ${id} no existe.`});
    }


    public create = (req: Request, res: Response) => {
        const { name } = req.body;

        if(!name) {
            res.status(400).json({error: `El nombre es requerido.`});
            return;
        }

        const todo = todos.find(todo => todo.name == name);

        if(todo) {
            res.status(400).json({error: `Tarea con nombre ${todo.name} ya existe.`});
            return;
        }

        const newTodo = {
            id: todos.length + 1,
            name: name,
            createdAt: new Date()
        };

        todos.push(newTodo);
        res.json(newTodo);
    }


    public update = (req: Request, res: Response) => {
        const { name,  createdAt} = req.body;
        const id = +req.params.id

        if( isNaN(id) ) {
            res.status(400).json({error: 'ID no es un numero entero.'})
            return;
        } 

        const todo = todos.find(todo => todo.id == id);

        if(!todo) {
            res.status(404).json({error: `Tarea con id ${id} no existe.`});
            return;
        }

        todo.name = name || todo.name;
        todo.createdAt = createdAt || todo.createdAt;


        todos.forEach((todo, index) => {
            if(todo.id == id) {
                todos[index] = todo;
            }
        });

        res.json(todo);
    }


    public delete = (req: Request, res: Response) => {
        const id = +req.params.id;

        if( isNaN(id) ) {
            res.status(400).json({error: 'ID no es un numero entero.'})
            return;
        } 

        const todo = todos.find(todo => todo.id == id);

        if(!todo) {
            res.status(404).json({error: `Tarea con id ${id} no existe.`});
            return;
        }

        todos.splice(todos.indexOf(todo), 1);
        res.json(todo);
    }
}