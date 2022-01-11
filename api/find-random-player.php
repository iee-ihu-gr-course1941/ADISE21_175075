<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../config/Database.php';
    include_once '../config/client-id.php';

    
    $database = new Database();
    $db = $database->connect();

    // Post Object
    $post_id = new Post_Id($db);

    //Get ID
    $post_id->searchRandomPlayer();

    $post_arr = array(
        'client_id' => $post_id->client_id
    );

    print_r(json_encode($post_arr));
?>