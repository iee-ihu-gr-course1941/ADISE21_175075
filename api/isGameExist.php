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

    $result = $post_id->isGameExist();

    $num = $result->rowcOUNT();

    if($num > 0){
        $posts_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $post_item = array(
                'game' => $game_id,
            );

            array_push($posts_arr, $post_item);
        }

        echo json_encode($posts_arr);
    }else{
        echo json_encode(array('massage' => 'no data'));
    }
?>