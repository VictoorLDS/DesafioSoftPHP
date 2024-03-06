<?php
include("../services/order_item.php");

    $method = $_SERVER["REQUEST_METHOD"];

    if($method === "GET"){
        $dataOrderItem = getOrderItem();
        echo json_encode($dataOrderItem);
    }

    if($method === "POST"){
        $order_code = $_POST["order_code"];
        $product_code = $_POST["product_code"];
        $amount = filter_input(INPUT_POST, "amount", FILTER_SANITIZE_NUMBER_INT);
        $price = filter_input(INPUT_POST, "price", FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
        $tax = filter_input(INPUT_POST, "tax", FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
        $addOrderItem = postOrderItem($order_code, $product_code, $amount, $price, $tax);
        echo $addOrderItem;
    }
    if($method === "DELETE"){
        $delete = $_GET["code"];
        $deleteOrderItem = deleteOrderItem($delete);
        echo $deleteOrderItem;
    }
?>