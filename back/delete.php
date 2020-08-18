<?php

require 'function.php';

if(isset($_POST['delete']) && !empty($_POST['delete'])){
    echo delete_product($_POST['delete']);
}