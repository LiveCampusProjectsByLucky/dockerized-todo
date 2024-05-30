import vine from '@vinejs/vine'


const storeTodolistItemValidator = vine.compile(
  vine.object({
    title: vine.string(),
    todolistId: vine.number(),
  })
)

export { storeTodolistItemValidator }
