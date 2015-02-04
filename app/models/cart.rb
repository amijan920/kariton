class Cart < ActiveRecord::Base
  belongs_to :User

  class << self # Class methods
    def addItem (cart_id, item_id, quantity)
    	if quantity == 0
    		return
    	end

	  	c_item = Item.find(item_id)

	  	if quantity > c_item.stock
	  		quantity = c_item.stock
	  	end

	  	c_cart = Cart.find(cart_id)

	  	c_cart_item = CartItem.where(Cart_id: cart_id, Item_id: item_id).first
	  	
	  	total = c_item.price * quantity
	  	
	  	if c_cart_item.nil?
				cartItem = CartItem.create(Cart_id: c_cart.id, Item_id: c_item.id, quantity: quantity, price: total)
		  else
		  	c_cart_item.quantity
		  	c_cart_item.update(quantity: c_cart_item.quantity + quantity, price: c_cart_item.price + total)
		  end

		  total = total + c_cart.total
	  	c_cart.update(total: total)
	  	c_item.update(stock: (c_item.stock - quantity))
			
	  end

	  def removeItem (cart_id, cart_item_id)
	  	c_cart = Cart.find(cart_id)
	  	c_cart_item = CartItem.find(cart_item_id)
	  	c_item = Item.find(c_cart_item.Item_id)

	  	total = c_cart.total - c_cart_item.price
	  	c_cart.update(total: total)
	  	c_item.update(stock: (c_item.stock + c_cart_item.quantity))
	  	c_cart_item.destroy()
	  end

	  def clearCart (cart_id)
	  	cart_items = CartItem.where(Cart_id: cart_id)

	  	cart_items.each do |cart_item|
	  		removeItem(cart_id, cart_item.id)
	  	end
	  end

	  def getItems (cart_id)
	  	cart_items = CartItem.where(Cart_id: cart_id)
	  	items = Array.new(cart_items.length)
	 		quantity = 0

	  	cart_items.each_with_index do |cart_item, i|
	  		items[i] = Item.find(cart_item.Item_id)
	  		quantity += cart_item.quantity
	  	end

	  	return cart_items, items, quantity
	  end

	  def checkout (cart_id)
	  	c_cart = Cart.find(cart_id)
	  	c_user = User.find(c_cart.User_id)
			
			n_cart = Cart.create(User_id: c_user.id, total: 0)
	  	
	  	c_user.update(Cart_id: n_cart.id)
	  	c_cart.update(checkout_date: Time.now.strftime("%d/%m/%Y %H:%M"))
	  end

	  def getHistory (user_id)
	  	c_user = User.find(user_id)
	  	cart_history = Cart.where(User_id: user_id).where.not(id: c_user.Cart_id)

	  	cart_items = Array.new(cart_history.length)
	  	total = 0
	  	cart_history.each_with_index do |cart, i|
	  		cart_items[i] = CartItem.where(Cart_id: cart.id)
	  		total += cart.total
	  	end

	  	return cart_history, cart_items, total 
	  end
  end
  

end
