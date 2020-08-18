<?php
    require 'bdd.php';
    $array = array();
    // liste des catégories
    $sql = 'SELECT categorie FROM categories';
    $categorie = $bdd -> query($sql);

    $array_categories = [];
    while($donnees = $categorie->fetchColumn()){
        array_push($array_categories, $donnees);
    }

    $categories = ["categories" => $array_categories];
    array_push($array, $categories);

    echo json_encode($array);