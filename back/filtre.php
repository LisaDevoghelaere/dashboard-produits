<?php

// Si $_GET['categorie'] n'existe pas vaut toute catégorie
if(!isset($_GET['categorie']) || empty($_GET['categorie'])){
    $select_categorie = 'Choisissez une catégorie';
}
else{
    $select_categorie = $_GET['categorie'];
}
