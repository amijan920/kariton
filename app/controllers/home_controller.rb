class HomeController < ApplicationController
	#before_action :authenticate_user!
	
	def index
		@users = Item.all();
	end
end
