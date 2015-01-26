class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.text :description
      t.string :name
      t.decimal :price
      t.integer :stock

      t.timestamps
    end
  end
end
