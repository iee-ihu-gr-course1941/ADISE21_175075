<?php

    class Post_Id{
        // DB
        private $conn;
        private $table = 'clients';
        // Post Properties
        public $id;
        public $time;
        public $inGame;
        
        // Constructor with DB

        public function __construct($db)
        {
            $this-> conn = $db;
        }
        // Get
        public function read(){
            $query = 'SELECT * FROM clients';
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            
            return $stmt;
        }
    }
?>