<?php
include("../services/categories.php");

function requestCategory()
{
    $method = $_SERVER["REQUEST_METHOD"];

    if($method === "GET"){
        $dataCategories = getCategories();
        echo json_encode($dataCategories);
    }
    if($method === "POST"){
        $name = filter_input(INPUT_POST, "name", FILTER_SANITIZE_SPECIAL_CHARS);
        $tax = filter_input(INPUT_POST, "tax", FILTER_SANITIZE_NUMBER_INT);
        $addCategories = postCategories($name, $tax);
        echo $addCategories;
    }
    if($method === "DELETE"){
        $Delete = $_GET["code"];
        $deleteCategories = deleteCategories($Delete);
        echo $deleteCategories;
    }
}
requestCategory();
?>