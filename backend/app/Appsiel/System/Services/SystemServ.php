<?php

namespace App\Appsiel\System\Services;

use App\Appsiel\System\Services\ModelServ;

class SystemServ
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
}
