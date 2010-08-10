<?php
header('Content-Type: text/javascript');
sleep(rand(0,2));
echo "console.log('`-script [" . $_GET['id'] . "] executed');\n";
