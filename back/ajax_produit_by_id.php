<?php
require 'function.php';

if(isset($_GET['id'])){
    echo detail_modal($_GET['id']);
    
}