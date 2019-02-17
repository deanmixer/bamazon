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
    start();
  });


function start() {
inquirer
    .prompt({
    name: "managerChoice",
    type: "list",
    message: "What would you like to do?",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"]
    })
    .then(function(answer) {
    if (answer.managerChoice === "View Products for Sale") {
        viewProducts();
    }
    else if(answer.managerChoice === "View Low Inventory") {
        viewLowInv();
    } 
    else if(answer.managerChoice === "Add to Inventory") {
        addInv();
    } 
    else if(answer.managerChoice === "Add New Product") {
        addProduct();
    } else{
        connection.end();
    }
    });
}
  
function viewProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log("");
        console.log("");
        console.log("Item # | Department | Product | Price | Inventory");
        for (let i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].department_name +  " | " + res[i].product_name + " | " + res[i].price+ " | " + res[i].stock_quantity);
            possibleItemIds.push(res[i].item_id);
        }
        console.log("");
        console.log("");
        start()
    });
}

function viewLowInv() {
    connection.query("SELECT * FROM products WHERE `stock_quantity` < 10", function(err, res) {
        if (err) throw err;
        console.log("");
        console.log("");
        console.log("Fewer than 10 in stock:")  
        console.log("-----------------------------------");
        console.log("Item # | Department | Product | Price | Inventory");
        for (let i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].department_name +  " | " + res[i].product_name + " | " + res[i].price+ " | " + res[i].stock_quantity);
        }
        console.log("");
        console.log("");
        // connection.end();
        start()
    });
}

function addInv() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log("");
        console.log("");
        console.log("Item # | Department | Product | Price | Inventory");
        for (let i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].department_name +  " | " + res[i].product_name + " | " + res[i].price+ " | " + res[i].stock_quantity);
            possibleItemIds.push(res[i].item_id);
        }
        console.log("");
        console.log("");
        inquirer
            .prompt({
                name: "pickItem",
                type: "input",
                message: "Which item would you like to restock?",
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
    });
}

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
        let newQuantity = parseInt(res[0].stock_quantity) + parseInt(answer.quantity)
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
                console.log("There are now " + newQuantity + " in stock.");
                console.log("");
                start();
            }
        )
    });
});
};

function addProduct() {
    inquirer
      .prompt([
        {
          name: "prodName",
          type: "input",
          message: "Product Name"
        },
        {
          name: "prodDep",
          type: "input",
          message: "Product Department"
        },
        {
        name: "price",
        type: "input",
        message: "Price",
        validate: function(value) {
        if ((isNaN(value) === false) && value > 0) {
            return true;
            }
            return false;
            }
            },
        {
        name: "quantity",
        type: "input",
        message: "Quantity",
        validate: function(value) {
            if (parseInt( value ) == value && value > 0) {
                return true;
            }
            return false;
            }
        }
      ])
      .then(function(answer) {
        connection.query(
          "INSERT INTO products SET ?",
          {
            product_name: answer.prodName,
            department_name: answer.prodDep,
            price: answer.price|| 0,
            stock_quantity: answer.quantity || 0
          },
          function(err) {
            if (err) throw err;
            console.log("Item added successfully!");
            console.log("");
            start();
          }
        );
      });
}