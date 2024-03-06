const url = 'http://localhost/routes/categories.php'
const catForm = document.getElementById("category-form")
const categoriesList = document.getElementById("categories-list")
const getCategories = fetch(url).then((res) => { return res.json(); });


/* const deleteCategory = (index) => {
    const dbCategories = readCategories()
    dbCategories.splice(index,1)
    setCategories(dbCategories)
    showList()
}
 */

function createCategory() {
    catForm.addEventListener("submit", async event=>{
    event.preventDefault()
    const data = new FormData(catForm)
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

async function deleteCat(code){
    console.log(code)
    await fetch(`http://localhost/routes/categories.php?code=${code}`,{
        method: "DELETE",
    })
    window.location.reload()
    showList()
}

async function showList(){
    const readCategories = await getCategories
    const dbCategories = JSON.parse(readCategories)
    console.log(dbCategories)
    
    categoriesList.innerHTML = ""

    dbCategories.forEach(category => {const tr = document.createElement("tr")
    tr.innerHTML = `
    <tr>
    <td>${category.code}</td>
    <td>${category.name}</td>
    <td>${category.tax}%</td>
    <td><button class="deletebutton" onclick="deleteCat(${category.code})">Delete</button></td>
    </tr>
    `
    categoriesList.appendChild(tr)
})
}
// {/* <td><button onclick="deleteCategory(${index})"class="deletebutton">Delete</button></td> */}

showList()  
 