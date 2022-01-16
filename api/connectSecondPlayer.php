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
    $post_id->client_2 = $data->client_2;

    if($post_id->updateGame()){
        echo json_encode(array('massage' => 'connected'));
    }else{
        echo json_encode(array('massage' => 'waiting for seccond player'));
    }