<?php

namespace App\Appsiel\System\Services;

use App\Appsiel\System\Models\User;

class UserServ
{
    public function index_table_headers()
    {
        return [
                [ "Header" => "Nombre", "accessor" => "name" ],
                [ "Header" => "E-mail", "accessor" => "email" ]
            ];
    }
}