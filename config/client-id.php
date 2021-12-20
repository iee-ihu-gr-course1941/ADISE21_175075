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
        }

        public function insert_client(){
            $query = 'INSERT INTO ' . $this->table . ' SET client_id = :client_id';

            $stmt = $this->conn->prepare($query);

            $this->client_id = htmlspecialchars(strip_tags($this->client_id));

            $stmt->bindParam(':client_id', $this->client_id);

            if($stmt->execute()){
                return true;
            }
            printf("Error: %s.\n", $stmt->error);
            return false;
        }
    }
?>