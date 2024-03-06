const urlorderitem = "http://localhost/routes/order_item.php";
const urlorder = "http://localhost/routes/orders.php";
const histList = document.getElementById("hist-list")
const detailList = document.getElementById("hist-details-list")

const getOrderItem = fetch(urlorderitem).then((res) => {
  return res.json();
});

const getOrders = fetch(urlorder).then((res) => {
  return res.json();
});

async function showList() {
  readOrders = await getOrders
  dbOrders = JSON.parse(readOrders)
  histList.innerHTML = "";

  dbOrders.forEach((Order) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
  <tr>
      <td>${Order.code}</td>
      <td>${Order.tax}</td>
      <td>${Order.total}</td>
      <td><button onclick={showSaleDetails("${Order.code}")}>View Details</button></td>
        </tr>
  `;

    histList.appendChild(tr);
  });
}
showList();

async function showSaleDetails(code){
  readOrderItem = await getOrderItem
  dbOrderItem = JSON.parse(readOrderItem)
  const filterOrderItem = dbOrderItem.filter(i => i.order_code == code)
  detailList.innerHTML = "";
  
  filterOrderItem.forEach((OrderItem) => {
    const tr = document.createElement("tr");
    tr.innerHTML = 
    `
    <tr>
    <td>${OrderItem.order_code}</td>
    <td>${OrderItem.product_code}</td>
    <td>${OrderItem.price}</td>
    <td>${OrderItem.amount}</td>
    <td>${OrderItem.tax}</td>
      </tr>
      `;
      detailList.appendChild(tr);

  })
}


 