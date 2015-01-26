class CartItem < ActiveRecord::Base
  belongs_to :Item
  belongs_to :Cart
end
