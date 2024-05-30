/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'Congratulations! You found the API created by Lucky!',
  }
})

router.group(() => {

  router.group(() => {
    router.get('/', '#controllers/todolists_controller.index')
    router.get('/:id', '#controllers/todolists_controller.show')
    router.post('/', '#controllers/todolists_controller.store')
    router.put('/:id', '#controllers/todolists_controller.update')
    router.delete('/:id', '#controllers/todolists_controller.destroy')
  }).prefix('todolists')

  router.group(() => {
    router.get('/', '#controllers/todolist_items_controller.index')
    router.get('/:id', '#controllers/todolist_items_controller.show')
    router.post('/', '#controllers/todolist_items_controller.store')
    router.put('/:id', '#controllers/todolist_items_controller.update')
  }).prefix('todoitems')

}).prefix('api/v1')