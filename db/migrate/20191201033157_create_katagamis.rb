class CreateKatagamis < ActiveRecord::Migration[5.2]
  def change
    create_table :katagamis do |t|
      t.string :src, null: false
      t.integer :width, null: false
      t.integer :height, null: false

      t.timestamps
    end
  end
end
