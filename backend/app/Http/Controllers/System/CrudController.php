<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\Controller;

use App\Appsiel\System\Services\SystemServ;

use Illuminate\Support\Facades\Request As Input;

class CrudController extends Controller
{
    public function index()
    {
        $obj_sys_serv = new SystemServ();
        return $obj_sys_serv->get_model_index_data( Input::get( 'model_id' ) );
    }
}
