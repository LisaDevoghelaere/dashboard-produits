<?php

/**
 * param du form :
 * 
 * $_POST['id']
 * $_POST['nom']
 * $_POST['reference']
 * $_POST['prix']
 * $_POST['date_achat']
 * $_POST['date_garantie']
 * $_POST['conseil']
 * $_POST['manuel']
 * $_POST['ticket']
 * $_POST['categorie']
 * 
 * soit : 
 * $_POST['url'] si ecommerce
 * ou
 * $_POST['vendeur'] si vente direct
 * $_POST['ville']
 * $_POST['code_postal']
 * $_POST['rue']
 * 
 * $_POST['photo']
 */

require 'function.php';

if(isset($_POST['id']) && isset($_POST['nom']) && isset($_POST['reference']) && isset($_POST['prix']) && isset($_POST['date_achat']) && isset($_POST['date_garantie']) && isset($_POST['conseil']) && isset($_POST['manuel']) && isset($_POST['ticket']) && isset($_POST['categorie'])){
    echo update_product($_POST['id']);
}