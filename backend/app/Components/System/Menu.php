<?php

namespace App\Components\System;

use Illuminate\Database\Eloquent\Model;

//use Spatie\Permission\Models\Role;
//use Spatie\Permission\Models\Permission;
//use App\Models\System\User;
//use Auth;

use App\Models\System\Application;
use App\Models\System\Permission;
use App\Models\System\SysModel;


class Menu
{
    public $menu;

    public function __construct()
    {
        /*$modelo1_modelo_teso1 = [
                                    "label" => "Entradas de almacen",
                                    "url" => "/web/tal"
                                ];
        
        $modelo2_modelo_teso1 = [];

        $modelos_modulos_teso1 = [ $modelo1_modelo_teso1, $modelo2_modelo_teso1 ];

        $modulo_teso1 = [ 
                            "label" => "inventarios",
                            "icon" => "fas fa-cube",
                            "url" => "/web/tal",
                            "modelos" => $modelos_modulos_teso1
                        ];

        $modulo_teso2 = [];
        
        $modulos_teso = [ $modulo_teso1, $modulo_teso2 ];
        
        $app_teso = [
                        "label" => "tesoreria",
                        "icon" => "fas fa-box-open",
                        "url" => "/web/tal",
                        "modulos" => $modulos_teso
                    ];
        
        $app_config = [
                        "label" => "Configuracion",
                        "icon" => "fas fa-box-open",
                        "url" => "/web/tal",
                        "modulos" => []
                    ];

        $menu = [
            'applications' => [ $app_teso, $app_config ]
        ];

        dd($menu, json_encode($menu));*/
        $applications = Application::where('state','Activo')->orderBy('position')->get();
        
        $applications_items = [];
        foreach ($applications as $application ) 
        {            
            $modules = Permission::where([
                                            [ 'application_id', '=', $application->id ],
                                            [ 'parent', '=', 0 ]
                                        ])
                                        ->OrderBy('position')
                                        ->get();
            
            $modules_items = [];
            foreach ( $modules as $module )
            {
                $models = Permission::where([
                                                [ 'parent', '=', $module->id ]
                                            ])
                                            ->OrderBy('position')
                                            ->get();
                                            
                $models_items = [];
                foreach ( $models as $model )
                {
                    $models_items[] = [ 
                                        'id' => $model->model_id,
                                        'label' => $model->label,
                                        'name' => $model->name,
                                        'url' => $model->url
                                    ];
                }

                $modules_items[] = [ 
                                    'id' => $module->id,
                                    'label' => $module->label,
                                    'name' => $module->name,
                                    'url' => $module->url,
                                    'models' => $models_items
                                ];
            }

            $applications_items[] = [ 
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