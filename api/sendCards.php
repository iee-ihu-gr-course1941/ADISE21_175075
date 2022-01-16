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

    $result = $post_id->getCards();

    $num = $result->rowcOUNT();

    if($num > 0){
        $posts_arr = [];

        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $post_item = $card;

            array_push($posts_arr, $post_item);
        }

        echo json_encode($posts_arr);
    }else{
        echo json_encode(array('massage' => 'no data'));
    }
?>