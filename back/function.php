<?php

// Fonction liste des catégories _____________________________________________________
function categories(){
    require 'bdd.php';

    $sql = 'SELECT categorie FROM categories';
    $req = $bdd -> query($sql);
    return $req;
}

// Fonction liste des produits _______________________________________________________
function produits_list(){
    // Récupère le le numéro de page et la limite pour afficher les produits
    require 'pagination.php';

    // Récupère la valeur de $select_categorie et de $order
    require 'filtre.php';

    if($order == NULL){
        $order_req = 'p.id ASC';
    }elseif($order == 'date_croissant'){
        $order_req = 'p.date_achat ASC';
    }elseif($order == 'date_decroissant'){
        $order_req = 'p.date_achat DESC';
    }elseif($order == 'prix_croissant'){
        $order_req = 'p.prix ASC';
    }elseif($order == 'prix_decroissant'){
        $order_req = 'p.prix DESC';
    }

    if(empty($select_categorie)){
        $sql = 'SELECT p.id, p.nom, p.reference, p.prix, p.date_achat, p.date_fin_garantie, c.categorie FROM produits AS p INNER JOIN categories AS c ON p.id_categorie = c.id ORDER BY ' . $order_req . ' LIMIT :debut, :limit';

        $req = $bdd -> prepare($sql);

    } else{
        $sql = 'SELECT p.id, p.nom, p.reference, p.prix, p.date_achat, p.date_fin_garantie, c.categorie FROM produits AS p INNER JOIN categories AS c ON p.id_categorie = c.id WHERE c.categorie = :categorie ORDER BY ' . $order_req . ' LIMIT :debut, :limit';

        $req = $bdd -> prepare($sql);
        $req -> bindValue('categorie', $select_categorie, PDO::PARAM_STR);
    }

    $req -> bindValue('debut', $debut, PDO::PARAM_INT);
    $req -> bindValue('limit', $limit, PDO::PARAM_INT);
    $req -> execute();

    return $req;
}

// Finction modal détail des produits _________________________________________________
function detail_modal($id){
    require 'bdd.php';

    if(isset($_GET['id'])){
        $id = $_GET['id'];
    } else{
        $id = "";
    }

    $sql = 'SELECT p.id, p.nom,	p.reference, p.prix, p.date_achat, p.date_fin_garantie, p.conseil, p.manuel_utilisation, p.ticket_achat, c.categorie, v.ville, v.code_postal, v.rue, e.url, ph.nom_photo FROM produits AS p JOIN categories AS c ON p.id_categorie = c.id JOIN vente_direct AS v ON p.id = v.id_produit JOIN ecommerce AS e ON p.id = e.id_produit JOIN photos AS ph ON p.id = ph.id_produit WHERE p.id = :id';
    $req = $bdd -> prepare($sql);

    $req -> bindValue('id', $id, PDO::PARAM_INT);
    $req -> execute();

    // var_dump($req -> fetch());
    return json_encode($req -> fetch());
}