<?php 
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: GET, POST, DELETE");
    header("Access-Control-Allow-Origin: *");
    include_once("../index.php");

    function getProducts(){
        $products = myPDO->query("SELECT products.*,categories.tax as tax, categories.name as category_name FROM products JOIN categories ON products.category_code = categories.code");
        $dataproducts = $products->fetchALL();
        return json_encode($dataproducts);
    }
    function postProducts($name, $price, $amount, $category){
            $addProducts = myPDO->prepare("INSERT INTO products ( name , price, amount, category_code) VALUES ('{$name}', {$price}, {$amount}, {$category})");
            $addProducts->execute();
        }
    function deleteCategories($code){
            $deleteProduct = myPDO->prepare("DELETE FROM products where CODE = {$code}");
            $deleteProduct->execute();
            return "Product deleted";
        }
     function getProductById($code){
        $getProduct = myPDO -> query("SELECT products.*, categories.tax as tax
        FROM products INNER JOIN categories ON products.category_code = categories.code WHERE products.CODE = {$code}");
        $productData = $getProduct -> fetch();
        return $productData;
    }
    function updateAmount($amount, $code){
        $product = getProductById($code);
        $newAmount = $product["amount"] - $amount;
        $updateProduct = myPDO -> prepare("UPDATE PRODUCTS SET AMOUNT = {$newAmount} WHERE CODE = {$code}");
        $updateProduct -> execute();
    } 
?>