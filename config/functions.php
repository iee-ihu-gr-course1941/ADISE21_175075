<?php

    class Post_Id{
        // DB
        private $conn;
        private $table = 'clients';
        // Post Properties
        public $id;
        public $time;
        public $state;
        public $client_id;
        public $playWith;
        public $game_id;
        public $client_1;
        public $client_2;
        public $isOver;
        public $turn;
        public $num_rows;
        // Constructor with DB

        public function __construct($db)
        {
            $this-> conn = $db;
        }
        // Get
        public function readAll(){
            $query = 'SELECT * FROM clients';
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            
            return $stmt;
        }
        public function readClient(){
            $query = 'SELECT * FROM clients WHERE client_id = ?';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $this->client_id);
            $stmt->execute();

            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            $this->id = $row['id'];
            $this->time = $row['time'];
            $this->state = $row['state'];
            $this->clint_id = $row['client_id'];
            $this->playWith = $row['playWith'];
        }

        public function insert_client(){
            $query = 'INSERT INTO ' . $this->table . ' SET client_id = :client_id, playWith = :playWith';

            $stmt = $this->conn->prepare($query);

            $this->client_id = htmlspecialchars(strip_tags($this->client_id));

            $stmt->bindParam(':client_id', $this->client_id);
            $stmt->bindParam(':playWith', $this->playWith);

            if($stmt->execute()){
                return true;
            }
            printf("Error: %s.\n", $stmt->error);
            return false;
        }

        public function createGame(){
            $query = 'INSERT INTO game SET game_id = :game_id, client_1 = :client_1';

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':game_id', $this->game_id);
            $stmt->bindParam(':client_1', $this->client_1);

            if($stmt->execute()){
                return true;
            }
            printf("Error: %s.\n", $stmt->error);
            return false;
            
        }

        public function isGameExist(){
            $query = 'SELECT * FROM game';
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            
            return $stmt;

        }

        public function updateGame(){
            $query = 'UPDATE game SET client_2 = :client_2 WHERE game_id = :game_id';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':game_id', $this->game_id);
            $stmt->bindParam(':client_2', $this->client_2);
            if($stmt->execute()){
                return true;
            }
            printf("Error: %s.\n", $stmt->error);
                return false;    
            }
            
        public function isGameReady(){
            $query = 'SELECT * FROM game WHERE game_id = :game_id';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':game_id', $this->game_id);
            if($stmt->execute()){
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                return  $this->client_2 = $row['client_2'];
            }
            printf("Error: %s.\n", $stmt->error);
                return false;    
            }
            
                
    }
?>