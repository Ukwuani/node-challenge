import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { GetRequest, Status, UUID } from '@nc/utils/types';

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

export interface GetExpensesRequest extends GetRequest {
    userId: UUID
}

@Entity('expenses')
export class Expenses {
    public static tag = 'expenses';

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    merchant_name: string;

    @Column()
    amount_in_cents: number;

    @Column()
    currency: string;

    @Column()
    user_id: string;

    @Column()
    date_created: Date;

    @Column()
    status: string;
}
