class AddDivisionToHasLabels < ActiveRecord::Migration[5.2]
  def change
    add_column :has_labels, :division, :integer, null: false
  end
end
