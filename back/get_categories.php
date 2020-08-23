<?php

    require 'bdd.php';
    $array = array();
    // liste des catégories
    $sql = 'SELECT * FROM categories';
    $categorie = $bdd -> query($sql);

    $array_categories = [];
    $array_id = [];
    while($donnees = $categorie->fetch()){
        array_push($array_categories, $donnees['categorie']);
        array_push($array_id, $donnees['id']);
    }

    array_push($array, $array_categories);
    array_push($array, $array_id);

    echo json_encode($array);