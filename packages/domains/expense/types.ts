import { Status, UUID } from '@nc/utils/types';

// add expense type
export interface Expense {
    id: UUID
    merchant_name: string
    amount_in_cents: number
    currency: string
    user_id: string
    date_created: string
    status: Status
}
