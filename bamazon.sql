DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
-- 	item_id INT(3) ZEROFILL NOT NULL AUTO_INCREMENT,
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
	department_name VARCHAR(255) NOT NULL,
    price DECIMAL(7,2),
    stock_quantity INT(6) NOT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products
	(product_name, department_name, price, stock_quantity)
VALUES 
	("Men in Black II", "Movies & TV", 9.99, 1500),
	("Big Willie Style", "Music", 6.99, 5000),
	("Will Smith Celebrity Mask", "Apparel", 49.99, 15),
	("Bagger Vance Inspirational Quotes Wall Poster", "Home Decor", 19.99, 50),
	("Carlton's Corner: Stories from Behind the Scenes of Fresh Prince", "Books", 2.75, 100),
	("Bad Boys II: The Official Audiobook of the Movie", "Music", 49.99, 300),
	("Hitch Cologne", "Beauty", 149.99, 9),
	("Deadshot Adult Halloween Costume", "Apparel", 39.99, 28),
	("Will Smith: How To Be Successful in Life", "Books", 6.99, 7000),
	("Will Smith & Kevin Kline Signed Photo", "Collectibles", 4599.99, 4000);