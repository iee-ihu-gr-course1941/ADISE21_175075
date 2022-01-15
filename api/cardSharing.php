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

    $cards = Deck::cards();

    $array = $post_id->shareCards();
    $client_1 = $array['client_1'];
    $client_2 = $array['client_2'];

    for($i = 0; $i < count($cards); $i++){
        if($i%2 == 0){
            $query = "INSERT INTO cards SET 
                        card = '$cards[$i]', 
                        client_id = '$client_1'";

            $stmt = $db ->prepare($query);
            $stmt->execute();
        }else{
            $query = "INSERT INTO cards SET 
                        card = '$cards[$i]', 
                        client_id = '$client_2'";
            $stmt = $db ->prepare($query);
            $stmt->execute();
        }
    }

    echo json_encode(array('cards' => 'shared'));