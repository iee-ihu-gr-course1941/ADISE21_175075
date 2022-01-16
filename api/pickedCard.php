<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');


    include_once '../config/Database.php';
    include_once '../config/functions.php';

    
    $database = new Database();
    $db = $database->connect();

    // Post Object
    $post_id = new Post_Id($db);

    $data = json_decode(file_get_contents("php://input"));

    $post_id->game_id = $data->game_id;
    $post_id->client_id = $data->client_id;
    $post_id->value = $data->value;

    $post_id->pickedCard();

    echo json_encode($post_item = array(
        "num" => $num,
        "suit" => $suit,
    ));
?>