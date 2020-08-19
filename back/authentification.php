<?php
session_start();

require 'bdd.php';

$ok = true;
$messages = array();

if (!isset($_POST['user']) || empty($_POST['user'])){
    $ok = false;
    $messages[] = "L'utilisateur ne peut pas être vide !";
}

if (!isset($_POST['password']) || empty($_POST['password'])){
    $ok = false;
    $messages[] = 'Le mot de passe ne peut pas être vide !';
}

if($ok){
    $login = $_POST['user'];
    $password = $_POST['password'];

    $check_login = $bdd -> prepare('SELECT * FROM admin WHERE user = :login');
    $check_login -> execute(array('login' => $login));
    $donnee = $check_login -> fetch();

    // Check hash password
    if($donnee){
        if(password_verify($password, $donnee['password'])){
            $_SESSION['admin'] = true;
            $_SESSION['user'] = $donnee['user'];
            $messages[] = 'Connecté';
        }
        else{
            $_SESSION['admin'] = false;
            $ok = false;
            $messages[] = 'Mauvais utilisateur/mot de passe !';
        }
    }else{
        $_SESSION['admin'] = false;
        $ok = false;
        $messages[] = 'Mauvais utilisateur/mot de passe !';
    }


    $check_login -> closeCursor();
}
if(isset($_POST['log_out'])){
    session_destroy();
}

echo json_encode(
    array(
        'ok' => $ok,
        'messages' => $messages
    )
    );