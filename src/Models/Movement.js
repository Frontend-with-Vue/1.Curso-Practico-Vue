export const Type = {
    INCOME: 'income',
    OUTCOME: 'outcome'
}

let auxId = 1;

export class Movement {
    constructor(
        {
            title = '',
            description = '',
            amount = 0,
            type = Type.INCOME,
            date = new Date()} = {}) {
        this.id = auxId++,
        this.title = title,
        this.description = description,
        this.amount = amount,
        this.type = type,
        this.date = date
    }
}