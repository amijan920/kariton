class CreateCartItems < ActiveRecord::Migration
  def change
    create_table :cart_items do |t|
      t.references :Item, index: true
      t.references :Cart, index: true
      t.integer :quantity
      t.decimal :price

      t.timestamps
    end
  end
end
