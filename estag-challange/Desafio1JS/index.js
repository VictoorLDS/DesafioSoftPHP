const urlprod = "http://localhost/routes/products.php";
const urlorderitem = "http://localhost/routes/order_item.php";
const urlorder = "http://localhost/routes/orders.php";
const indexForm = document.getElementById("index-form");
const getProducts = fetch(urlprod).then((res) => {
  return res.json();
});
const getOrderItem = fetch(urlorderitem).then((res) => {
  return res.json();
});
const getOrders = fetch(urlorder).then((res) => {
  return res.json();
});
const getCart = () => JSON.parse(localStorage.getItem("db_cart")) || [];
const setCart = (dbCart) =>
  localStorage.setItem("db_cart", JSON.stringify(dbCart));
const productInput = document.getElementById("prod-cart-select");
const cartList = document.getElementById("cart-list");
const totalCart = document.getElementById("total-cart");

const readCart = getCart();

async function selectProducts() {
  const products = await getProducts;
  JSON.parse(products).forEach((item) => {
    productInput.innerHTML += `<option value="${item.code}">${item.name}</option>`;
  });
}
selectProducts();

productInput.addEventListener("change", changeFormValues);

async function changeFormValues() {
  let dbProducts = await getProducts;
  const products = JSON.parse(dbProducts);

  const productName = document.getElementById("prod-cart-select").value;
  const productSelected = products.find((p) => p.code == productName);

  if (productSelected) {
    const taxedUnitPrice = productSelected.price * (productSelected.tax / 100);
    document.getElementById("c-tax").value = taxedUnitPrice.toFixed(2);
    document.getElementById("c-price").value = productSelected.price;
  }
}

function createCart(product) {
  const dbCart = readCart;
  dbCart.push(product);
  setCart(dbCart);
}

addToCart = async (e) => {
  e.preventDefault();
  let products = await getProducts;
  const dbProducts = JSON.parse(products);

  const productName = productInput.value;
  const selectedProduct = dbProducts.find(
    (product) => product.code == productName
  );

  const cartItem = {
    code: selectedProduct.code,
    name: selectedProduct.name,
    tax: document.getElementById("c-tax").value,
    amount: document.getElementById("c-amount").value,
    price: document.getElementById("c-price").value,
  };
  createCart(cartItem);
  showList();
};

function deleteCartItem(index) {
  const dbCart = readCart;
  dbCart.splice(index, 1);
  setCart(dbCart);
  showList();
}

function cancelCart() {
  const dbCart = readCart;
  dbCart.splice(0);
  setCart(dbCart);
  showList();
}

function objDataToFormData(obj) {

  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    console.error(key, value)
    formData.append(key, value);
  });
  return formData;
}

async function postOrder(orderData) {
  try {
    await fetch(urlorder, {
      method: "POST",
      body: orderData,
    }).then(async (res) => {
      console.log(await res.text())
    })
  } catch (error) {
    console.log(error.message);
  }
}

async function postOrderItem(orderItemData) {
  try {
    const res = await fetch(urlorderitem, {
      method: "POST",
      body: orderItemData,
    }).then(async (res) => {
      console.log(await res.text())
    })
  } catch (error) {
    console.log(error.message);
  }
}

async function createHistory() {
  const order = {
    code: Math.random().toString(16).slice(2),
    total: parseFloat((document.querySelector("#total-cart-price").innerText).replace("$", "")),
    tax: parseFloat((document.querySelector("#total-cart-tax").innerText).replace("$", "")),
  };
  console.log(order);
  const orderData = objDataToFormData(order);
  await postOrder(orderData);

  for (item of readCart) {
    const orderItem = {
      order_code: order.code,
      product_code: item.code,
      amount: item.amount,
      price: item.price,
      tax: item.tax,
    };

    let orderItemData = objDataToFormData(orderItem);
    console.log(orderItem)
    await postOrderItem(orderItemData);

  }
  cancelCart();
}

function showList() {
  cartList.innerHTML = "";
  let taxTotal = 0;
  let priceTotal = 0;

  readCart.forEach((cartItem, index) => {
    const tr = document.createElement("tr");
    const taxValueAccount = cartItem.amount * cartItem.tax;
    const totalAccount = cartItem.amount * cartItem.price;

    tr.innerHTML = `
  <tr>
      <td>${cartItem.name}</td>
      <td>${cartItem.price}</td>
      <td>${cartItem.amount}</td>
      <td>${totalAccount}</td>
      <td><button onclick="deleteCartItem(${index})" class="deletebutton">Delete</button></td>
        </tr>
  `;

    cartList.appendChild(tr);
    taxTotal += taxValueAccount;
    priceTotal += totalAccount + taxValueAccount;
  });
  totalCart.innerHTML = `
  <p><b>Tax:</b> <span id="total-cart-tax"> $${taxTotal.toFixed(2)}</span></p>
  <p><b>Total:</b> <span id="total-cart-price">$${priceTotal.toFixed(2)}</span></p>
  <button class="buttoncancel" onclick="cancelCart()" id="button-cancel"><b>Cancel</b></button>
  <button class="buttonfinish" onclick="createHistory()" id="button-finish">Finish</button>
  `;
}
showList();

const addButton = document.getElementById("btn-add-cart");
addButton.addEventListener("click", addToCart);
