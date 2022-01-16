<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');


    include_once '../config/Database.php';
    include_once '../config/functions.php';
    include_once '../config/createDeck.php';

    $database = new Database();
    $db = $database->connect();

    // Post Object
    $post_id = new Post_Id($db);

    $data = json_decode(file_get_contents("php://input"));

    $post_id->game_id = $data->game_id;

    $deck = array(
        array('H', '1'),
        array('H', '2'),
        array('H', '3'),
        array('H', '4'),
        array('H', '5'),
        array('H', '6'),
        array('H', '7'),
        array('H', '8'),
        array('H', '9'),
        array('H', '10'),
        array('S', '1'),
        array('S', '2'),
        array('S', '3'),
        array('S', '4'),
        array('S', '5'),
        array('S', '6'),
        array('S', '7'),
        array('S', '8'),
        array('S', '9'),
        array('S', '10'),
        array('D', '1'),
        array('D', '2'),
        array('D', '3'),
        array('D', '4'),
        array('D', '5'),
        array('D', '6'),
        array('D', '7'),
        array('D', '8'),
        array('D', '9'),
        array('D', '10'),
        array('C', '1'),
        array('C', '2'),
        array('C', '3'),
        array('C', '4'),
        array('C', '5'),
        array('C', '6'),
        array('C', '7'),
        array('C', '8'),
        array('C', '9'),
        array('C', '10'),
        array('S', '11')
      );
    
    shuffle($deck);
    shuffle($deck);
    shuffle($deck);
    
    $array = $post_id->shareCards();

    $client_1 = $array['client_1'];
    $client_2 = $array['client_2'];

    for($i = 0; $i < 41; $i++){
        if($i%2 == 0){
            $suit = $deck[$i][0];
            $num = $deck[$i][1];
            $query = "INSERT INTO cards SET 
                num = '$num', suit = '$suit',
                client_id = '$client_1', game_id = '$post_id->game_id'";

            $stmt = $db ->prepare($query);
            $stmt->execute();
        }else{
            $suit = $deck[$i][0];
            $num = $deck[$i][1];
            $query = "INSERT INTO cards SET 
                num = '$num', suit = '$suit',
                client_id = '$client_2', game_id = '$post_id->game_id'";
            $stmt = $db ->prepare($query);
            $stmt->execute();
        }
    }

    echo json_encode(array('message' => 'shared'));