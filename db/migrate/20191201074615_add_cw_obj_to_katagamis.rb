class AddCwObjToKatagamis < ActiveRecord::Migration[5.2]
  def change
    add_column :katagamis, :cw_obj, :string, null: false
  end
end
