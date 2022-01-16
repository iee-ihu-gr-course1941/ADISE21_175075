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

    $post_id->client_id = $data->client_id;
    $post_id->game_id = $data->game_id;

    $data = json_decode(file_get_contents("php://input"));

    $post_id->game_id = $data->game_id;
    $post_id->client_id = $data->client_id;
    $post_id->num = $data->num;
    $post_id->suit = $data->suit;

    if($post_id->updateCard()){
        echo json_encode(array('massage' => 'card updated'));
    }else{
        echo json_encode(array('massage' => 'card did not updated'));
    }
?>