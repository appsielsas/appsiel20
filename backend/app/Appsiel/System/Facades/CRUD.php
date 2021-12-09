<?php

namespace App\Appsiel\System\Facades;

use Illuminate\Support\Facades\Facade;

class CRUD extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'CrudServ';
    }
}
