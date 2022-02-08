import { EntitySchema } from 'typeorm';

export type UUID = string

export type Status = 'processed' | 'pending'

export type GetRequest = {
    query: Object
    fields: string | string[]
    limit: number
    page: number
    sort: string | string[]
    search: string
    searchFields: string[]
}

export interface EntityType extends EntitySchema {
    tag: string
}
