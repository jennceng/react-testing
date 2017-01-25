class CreateBars < ActiveRecord::Migration[5.0]
  def change
    create_table :bars do |t|
      t.string :name, null: false
      t.string :address, null: false
      t.string :cover_charge
      t.string :hours_of_operation

      t.timestamps
    end
  end
end
