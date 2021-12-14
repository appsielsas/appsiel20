<?php

namespace App\Appsiel\System\Services;

use App\Appsiel\System\Models\SysModel;

class ModelServ
{
    public $model;

    public function __construct($model_id, $model_name = null)
    {
        if ($model_id != 0) {
            $this->model  = SysModel::find($model_id);
        }

        if ($model_name != null) {
            $this->model  = SysModel::where('name', $model_name)->get()->first();
            $model_id = $this->model->id;
        }

        $this->validate_exits($model_id);
    }

    public function index_table_headers()
    {
        return app($this->model->name_space)->index_table_headers;
    }

    public function get_rows()
    {
        return app($this->model->name_space)->get_rows();
    }

    public function validator_store($data)
    {
        return app($this->model->name_space)->validator_store($data);
    }

    public function validator_update($data, $id)
    {
        return app($this->model->name_space)->validator_update($data, $id);
    }

    public function store($data)
    {
        return app($this->model->name_space)->store($data);
    }

    public function model_update($data, $id)
    {
        return app($this->model->name_space)->model_update($data, $id);
    }

    public function actions()
    {
        return $this->model->actions()->get();
    }

    public function fields()
    {
        return $this->model->fields()->get();
    }

    public function get_fields_to_show($row)
    {
        $fillable = app($this->model->name_space)->getFillable();

        $assigned_fields = $this->fields();
        $fields_to_show = [];
        foreach ($assigned_fields as $field) {
            if (in_array($field->name, $fillable)) {

                $fields_to_show[] = [
                    'label' => $field->label,
                    'value' => $field->get_value_to_show($row)
                ];
            }
        }

        return $fields_to_show;
    }

    public function get_suggestions_autocomplete($search)
    {
        return app($this->model->name_space)->suggestions_autocomplete($search);
    }

    public function get_tabs($row)
    {
        return app($this->model->name_space)->get_tabs($row);
    }

    public function validate_exits($model_id)
    {
        if ($this->model == null) {
            dd('El modelo con ID=' . $model_id . ' no existe en la base de datos.');
        }

        if (!class_exists($this->model->name_space)) {
            dd('El modelo <' . $this->model->label . '> (ID=' . $this->model->id . ') tiene un Namespace errado en la base de datos.');
        }

        $methods = ['show', 'model_delete', 'get_rows'];
        foreach ($methods as $key => $method) {
            if (!method_exists(app($this->model->name_space), $method)) {
                dd('El modelo <' . $this->model->label . '> (ID=' . $this->model->id . ') NO tiene creado el metodo ' . $method . '().');
            }
        }
    }
}
