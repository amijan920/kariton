class CreateCarts < ActiveRecord::Migration
  def change
    create_table :carts do |t|
      t.references :User, index: true
      t.decimal :total
      t.datetime :checkout_date

      t.timestamps
    end
  end
end
