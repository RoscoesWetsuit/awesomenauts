<?php
require_once(__DIR__ . "/database.php");
//preserves information so that we dont have to create this information,
session_start();
//maintains the same session id
session_regenerate_id(true);

$path = "/awesomenauts/php/";

$host = "localhost";
$username = "root";
$database = "awesomenauts_db";
$password = "root";
if(!isset($_SESSION["connection"])) {
	//gonna help me query on the database
	$connection = new Database($host, $username, $password, $database);
	$_SESSION["connection"] = $connection;
}