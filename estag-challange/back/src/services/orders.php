<?php
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: GET, POST, DELETE");
    header("Access-Control-Allow-Origin: *");
    include("../index.php");

    function getOrder(){
        $orders = myPDO->query("SELECT * FROM orders");
        $dataOrders = $orders->fetchALL();
        return json_encode($dataOrders);
    }

    function postOrder($code, $total, $tax){
        $addOrder = myPDO->prepare("INSERT INTO orders (code, total , tax) VALUES ('$code', $total, $tax)");
        $addOrder->execute();
    }
    
    function deleteOrder($code){
        $deleteOrder = myPDO->prepare("DELETE FROM orders WHERE code = {$code}");
        $deleteOrder->execute();
        return "Order Deleted";
    }
?>