export const Type = {
    INCOME: 'income',
    OUTCOME: 'outcome'
}

let auxId = 0;

export class Movement {
    constructor(
        {title, description, amount, type}={
            title: '',
            description: '',
            amount: 0,
            type: Type.INCOME
        }) {
        this.id = auxId++,
        this.title = title,
        this.description = description,
        this.amount = amount,
        this.type = type,
        this.date = new Date()
    }
}