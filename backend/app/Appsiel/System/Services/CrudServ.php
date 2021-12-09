<?php

namespace App\Appsiel\System\Services;

use App\Appsiel\System\Services\ModelServ;

use Illuminate\Database\Eloquent\ModelNotFoundException;

class CrudServ
{
    public function get_model_index_data($model_id)
    {
        $obj_model_serv = new ModelServ($model_id);
        return [
            'name' => $obj_model_serv->model->label,
            'model_headers_table' => $obj_model_serv->index_table_headers(),
            "model_data_table" => $obj_model_serv->get_rows(),
            "model_fields" => $obj_model_serv->fields(),
            "model_actions" => $obj_model_serv->actions(),
        ];
    }

    public function ModelValidator($model_id, $data)
    {
        $obj_model_serv = new ModelServ($model_id);
        return $obj_model_serv->validator($data);
    }

    public function store($model_id, $data)
    {
        $obj_model_serv = new ModelServ($model_id);
        return $obj_model_serv->store($data);
    }

    public function show($model_id, $id)
    {
        $obj_model_serv = new ModelServ($model_id);

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
