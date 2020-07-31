<?php
session_start();

require 'bdd.php';

if(isset($_POST['user']) && isset($_POST['password'])){
    $login = $_POST['user'];
    $password = $_POST['password'];

    $check_login = $bdd -> prepare('SELECT * FROM admin WHERE user = :login');
    $check_login -> execute(array('login' => $login));
    $donnee = $check_login -> fetch();

    // Check hash password
    if(password_verify($password, $donnee['password'])){
        $_SESSION['admin'] = true;
        $_SESSION['user'] = $donnee['user'];
        header('Location: ../index.php');
    }
    else{
        $_SESSION['admin'] = false;
        header('Location: ../login.php');
    }
    
    $check_login -> closeCursor();  
}
if(isset($_POST['log_out'])){
    session_destroy();
}
