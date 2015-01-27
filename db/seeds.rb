# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Item.create(name: "Bamboo Money Box", description: "A money box made exquisitely of bamboo perfect for saving money.", price:300.00, stock:54, image:"items/bamboo-money-box.jpg")

Item.create(name: "Abaca Slippers", description: "Slippers made of pure Abaca. Designed by our world famous designer, Juliana Santada.", price:498.00, stock:102, image:"items/abaca.jpg")

Item.create(name: "Narra Table", description: "A designer table made from one of the strongest wood in the Philippines, the Narra. Burnished and topped with tampered glass.", price:23000, stock:13, image:"items/narra-table.jpg")

Item.create(name: "Bamboo Chair", description: "A chair made of bamboo. It's just the right item to make any house look native.", price:2499, stock:43, image:"items/bamboo-chair.png")