<?php
    // require 'bdd.php';
    // $array = array();
    // // liste des catégories
    // $sql = 'SELECT categorie FROM categories';
    // $categorie = $bdd -> query($sql);

    // $array_categories = [];
    // while($donnees = $categorie->fetchColumn()){
    //     array_push($array_categories, $donnees);
    // }

    // $categories = ["categories" => $array_categories];
    // array_push($array, $categories);

    // echo json_encode($array);


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

    // $categories = ["categories" => $array_categories,
    // "categories_id" => $array_categories
    // ];
    array_push($array, $array_categories);
    array_push($array, $array_id);

    echo json_encode($array);