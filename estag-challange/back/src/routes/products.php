<?php
include("../services/products.php");


function requestProducts()
{
    $method = $_SERVER["REQUEST_METHOD"];

    if($method === "GET"){
        $dataProducts = getProducts();
        echo json_encode($dataProducts);
    }
    if($method === "POST"){
        $name = filter_input(INPUT_POST, "name", FILTER_SANITIZE_SPECIAL_CHARS);
        $price = $_POST["price"];
        $amount = filter_input(INPUT_POST, "amount", FILTER_SANITIZE_NUMBER_INT);
        $category = $_POST["category"];
        $addProducts = postProducts($name, $price, $amount, $category);
        echo $addProducts;
    }
    if($method === "DELETE"){
        $Delete = $_GET["code"];
        $deleteProduct = deleteCategories($Delete);
        echo $deleteProduct;
    }
}
requestProducts();
?>