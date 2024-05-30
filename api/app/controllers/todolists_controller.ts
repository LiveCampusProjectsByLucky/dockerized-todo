import Todolist from '#models/todolist'
import type { HttpContext } from '@adonisjs/core/http'

export default class TodolistsController {
  // index
  public async index({ response }: HttpContext) {
    const todolists = await Todolist.query().preload('items')

    const todolistsData = todolists.map((todolist) => {
      // filter items by isComplete, 0 at the top and 1 at the bottom
      todolist.items = todolist.items.sort((a, b) => {
        return a.isComplete === b.isComplete ? 0 : a.isComplete ? 1 : -1
      })

      return {
        id: todolist.id,
        title: todolist.title,
        items: todolist.items,
      }
    })

    if (!todolists.length) {
      return response.ok({
        message: 'No todolists found',
        data: [],
        code: 200,
      })
    }

    return response.ok({
      data: todolistsData,
      message: 'Todolists found successfully',
      code: 200,
    })
  }

  // show
  public async show({ params, response }: HttpContext) {
    const todolist = await Todolist.query().preload('items').where('id', params.id).first()

    if (!todolist) {
      return response.ok({
        message: 'No todolist found',
        data: [],
        code: 200,
      })
    }

    return response.ok({
      data: todolist,
      message: 'Todolist found successfully',
      code: 200,
    })
  }

  // store
  public async store({ request, response }: HttpContext) {
    const data = request.only(['title'])

    const todolist = await Todolist.create(data)

    return response.created({
      data: todolist,
      message: 'Todolist created successfully',
      code: 201,
    })
  }

  // update
  public async update({ params, request, response }: HttpContext) {
    const data = request.only(['title'])

    const todolist = await Todolist.findOrFail(params.id)

    todolist.merge(data)

    await todolist.save()

    return response.ok({
      data: todolist,
      message: 'Todolist updated successfully',
      code: 200,
    })
  }

  // delete
  public async destroy({ params, response }: HttpContext) {
    const todolist = await Todolist.findOrFail(params.id)

    await todolist.delete()

    return response.ok({
      message: 'Todolist deleted successfully',
      code: 204,
    })
  }
}
