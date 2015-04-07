<?php
//we make an instance of a class to create an object
class Database {
	private $connection;
	private $host;
	private $username;
	private $password;
	private $Database;
	public $error; 
	//its public because we need it to be accessed wherever in any file
	//msqli needs a constuctor function, so now wee
	public function __construct($host, $username, $password, $database) {
		$this->host= $host;
		$this->username = $username;
		$this->password = $password;
		$this->database = $database;

$this->connection = new mysqli($host, $username, $password);

if($this->connection->connect_error) {
//checks whether or not if there was an error
//connection to the database
die("<p>error: " . $this->connection->connect_error . "</p>");

}
//selects the database i have in database.php
$exists = $this->connection->select_db($database);
                   //this is a function, 
                   //tries to access a database that exists on my mysqli server

if(!$exists) {
//a command.
$query = $this->connection->query("CREATE DATABASE $database");
//outputs message
if($query) {
	echo "<p>successfully created database" . $database . "</p>";
}
}
//will be executed when we have a database that exists
else {
echo "<p>Database already exists.</p>";
}
}

	//opening a connection to the database
	public function openConnection() {
		$this->connection = new mysqli($this->host, $this->username, $this->password, $this->database);
	
	if($this->connection->connect_error) {
	//checks whether or not if there was an error
	//connection to the database		
		die("<p>error: " . $connection->connect_error . "</p>");
	}
	}

	//closing a connection to the database
	public function closeConection() {
		//isset checks whether or not the variable has been set or not.
		if(isset ($this->connection)) {
			$this->connection->close();
		}

	}
	//creates a query
	public function query($string) {
		//calls on on an openConnection functionwhich runs the lines of code in it 
		//basically, we opened the connection
		$this->openConnection();

		//queried the database
		$query = $this->connection->query($string);
		//checks whether or not the query is false
		if(!$query) {
			$this->error = $this->connection->error;
		}

		$this->closeConection();

		return $query;
	}
}