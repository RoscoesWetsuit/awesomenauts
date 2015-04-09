<?php
require_once(__DIR__ . "/../model/config.php");

	$query = $_SESSION["connection"]->query("CREATE TABLE posts ("
		//the id is an interger
		. "id int(11) NOT NULL AUTO_INCREMENT, "
		//title of my post
		. "TITLE VARCHAR(255) NOT NULL,"
		//the text that will be in our post
		. "post text NOT NULL,"
		. "DateTime datetime NOT NULL,"
		//the way tables are connected to eachother
		. "PRIMARY KEY (id) )");
	    //NOTHING SHOULD BE NULL
    
    //says if our table was succcessfully created or not
	if($query) {
		//what it says if it was successfull
		echo "successfully created table: posts";
	}
	else {
		echo "<p>" . $_SESSION["connection"]->error . "</p>";
	}

	$query = $_SESSION["connection"]->query("CREATE TABLE users ("
		. "id int(11) NOT NULL AUTO_INCREMENT,"
		. "username varchar(30) NOT NULL,"
		. "email varchar(50) NOT NULL,"
		. "password char(128) NOT NULL,"
		. "salt char(128) NOT NULL,"
		. "primary key (id))");

if($query){
	echo "<p>Successfully created table; users</p>";
}
else {
	echo "<p>" . $_SESSION["connection"]->error . "</p>"; 
}
