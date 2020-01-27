class AddUniquenessToAnnotations < ActiveRecord::Migration[5.2]
  def change
    add_reference :annotations, :user, foreign_key: true
    add_index :annotations, [:user_id, :katagami_id], unique: true
  end
end
