class ChangeSrcTypeOfKatagamis < ActiveRecord::Migration[5.2]
  def change
    remove_column :katagamis, :src
    add_column :katagamis, :src, :text, null: false
  end
end
