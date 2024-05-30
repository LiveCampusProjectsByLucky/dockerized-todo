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
  }).prefix('todolists')
}).prefix('api/v1')