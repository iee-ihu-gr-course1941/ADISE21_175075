<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../config/Database.php';
    include_once '../config/functions.php';

    
    $database = new Database();
    $db = $database->connect();

    // Post Object
    $post_id = new Post_Id($db);

    //Get ID
    $post_id->client_id = isset($_GET['client_id']) ? $_GET['client_id'] : die();

    $post_id->readClient();
    
    $post_arr = array(
        'id' => $post_id->id,
        'time' => $post_id->time,
        'state' => $post_id->state,
        'client_id' => $post_id->client_id
    );

    print_r(json_encode($post_arr));
?>