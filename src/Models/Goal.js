export const Status = {
  SUCCESS: 'success',
  FAILED: 'failed'
}

let auxId = 1;

export class Goal {
  constructor(
    {
      title = '',
      description = '',
      amount = 0,
      targetAmount = 0,
      deadline = new Date() } = {}) {
    this.id = auxId++;
    this.title = title;
    this.description = description;
    this.currentAmount = amount;
    this.targetAmount = targetAmount;
    this.deadline = deadline;
  }
}