class HomeController < ApplicationController
	before_action :authenticate_user!, except: [:index]
	
	def index
		loadCommonResources

		if user_signed_in?
			loadUserResources
		end
	end

	def addItemToCart
		loadUserResources
		Cart.addItem(@cart.id, params[:itemId], params[:itemQuantity].to_i)
		
		loadUserCart
		loadCommonResources
		render :index
	end

	def removeItemFromCart
		loadUserResources
		Cart.removeItem(@cart.id, params[:cartItemId])

		loadUserCart
		loadCommonResources
		render :index
	end

	def checkoutCart
		loadUserResources
		checkout(@cart.id)
		
		loadUserCart
		loadCommonResources
		render :index
	end

	def inCart?(item_id) 
		item_quantity = 0
		@cart_items.each do |i_item|
			if i_item.Item_id == item_id
				item_quantity += i_item.quantity
			end
		end

		item_quantity
	end

	helper_method :inCart?

	private

	def loadCommonResources
		@items_list = Item.all();
	end

	def loadUserResources
		loadUserCart
	end

	def loadUserCart
		if current_user.Cart_id.nil?
			@cart = Cart.create(User_id: current_user.id, total: 0)
			current_user.update(Cart_id: @cart.id)
		else
			@cart = Cart.find(current_user.Cart_id)
		end
		@cart_data = Cart.getItems(@cart.id)
		@cart_items = @cart_data[0]
		@cart_items_spec = @cart_data[1]
		@cart_quantity = @cart_data[2]
	end
end
