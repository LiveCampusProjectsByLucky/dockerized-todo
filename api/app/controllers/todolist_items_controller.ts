import TodolistItem from '#models/todolist_item'
import { storeTodolistItemValidator } from '#validators/todolist_item'
import type { HttpContext } from '@adonisjs/core/http'

export default class TodolistItemsController {
    // store
    public async store({ request, response }: HttpContext) {
        const { todolistId, title } = await request.validateUsing(storeTodolistItemValidator)

        const todolistItem = await TodolistItem.create({
            todolistId,
            title,
        })

        return response.created({
            data: todolistItem,
            code: 201,
        })
    }

    // update
    public async update({ params, request, response }: HttpContext) {
        const data = request.only(['title', 'isComplete'])

        const todolistItem = await TodolistItem.findOrFail(params.id)

        todolistItem.merge(data)

        await todolistItem.save()

        return response.ok({
            data: todolistItem,
            message: 'Todolist item updated successfully',
            code: 200
        })
    }

    // delete
    public async destroy({ params, response }: HttpContext) {
        const todolistItem = await TodolistItem.findOrFail(params.id)

        await todolistItem.delete()

        return response.ok({
            message: 'Todolist item deleted successfully',
            code: 204
        })
    }
}