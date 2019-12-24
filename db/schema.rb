# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_12_24_093328) do

  create_table "annotations", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "katagami_id", null: false
    t.integer "status", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["katagami_id"], name: "index_annotations_on_katagami_id"
    t.index ["user_id", "katagami_id"], name: "index_annotations_on_user_id_and_katagami_id", unique: true
    t.index ["user_id"], name: "index_annotations_on_user_id"
  end

  create_table "has_labels", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.bigint "label_id", null: false
    t.bigint "annotation_id", null: false
    t.bigint "katagami_id", null: false
    t.integer "position", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["annotation_id"], name: "index_has_labels_on_annotation_id"
    t.index ["katagami_id"], name: "index_has_labels_on_katagami_id"
    t.index ["label_id"], name: "index_has_labels_on_label_id"
  end

  create_table "katagamis", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "width", null: false
    t.integer "height", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "cw_obj", null: false
    t.string "name", null: false
  end

  create_table "labels", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "annotations", "katagamis"
  add_foreign_key "annotations", "users"
  add_foreign_key "has_labels", "annotations"
  add_foreign_key "has_labels", "katagamis"
  add_foreign_key "has_labels", "labels"
end
