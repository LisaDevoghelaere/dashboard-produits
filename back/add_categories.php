<?php

require 'function.php';

if(isset($_POST['categorie']) && !empty($_POST['categorie'])){
    echo add_categories($_POST['categorie']);
}