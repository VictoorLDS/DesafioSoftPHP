<?php
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: GET, POST, DELETE");
    header("Access-Control-Allow-Origin: *");
    include_once("../index.php");
    include_once("../services/products.php");

    function getOrderItem(){
        $orderItem = myPDO->query("SELECT * FROM ORDER_ITEM");
        $dataOrderItem = $orderItem->fetchALL();
        return json_encode($dataOrderItem);
    }

    function postOrderItem($order_code, $product_code, $amount, $price, $tax){
        $addOrderItem = myPDO->prepare("INSERT INTO 
        order_item (order_code,
         product_code,
          amount,
           price,
            tax)
             VALUES ('{$order_code}',
              {$product_code},
               {$amount},
                {$price},
                 {$tax})");
        $addOrderItem->execute();
        updateAmount($amount, $product_code);

    }

    function deleteOrderItem($code){
        $deleteOrderItem = myPDO->prepare("DELETE FROM order_item where CODE = {$code}");
        $deleteOrderItem->execute();
        return "Category deleted";
    }

    ?>