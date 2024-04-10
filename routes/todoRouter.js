// dependencies
const express = require('express');
// instantiating todoRouter as an express router
const todoRouter = express.Router()
// creating a variable called Todo that pulls from the todo model
const Todo = require("../models/todo");
const send = require('send');


/*
* *  post request mongoose 6 (with callbacks)
?   todoRouter.post('/', (req, res, next) => {
?    const newTodo = new Todo(req.body)
?      newTodo.save((err, savedTodo) => {
?           if(err){
?                   res.status(500)
?                   return next(err)
?               }
?               return res.status(201).send(savedTodo)
?            })
?         })
            
            */

/*
* * post request mongoose 8 (no callbacks, adding async await)
*/
todoRouter.post("/", async (req, res, next) => {
    try {
        const newTodo = new Todo(req.body)
        const savedTodo = await newTodo.save()
        return res.status(201).send(savedTodo)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})


/* 
* * get request mongoose 6 (with callbacks)
?   todoRouter.get('/', (req, res, next) => {
?       Todo.find((err, todos) => {
?           if(err){
?               res.status(500)
?               return next(err)
?           }
?           return res.status(200).send(todos)
?          })
?          })
*/
/*
* * get request mongoose 8 (no callbacks, async await)
*/
todoRouter.get("/", async (req, res, next) => {
    try {
        const foundTodos = await Todo.find()
        return res.status(200).send(foundTodos)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})




/*
* * delete request mongoose 6 (with callbacks)
?todoRouter.delete("/:id", (req, res, next) => {
?   Todo.findByIdAndDelete(
?       {_id: req.parms.id}
?       (err, deletedTodo) => {
?           if(err){
?               res.status(500)
?               return next(err)
?           }
?           return res.status(201).send({`Deleted ${deletedTodo.title}`)
?       }
?   )
?})
?})
*/



/* 
* * delete request mongoose 8 (no callbacks, async await)
*/
todoRouter.delete("/:id", async (req, res, next) => {
    try {
        const foundTodo = await Todo.findByIdAndDelete(req.params.id)
        return res.status(201).send(`You have successfully deleted ${foundTodo.title}`);

    } catch (error) {
        res.status(500)
        return next(error)
    }
})




/*
* * put request mongoose 6 (with callbacks)

?   todoRouter.put("/:id", (req, res, next) => {
?       Todo.findByIdAndUpdate(
?           req.params.id, 
?           req.body, 
?           { new: true },
?           (error, foundTodo) => {
?               if (error) {
?               res.status(500);
?               return next(error);
?       }   
?       res.status(201).send(`You have successfully updated ${foundTodo.title}`);
?   });
?});

*/

/*
* * put request mongoose 8 (no callbacks, async await)
*/
todoRouter.put("/:id", async (req, res, next) => {
    try {
        const foundTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.status(201).send(`You have successfully updated ${foundTodo.title}`);
    } catch (error) {
        res.status(500)
        return next(error)
    }
})




/*
* * get one request mongoose 6 (with callbacks)
?   todoRouter.get("/:id", (req, res, next) => {
?       Todo.findById(req.params.id, (error, foundTodo) => {
?           if (error) {
?               res.status(500);
?               return next(error);
?           }
?           res.status(200).send(foundTodo);
?       });
?     });
*/



/*
 * * get one Todo mongoose 8 (no callbacks, async await)
*/
todoRouter.get("/:id", async (req, res, next) => {
    try {
        const foundTodo = await Todo.findById(req.params.id)
        return res.status(200).send(foundTodo);
    } catch (error) {
        res.status(500)
        return next(error)
    }
})













module.exports = todoRouter