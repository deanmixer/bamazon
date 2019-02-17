# bamazon
CLI product inventory app - uses Node.js & MySQL to manage inventory for a faux online retailer.

For a video demostration, please click here:
https://youtu.be/_wWvR2qezGk

App contains two separate modules:

1. Customer interface (bamazonCustomer.js)
This allows the customer to view all products and prices, select an item and quantity to buy, and then receive a total invoice. Includes validation to ensure the user is only entering valid product numbers and quantities. Also prevents the user from ordering more than the current inventory in stock.

2. Manager interface (bamazonManager.js)
Allows a corporate bigwig to view all current inventory/pricing/stock levels, check to see which items are low inventory (<10 in stock), restock items, and add new items. 
