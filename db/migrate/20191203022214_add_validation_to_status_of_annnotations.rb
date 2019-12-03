class AddValidationToStatusOfAnnnotations < ActiveRecord::Migration[5.2]
  def change
    change_column_default :annotations, :status, 0
  end
end
