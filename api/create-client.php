<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');


    include_once '../config/Database.php';
    include_once '../config/client-id.php';

    $database = new Database();
    $db = $database->connect();

    // Post Object
    $post_id = new Post_Id($db);

    $data = json_decode(file_get_contents("php://input"));

    $post_id->client_id = $data->client_id;
    $post_id->playWith = $data->playWith;

    if($post_id->insert_client()){
        echo json_encode(array('massage' => 'Post Created'));
    }else{
        echo json_encode(array('massage' => 'Post Not Created'));
    }