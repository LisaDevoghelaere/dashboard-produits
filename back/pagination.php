<?php
require 'bdd.php';

// Récupère la valeur de $select_categorie
require 'back/filtre.php';


// Si $_POST['page'] n'existe pas vaut 1
if(!isset($_POST['page']) || empty($_POST['page'])){
    $current_page = 1;
}
else{
    $current_page = $_POST['page'];
}

$search = '%%';
    if(isset($_POST['search'])){
        $search= str_replace('"', '',$_POST['search']);
        $search = "%" . $search . "%";
    }
// Compte nombre d'élément pour pagination
if(empty($select_categorie)){
    $sql = "SELECT COUNT(*) FROM `produits` WHERE upper(`nom`) LIKE upper(:search)";
    $count = $bdd -> prepare($sql);
    $count -> bindValue('search', $search, PDO::PARAM_STR);
    $count -> execute();
} else{
    $sql = 'SELECT COUNT(p.id) FROM produits AS p INNER JOIN categories AS c ON p.id_categorie = c.id WHERE c.categorie = :categorie AND upper(p.nom) LIKE upper(:search)';
    $count = $bdd -> prepare($sql);
    $count -> bindValue('categorie', $select_categorie, PDO::PARAM_STR);
    $count -> bindValue('search', $search, PDO::PARAM_STR);
    $count -> execute();
}

$total = $count -> fetch();

// Défini le début du compte des éléments dans excursion selon la page
$limit = 6;
$debut = $current_page * $limit - $limit;

$nombre_page = [];
for($i = 1; $i <= ceil($total[0] / $limit); $i++){
    array_push($nombre_page, $i);
}
