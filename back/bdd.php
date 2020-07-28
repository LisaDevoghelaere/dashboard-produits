<?php

//Alexandre
// try{
//     $bdd = new PDO('mysql:host=localhost;dbname=dashboard_produits;charset=utf8', 'root', 'root',
//     array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
// }

// Jeremy
try{
    $bdd = new PDO('mysql:host=localhost;dbname=dashboard_produits;charset=utf8', 'root', '',
    array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
}

catch (Exeption $e){
    die('Erreur : ' . $e -> getmessage());
}
