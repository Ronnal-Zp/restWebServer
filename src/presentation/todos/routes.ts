import { Router } from "express";
import { TodosController } from './controller';

export class TodosRoutes {

    static routes(): Router {
        const router = Router();
        const todosController  = new TodosController();

        router.get('/', todosController.getAll);
        router.get('/:id', todosController.getById);
        router.post('/', todosController.create);
        router.put('/:id', todosController.update);
        router.delete('/:id', todosController.delete);

        return router;
    }

}