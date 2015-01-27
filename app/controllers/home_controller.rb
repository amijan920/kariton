class HomeController < ApplicationController
	#before_action :authenticate_user!
	
	def index
		@items_list = Item.all();
	end
end
