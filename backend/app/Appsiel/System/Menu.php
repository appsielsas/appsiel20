<?php

namespace App\Appsiel\System;

use App\Appsiel\System\Models\Application;
use App\Appsiel\System\Models\Permission;
use App\Appsiel\System\Models\SysModel;


class Menu
{
    public $menu;

    public function __construct()
    {
        $applications = Application::where('state', 'Activo')->orderBy('position')->get();

        $applications_items = [];
        foreach ($applications as $application) {
            $modules = Permission::where(
                [
                    ['application_id', '=', $application->id],
                    ['parent', '=', 0],
                    ['visible', '=', 1]
                ]
            )->OrderBy('position')->get();

            $modules_items = [];
            foreach ($modules as $module) {
                $models = Permission::where(
                    [
                        ['parent', '=', $module->id],
                        ['visible', '=', 1]
                    ]
                )->OrderBy('position')->get();

                $models_items = [];
                foreach ($models as $model) {
                    $models_items[] =
                        [
                            'id' => $model->model_id,
                            'label' => $model->label,
                            'name' => $model->name,
                            'url' => $model->url
                        ];
                }

                $modules_items[] =
                    [
                        'id' => $module->id,
                        'label' => $module->label,
                        'name' => $module->name,
                        'url' => $module->url,
                        'models' => $models_items
                    ];
            }

            $applications_items[] =
                [
                    'id' => $application->id,
                    'label' => $application->label,
                    'name' => $application->name,
                    'icon' => $application->url_image,
                    'url' => '',
                    'modules' => $modules_items
                ];
        }
        $this->menu = $applications_items;
    }
}
