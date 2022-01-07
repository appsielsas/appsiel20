<?php

namespace App\Appsiel\Inventories\Models;

use Illuminate\Database\Eloquent\Model;

use App\Appsiel\System\Facades\CRUD;

use App\Appsiel\System\Services\ModelServ;
use Illuminate\Support\Facades\Validator;

class WarehouseEntry extends Model
{
    protected $fillable = ['label', 'name', 'name_space'];

    public $index_table_headers = [
        ["Header" => "Fecha", "accessor" => "date"],
        ["Header" => "Documento", "accessor" => "document_label"],
        ["Header" => "Contacto", "accessor" => "contact_label"],
        ["Header" => "Detalle", "accessor" => "detail"],
        ["Header" => "Estado", "accessor" => "state"]
    ];

    public function get_rows()
    {
        return WarehouseEntry::paginate(10);
    }

    public function validator_store($data)
    {
        return Validator::make($data, [
            'date' => 'required'
        ]);
    }

    public function validator_update($data, $id)
    {
        return Validator::make($data, [
            'name' => 'required|max:250'
        ]);
    }

    public function store($data)
    {
        return WarehouseEntry::create($data);
    }

    public function model_update($data, $id)
    {
        $record = WarehouseEntry::where('id', $id)->get()->first();

        $record->fill($data);

        $record->update();

        return $record;
    }

    public function show()
    {
    }

    public function model_delete()
    {
    }

    public function get_tabs($row)
    {
        return [
            [
                'label' => 'Campos',
                'data' => $this->get_data_for_tab1($row)
            ],
            [
                'label' => 'Acciones',
                'data' => $this->get_data_for_tab2($row)
            ]
        ];
    }

    public function get_data_for_tab1($row)
    {
        $obj_related_model_serv = new ModelServ(WarehouseEntry::where('name', 'model_has_fields')->value('id'));

        return [
            'name' => $obj_related_model_serv->model->label,
            'model_table_headers' => $obj_related_model_serv->index_table_headers(),
            "model_table_rows" => app($obj_related_model_serv->model->name_space)->get_rows($row->id),
            "model_fields" => $obj_related_model_serv->fields(),
            "model_actions" => $obj_related_model_serv->actions(),
        ];
    }

    public function get_data_for_tab2($row)
    {
        $obj_related_model_serv = new ModelServ(WarehouseEntry::where('name', 'model_has_actions')->value('id'));

        return [
            'name' => $obj_related_model_serv->model->label,
            'model_table_headers' => $obj_related_model_serv->index_table_headers(),
            "model_table_rows" => app($obj_related_model_serv->model->name_space)->get_rows($row->id),
            "model_fields" => $obj_related_model_serv->fields(),
            "model_actions" => $obj_related_model_serv->actions(),
        ];
    }
}
