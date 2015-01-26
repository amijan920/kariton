class AddMycartToUsers < ActiveRecord::Migration
  def change
    add_reference :users, :Cart, index: true
  end
end
