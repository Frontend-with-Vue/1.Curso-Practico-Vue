export class Goal {
  constructor(
    {
      id = null,
      user_id = null,
      goal_name = '',
      target_amount = 0,
      limit_date = new Date(),
      gathered_amount = 0,
      creation_date = new Date()} = {}) {
      this.id = id,
        this.user_id = user_id,
        this.goal_name = goal_name,
        this.target_amount = target_amount,
        this.limit_date = limit_date,
        this.gathered_amount = gathered_amount,
        this.creation_date = creation_date
  }
}