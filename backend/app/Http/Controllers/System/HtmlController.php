<?php

namespace App\Http\Controllers\System;

use App\Appsiel\System\Models\SysModel;
use App\Appsiel\System\Services\ModelServ;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Request as Input;

class HtmlController extends Controller
{
    public function get_suggestions_autocomplete()
    {
        $options = explode('_', Input::get('options'));

        if (!isset($options[1])) {
            return (object)['id' => 0, 'label' => 'El valor options del campo NO esta bien definido.'];
        }

        $model_name = $options[1];

        $obj_model_serv = new ModelServ(0, $model_name);

        return $obj_model_serv->get_suggestions_autocomplete(Input::get('search'));
    }
}
