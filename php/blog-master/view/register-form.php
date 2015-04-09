<?php
//gives me access to this path variable
require_once(__DIR__ . "/../model/config.php");
?>


<h1 class="register">Register</h1>

<form method="post" action="<?php echo $path . "controller/create-user.php"; ?>">
<!-- giving the ability to sign up -->
<div class="email">
 <p><input type="text" class="form-control" placeholder="Email"></p>
</div>

<div class="username">
<p><input type="text" class="form-control" placeholder="username"></p>
</div>

<div class="password">
    <p><input type="password" class="form-control" placeholder="Password"></p>
</div>

<div>
	 <input type="submit" value="submit"/>
</div>
</form>

