# bamazon
CLI product inventory app - uses Node.js & MySQL to manage inventory for a faux online retailer.

For a video demostration, please click here:
https://youtu.be/_wWvR2qezGk

App contains two separate modules:

1. Customer interface (bamazonCustomer.js)
This allows the customer to view all products and prices, select an item to buy, a quantity, and then receive a total invoice. Includes validation to ensure the user is only entering valid product numbers, quantities, and does not order more than the current inventory in stock.

2. Manager interface (bamazonManager.js)
