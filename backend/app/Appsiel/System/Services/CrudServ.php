<?php

namespace App\Appsiel\System\Services;

use App\Appsiel\System\Services\ModelServ;

class CrudServ
{
    public function get_model_index_data($model_name)
    {
        $obj_model_serv = new ModelServ($model_name);

        if ($obj_model_serv->fails()) {
            return response()->json($obj_model_serv->errors(), 500);
        }

        return [
            'name' => $obj_model_serv->model->label,
            'model_table_headers' => $obj_model_serv->index_table_headers(),
            "model_table_rows" => $obj_model_serv->get_rows(),
            "model_fields" => $obj_model_serv->fields(),
            "model_actions" => $obj_model_serv->actions(),
        ];
    }

    public function ModelValidator($model_name, $data, $action, $id = 0)
    {
        $obj_model_serv = new ModelServ($model_name);
        if ($obj_model_serv->fails()) {
            return $obj_model_serv;
        }

        switch ($action) {
            case 'store':
                return $obj_model_serv->validator_store($data);
                break;

            case 'update':
                return $obj_model_serv->validator_update($data, $id);
                break;

            default:
                # code...
                break;
        }
    }

    public function store($data)
    {
        return $obj_model_serv->store($data);
    }

    public function update($model_name, $data, $id)
    {
        $obj_model_serv = new ModelServ($model_name);

        if ($obj_model_serv->fails()) {
            return response()->json($obj_model_serv->errors(), 500);
        }

        return $obj_model_serv->model_update($data, $id);
    }

    public function show($model_name, $id)
    {
        $obj_model_serv = new ModelServ($model_name);

        if ($obj_model_serv->fails()) {
            return response()->json($obj_model_serv->errors(), 500);
        }

        $row = app($obj_model_serv->model->name_space)->find($id);
        if ($row == null) {
            return  response()->json([
                'message' => ['Registro No encontrado.']
            ], 404);
        }

        return [
            'status' => 'sucess',
            'message' => null,
            'fields' => $obj_model_serv->get_fields_to_show($row),
            'tabs' => $obj_model_serv->get_tabs($row)
        ];
    }
}
