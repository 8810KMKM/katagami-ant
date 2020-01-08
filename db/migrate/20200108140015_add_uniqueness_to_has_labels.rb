class AddUniquenessToHasLabels < ActiveRecord::Migration[5.2]
  def change
    add_index :has_labels, [:annotation_id, :label_id, :position], unique: true
  end
end
