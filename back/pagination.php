<?php
require 'bdd.php';

// Récupère la valeur de $select_categorie
require 'back/filtre.php';


// Si $_GET['page'] n'existe pas vaut 1
if(!isset($_GET['page']) || empty($_GET['page'])){
    $current_page = 1;
}
else{
    $current_page = $_GET['page'];
}

// Compte nombre d'élément pour pagination 
if(empty($select_categorie)){
    $sql = 'SELECT COUNT(id) FROM produits';
    $count = $bdd -> query($sql);
} else{
    $sql = 'SELECT COUNT(p.id) FROM produits AS p INNER JOIN categories AS c ON p.id_categorie = c.id WHERE c.categorie = :categorie';
    $count = $bdd -> prepare($sql);
    $count -> bindValue('categorie', $select_categorie, PDO::PARAM_STR);
    $count -> execute();
}

$total = $count -> fetch();

// Défini le début du compte des éléments dans excursion selon la page
$limit = 1;
$debut = $current_page * $limit - $limit;

$nombre_page = [];
for($i = 1; $i <= ceil($total[0] / $limit); $i++){
    array_push($nombre_page, $i);
}
