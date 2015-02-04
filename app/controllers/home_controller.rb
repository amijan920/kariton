class HomeController < ApplicationController
	before_action :authenticate_user!, except: [:index]
	
	def index
		loadCommonResources

		if user_signed_in?
			loadUserResources
		end
	end

	def cartHistory
		loadCommonResources
		loadUserResources

		@cart_hist = true
		@cart_history = Cart.getHistory(current_user.id)
	end

	def addItemToCart
		loadUserResources
		Cart.addItem(@cart.id, params[:itemId], params[:item][:quantity].to_i)
		
		@tester = params[:item_quantity].to_i;
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

	def clearCart
		loadUserResources
		Cart.clearCart(@cart.id)

		loadUserCart
		loadCommonResources
		render :index
	end

	def checkoutView
		loadUserResources
	end

	def checkoutCart
		loadUserResources
		Cart.checkout(@cart.id)

		current_user.reload()
		
		loadUserCart
		loadCommonResources
		render :index
	end

	def getItem(item_id)
		return Item.find(item_id)
	end

	def inCart?(item_id) 
		item_quantity = 0
		cart_item_id = 0;
		@cart_items.each do |i_item|
			if i_item.Item_id == item_id
				item_quantity += i_item.quantity
				cart_item_id = i_item.id
				break
			end
		end
		return item_quantity, cart_item_id
	end

	helper_method :inCart?, :getItem

	private

	def loadCommonResources
		@items_list = Item.order('id').all;
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
