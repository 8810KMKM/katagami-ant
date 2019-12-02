class AddNameToKatagamis < ActiveRecord::Migration[5.2]
  def change
    remove_column :katagamis, :src
    add_column :katagamis, :name, :string, null: false
  end
end
