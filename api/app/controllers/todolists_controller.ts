import Todolist from '#models/todolist'
import type { HttpContext } from '@adonisjs/core/http'

export default class TodolistsController {

    // index
    public async index({ response }: HttpContext) {
        const todolists = await Todolist.query().preload('items')

        if (!todolists.length) {
            return response.notFound({ message: 'No todolists found' })
        }

        return response.ok({
            data: todolists
        })
    }

    // show
    public async show({ params, response }: HttpContext) {
        const todolist = await Todolist.query().preload('items').where('id', params.id).first()

        if (!todolist) {
            return response.notFound({ message: 'Todolist not found' })
        }

        return response.ok({
            data: todolist
        })
    }

    // store
    public async store({ request, response }: HttpContext) {
        const data = request.only(['title', 'description'])

        const todolist = await Todolist.create(data)

        return response.created({
            data: todolist
        })
    }

    // update
    public async update({ params, request, response }: HttpContext) {
        const data = request.only(['title', 'description'])

        const todolist = await Todolist.findOrFail(params.id)

        todolist.merge(data)

        await todolist.save()

        return response.ok({
            data: todolist
        })
    }

    // delete
    public async destroy({ params, response }: HttpContext) {
        const todolist = await Todolist.findOrFail(params.id)

        await todolist.delete()

        return response.noContent()
    }
}