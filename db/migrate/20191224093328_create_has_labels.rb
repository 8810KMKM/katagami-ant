class CreateHasLabels < ActiveRecord::Migration[5.2]
  def change
    create_table :has_labels do |t|
      t.references :label, foreign_key: true, null: false
      t.references :annotation, foreign_key: true, null: false
      t.references :katagami, foreign_key: true, null: false
      t.integer :position, null: false

      t.timestamps
    end
  end
end
