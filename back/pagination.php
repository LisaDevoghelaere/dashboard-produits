<?php
require 'bdd.php';

// Si $_GET['page'] n'existe pas vaut 1
if(!isset($_GET['page']) || empty($_GET['page'])){
    $current_page = 1;
}
else{
    $current_page = $_GET['page'];
}

// Compte nombre d'élément pour pagination 
$sql = 'SELECT COUNT(id) FROM produits';
$count = $bdd -> query($sql);
$total = $count -> fetch();

// Défini le début du compte des éléments dans excursion selon la page
$limit = 10;
$debut = $current_page * $limit - $limit;

$nombre_page = [];
for($i = 1; $i <= ceil($total[0] / $limit); $i++){
    array_push($nombre_page, $i);
}
