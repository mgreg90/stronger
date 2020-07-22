# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_07_22_021233) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_trgm"
  enable_extension "plpgsql"

  create_table "exercise_executions", force: :cascade do |t|
    t.bigint "workout_execution_id", null: false
    t.bigint "exercise_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id", null: false
    t.integer "order"
    t.index ["exercise_id"], name: "index_exercise_executions_on_exercise_id"
    t.index ["user_id"], name: "index_exercise_executions_on_user_id"
    t.index ["workout_execution_id"], name: "index_exercise_executions_on_workout_execution_id"
  end

  create_table "exercise_exercise_types_join", force: :cascade do |t|
    t.bigint "exercise_id"
    t.bigint "exercise_type_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["exercise_id"], name: "index_exercise_exercise_types_join_on_exercise_id"
    t.index ["exercise_type_id"], name: "index_exercise_exercise_types_join_on_exercise_type_id"
  end

  create_table "exercise_types", force: :cascade do |t|
    t.string "name"
    t.string "code", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["code"], name: "index_exercise_types_on_code"
  end

  create_table "exercises", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "rails", force: :cascade do |t|
    t.string "d"
    t.string "model"
    t.string "set_execution"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "set_executions", force: :cascade do |t|
    t.integer "reps", null: false
    t.integer "weight", null: false
    t.integer "status", null: false
    t.integer "order", null: false
    t.bigint "exercise_execution_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.datetime "finished_at"
    t.index ["exercise_execution_id"], name: "index_set_executions_on_exercise_execution_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email"
  end

  create_table "workout_executions", force: :cascade do |t|
    t.datetime "started_at"
    t.datetime "finished_at"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_workout_executions_on_user_id"
  end

  add_foreign_key "exercise_executions", "exercises"
  add_foreign_key "exercise_executions", "users"
  add_foreign_key "exercise_executions", "workout_executions"
  add_foreign_key "set_executions", "exercise_executions"
  add_foreign_key "workout_executions", "users"
end
