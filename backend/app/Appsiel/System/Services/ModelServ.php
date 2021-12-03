<?php

namespace App\Appsiel\System\Services;

use App\Appsiel\System\Models\SysModel;

class ModelServ
{
    public $model;

    public function __construct($model_id)
    {
        $this->model  = SysModel::find($model_id);
        $this->validate_model();
    }

    public function index_table_headers()
    {
        return app($this->model->name_space)->index_table_headers;
    }

    public function get_rows()
    {
        return app($this->model->name_space)->get_rows();
    }

    public function actions()
    {
        return $this->model->actions()->get();
    }

    public function fields()
    {
        return $this->model->fields()->get();
    }

    public function validate_model()
    {
        if ($this->model == null) {
            dd('El modelo con ID=' . $model_id . ' no extiste');
        }

        if (!class_exists($this->model->name_space)) {
            dd('El modelo con ID=' . $this->model->id . ' tiene un Namespace errado en la base de datos.');
        }
    }
}
