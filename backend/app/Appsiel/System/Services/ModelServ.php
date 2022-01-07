<?php

namespace App\Appsiel\System\Services;

use App\Appsiel\System\Models\SysModel;

class ModelServ
{
    public $model;

    protected $failed = false;

    protected $errors;

    public function __construct($model_name)
    {
        $this->model  = SysModel::where('name', $model_name)->get()->first();

        $this->validate_exits($model_name);
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

    public function validate_exits($model_name)
    {
        if ($this->model == null) {
            $this->failed = true;
            $this->errors = ["model" => ['El modelo <' . $model_name . '> no existe en la base de datos.']];
            return 0;
        }

        if (!class_exists($this->model->name_space)) {
            $this->failed = true;
            $this->errors = ["model" => ['El modelo <' . $this->model->label . '> (ID=' . $this->model->id . ') tiene un Namespace errado en la base de datos.']];
            return 0;
        }

        $methods = ['show', 'model_delete', 'get_rows'];
        foreach ($methods as $key => $method) {
            if (!method_exists(app($this->model->name_space), $method)) {
                $this->failed = true;
                $this->errors = ["model" => ['El modelo <' . $this->model->label . '> (ID=' . $this->model->id . ') NO tiene creado el metodo ' . $method . '().']];
                return 0;
            }
        }
    }

    public function fails()
    {
        return $this->failed;
    }

    public function errors()
    {
        return $this->errors;
    }
}
