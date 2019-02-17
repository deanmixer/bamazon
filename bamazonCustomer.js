const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'rootroot5',
  database: 'bamazon'
});

let possibleItemIds = [];
let selectedId = 0;
 
connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId + "\n");
    readProducts();
  });
  
function readProducts() {
  connection.query("SELECT * FROM products WHERE `stock_quantity` > 0", function(err, res) {
    if (err) throw err;
    console.log(" ");
    console.log(" ");
    console.log(" ");
    console.log(" ");
    console.log("In West Philadelphia Born & Raised: A Will Smith Store")
    console.log("-----------------------------------");
    if (res.length == 0) {
      console.log("Sorry, all sold out! Will Smith is so hot right now. Check back in the summertime?");
      console.log(" ");
      console.log(" ");
      connection.end();
    } else {
        console.log("We made a very bad business decision and now have way too much Will Smith stuff. Please buy some of it.")
        console.log("-----------------------------------");
        console.log("Item # | Department | Product | Price");
        for (let i = 0; i < res.length; i++) {
          console.log(res[i].item_id + " | " + res[i].department_name +  " | " + res[i].product_name + " | " + res[i].price);
          possibleItemIds.push(res[i].item_id);
        }
        console.log("-----------------------------------");
        pleaseBuy();
      }
  });
}

function pleaseBuy() {
  inquirer
    .prompt({
      name: "pickItem",
      type: "input",
      message: "Please enter the item ID of the product you'd like to buy:",
      validate: function(value) {
        if (possibleItemIds.indexOf(parseInt(value)) > -1) {
          return true;
        } return false;
      }
    })
    .then(function(answer){
      selectedId = answer.pickItem;
      quantitySelect()
    });
        // connection.end();
};

function quantitySelect() {
  connection.query("SELECT * FROM products WHERE ?", [{item_id: selectedId}], function(err, res) {
    if (err) throw err;
    inquirer
    .prompt({
      name: "quantity",
      type: "input",
      message: "You've selected " + res[0].product_name + ". We have " + res[0].stock_quantity + " in stock. How many would you like to order?",
      validate: function(value) {
        if (parseInt( value ) == value && value > 0) {
          return true;
        } return false;
      }
    })
    .then(function(answer) {
      if (answer.quantity > res[0].stock_quantity) {
        console.log("Go shop somewhere else, moron. We just told you we don't have that many!");
        connection.end();
      } else {
          let newQuantity = res[0].stock_quantity - answer.quantity
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: newQuantity
              },
              {
                item_id: selectedId
              }
            ],
            function(error) {
              if (error) throw err;
              // let cartTotal = Math.round(((answer.quantity * res[0].price) + 0.00001) * 100) / 100;
              let cartTotal = (answer.quantity * res[0].price).toFixed(2);
              console.log("Your total is $" + cartTotal + ". You'll be gettin' jiggy wit it in no time!");
              connection.end();
            }
          )
        };
    });
  });
};

  // for (let i = 0; i < res.length; i++) {
  //   console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price);
  //   possibleItemIds.push(res[i].item_id);
  // }