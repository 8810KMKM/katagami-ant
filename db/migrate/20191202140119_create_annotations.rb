class CreateAnnotations < ActiveRecord::Migration[5.2]
  def change
    create_table :annotations do |t|
      # t.references :user, foreign_key: true
      t.references :katagami, foreign_key: true
      t.integer :status

      t.timestamps
    end
  end
end
