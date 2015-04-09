<?php
//lets us insert info from our database
require_once(__DIR__ . "/../model/config.php");

//filters through title to make sure there is no hacks
$title = filter_input(INPUT_POST, "title", FILTER_SANITIZE_STRING);
//same thing but through posts
$post = filter_input(INPUT_POST, "post", FILTER_SANITIZE_STRING);
//this query is to insert things into our table
//updated to session variables
$date = new DateTime('today');
$time = new DateTime('America/Los_Angeles');
$query = $_SESSION["connection"]->query("INSERT INTO posts SET title = '$title', post = '$post'");

if($query) {
	echo "<p>Successfully inserted post: $title</p>";
	echo "Posted on: " . $date->format("m/d/y") . "at " . $time->format("g:i");
}
else {
	echo "<p>" . $_SESSION["connection"]->error . "</p>";
}
