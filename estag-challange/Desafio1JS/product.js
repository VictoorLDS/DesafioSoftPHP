const url = 'http://localhost/routes/products.php'
const urlcat = 'http://localhost/routes/categories.php'
const prodForm = document.getElementById("prod-form")
const getProducts = fetch(url).then((res) => { return res.json(); });
const getCategory = fetch(urlcat).then((res) => { return res.json(); });
const productList = document.getElementById("prod-list")
const categoriesInput = document.getElementById("cat-prod-select")

async function selectCategories(){
    const categories = await getCategory
    JSON.parse(categories).forEach((item)=>{
        categoriesInput.innerHTML += `<option value="${item.code}">${item.name}</option>`
    })
}

selectCategories()

function createProduct(){
    prodForm.addEventListener("submit", async event=>{
    event.preventDefault()
    const data = new FormData(prodForm)
    try{
        const res = await fetch(url,{
            method: "POST",
            body: data
        },
        window.location.reload()
        )
    } catch(error){
        console.log(error.message)
    }
    })
}

async function deleteProd(code){
    console.log(code)
    await fetch(`http://localhost/routes/products.php?code=${code}`,{
        method: "DELETE",
    })
    window.location.reload()
    showList()
}

 async function showList(){
    const readProduct = await getProducts
    const dbProducts = JSON.parse(readProduct)
    console.log(dbProducts)
    productList.innerHTML = ""
    dbProducts.forEach(product => {const tr = document.createElement("tr")
    tr.innerHTML = `
    <tr>
    <td>${product.code}</td>
    <td>${product.name}</td>
    <td>${product.amount}</td>
    <td>${product.price}</td>
    <td>${product.category_name}</td>
    <td><button class="deletebutton" onclick="deleteProd(${product.code})">Delete</button></td>
    </tr>
    `
    productList.appendChild(tr)
})
}
/* <td><button onclick="deleteProduct(${index})"class="deletebutton">Delete</button></td>*/
 showList() 
