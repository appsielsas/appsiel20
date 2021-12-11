<?php

namespace App\Appsiel\System;

use App\Appsiel\System\Models\Application;
use App\Appsiel\System\Models\Permission;

use Illuminate\Support\Facades\Request as Input;

class Catalogs
{
    public $catalog;

    public function __construct()
    {
        $parent_id = Permission::where(
            [
                ['application_id', '=', Input::get('app_id')],
                ['url', '=', 'app_catalogs']
            ]
        )->value('id');

        $childrens = Permission::where(
            [
                ['parent', '=', $parent_id]
            ]
        )->OrderBy('position')->get();

        $items = [];
        foreach ($childrens as $child) {

            $items[] =
                [
                    'app_id' => $child->application_id,
                    'model_id' => $child->model_id,
                    'icon' => $child->fa_icon,
                    'label' => $child->label
                ];
        }
        $this->catalog = $items;
    }
}
