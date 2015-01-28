class HomeController < ApplicationController
	before_action :authenticate_user!, except: [:index]
	
	def index
		@items_list = Item.all();
		@key = "Amiel"
		if user_signed_in?
			loadUserCart
		end
	end

	def addItemToCart
		loadUserCart
		Cart.addItem(current_user.id, params[:itemId], params[:itemQuantity].to_i)
		
		@items_list = Item.all();
		@key = "Amiel"
		render :index
	end

	private

	def loadUserCart
		@key ="Amiel2"
		if current_user.Cart_id.nil?
			@cart = Cart.create(User_id: current_user.id, total: 0)
			current_user.update(Cart_id: @cart.id)
		else
			@cart = Cart.find(current_user.Cart_id)
		end
		@cart_items = CartItem.where(Cart_id: @cart.id)
	end
end
