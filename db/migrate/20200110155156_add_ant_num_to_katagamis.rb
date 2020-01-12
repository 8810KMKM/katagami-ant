class AddAntNumToKatagamis < ActiveRecord::Migration[5.2]
  def change
    add_column :katagamis, :ant_num, :integer, default: 0
  end
end
