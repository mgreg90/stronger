class CreateHistory
  prepend SimpleCommand

  WORKOUT_EXECUTIONS_PER_PAGE = 5

  def initialize(page: 0, user:)
    @page = page
    @user = user
  end

  def call
    return WorkoutExecution
      .where(user: user)
      .completed
      .page(page)
      .per(WORKOUT_EXECUTIONS_PER_PAGE)
  end

  private

  attr_reader :page, :user
end
