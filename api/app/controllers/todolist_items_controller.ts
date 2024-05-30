import TodolistItem from '#models/todolist_item'
import type { HttpContext } from '@adonisjs/core/http'

export default class TodolistItemsController {
    // store
    public async store({ request, response }: HttpContext) {
        const data = request.only(['description', 'todolistId'])

        const todolistItem = await TodolistItem.create(data)

        return response.created({
            data: todolistItem
        })
    }

    // update
    public async update({ params, request, response }: HttpContext) {
        const data = request.only(['description', 'isComplete'])

        const todolistItem = await TodolistItem.findOrFail(params.id)

        todolistItem.merge(data)

        await todolistItem.save()

        return response.ok({
            data: todolistItem
        })
    }

    // delete
    public async destroy({ params, response }: HttpContext) {
        const todolistItem = await TodolistItem.findOrFail(params.id)

        await todolistItem.delete()

        return response.noContent()
    }
}