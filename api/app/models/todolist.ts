import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import * as relations from '@adonisjs/lucid/types/relations'
import TodolistItem from './todolist_item.js'

export default class Todolist extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @hasMany(() => TodolistItem, {
    foreignKey: 'todolistId',
    localKey: 'id'
  })
  declare items: relations.HasMany<typeof TodolistItem>
  

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}