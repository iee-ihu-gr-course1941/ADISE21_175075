<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/jsom');

    include_once '../config/Database.php';
    include_once '../config/client-id.php';

    
    $database = new Database();
    $db = $database->connect();

    // Post Object
    $post_id = new Post_Id($db);

    $result = $post_id->read();

    $num = $result->rowcOUNT();

    if($num > 0){
        $posts_arr = array();
        $posts_arr['data'] = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $post_item = array(
                'id' => $id,
                "time" => $time,
                "inGame" => $inGame
            );

            array_push($posts_arr['data'], $post_item);
        }

        echo json_encode($posts_arr);
    }else{
        echo json_encode(array('massage' => 'no data'));
    }
?>