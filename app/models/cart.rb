class Cart < ActiveRecord::Base
  belongs_to :User

  class << self # Class methods
    def addItem (user_id, item_id, quantity)
	  	c_user = User.find(user_id)
	  	c_item = Item.find(item_id)
	  	c_cart = Cart.find(c_user.Cart_id)

			total = c_item.price * quantity
			cartItem = CartItem.create(Cart_id: c_cart.id, Item_id: c_item.id, quantity: quantity, price: total)
	  	total = total + c_cart.total
	  	c_cart.update(total: total)
	  	c_item.update(stock: (c_item.stock - quantity))
	  end

	  def removeItem

	  end

	  def checkout

	  end
  end
  

end
