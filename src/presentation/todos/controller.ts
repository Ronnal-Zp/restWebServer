import { Request, Response } from "express";
import { prisma } from "../../data/postgres";

export class TodosController {

    constructor() { }

    public getAll = async (req: Request, res: Response) => {
        const todos = await prisma.todo.findMany({})
        res.json(todos);
    }


    public getById = async (req: Request, res: Response) => {
        const id = +req.params.id
        if( isNaN(id) ) {
            res.status(400).json({error: 'ID no es un numero entero.'})
            return;
        } 

        const todo = await prisma.todo.findUnique({
            where: { id }
        });

        ( todo ) 
            ? res.json(todo)
            : res.status(404).json({error: `Tarea con id ${id} no existe.`});
    }


    public create = async (req: Request, res: Response) => {
        const { name, text } = req.body;

        if(!name) {
            res.status(400).json({error: `El nombre es requerido.`});
            return;
        }

        if(!text) {
            res.status(400).json({error: `El texto es requerido.`});
            return;
        }

        const todo = await prisma.todo.findFirst({
            where: { name: name }
        })

        if(todo) {
            res.status(400).json({error: `Tarea con nombre ${todo.name} ya existe.`});
            return;
        }

        const newTodo = {
            name,
            text,
            createdAt: new Date()
        };

        const todoDB = await prisma.todo.create({data: newTodo});
        res.json(todoDB);
    }


    public update = async (req: Request, res: Response) => {
        const { name,  createdAt, text } = req.body;
        const id = +req.params.id

        if( isNaN(id) ) {
            res.status(400).json({error: 'ID no es un numero entero.'})
            return;
        } 

        const todo = await prisma.todo.findUnique({
            where: { id }
        })

        if(!todo) {
            res.status(404).json({error: `Tarea con id ${id} no existe.`});
            return;
        }

        todo.name = name || todo.name;
        todo.text = text || todo.text;

        const updateTodo = await prisma.todo.update({
            where: { id },
            data: todo
        });

        res.json(todo);
    }


    public delete = async (req: Request, res: Response) => {
        const id = +req.params.id;

        if( isNaN(id) ) {
            res.status(400).json({error: 'ID no es un numero entero.'})
            return;
        } 

        const todo = await prisma.todo.findUnique({
            where: { id }
        })

        if(!todo) {
            res.status(404).json({error: `Tarea con id ${id} no existe.`});
            return;
        }

        const result = await prisma.todo.delete({
            where: { id }
        })

        res.json(result);
    }
}