class AddUniquenessToAnnotations < ActiveRecord::Migration[5.2]
  def change
    add_index :annotations, [:user_id, :katagami_id], unique: true
  end
end
