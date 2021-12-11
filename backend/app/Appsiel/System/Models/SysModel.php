<?php

namespace App\Appsiel\System\Models;

use Illuminate\Database\Eloquent\Model;

use App\Appsiel\System\Facades\CRUD;

use App\Appsiel\System\Services\ModelServ;
use Illuminate\Support\Facades\Validator;

class SysModel extends Model
{
    protected $fillable = ['label', 'name', 'name_space'];

    public $index_table_headers = [
        ["Header" => "Etiqueta", "accessor" => "label"],
        ["Header" => "Nombre", "accessor" => "name"],
        ["Header" => "Name Space", "accessor" => "name_space"]
    ];

    public function actions()
    {
        return $this->belongsToMany(Action::class, 'sys_model_has_actions', 'model_id', 'action_id');
    }

    public function fields()
    {
        return $this->belongsToMany(Field::class, 'sys_model_has_fields', 'model_id', 'field_id')->withPivot('position', 'required', 'editable', 'unique');
    }

    public function get_rows()
    {
        return SysModel::paginate(10);
    }

    public function validator_store($data)
    {
        return Validator::make($data, [
            'name' => 'required|string|max:255'
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
        return SysModel::create($data);
    }

    public function model_update($data, $id)
    {
        $record = SysModel::where('id', $id)->get()->first();

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
        $obj_related_model_serv = new ModelServ(SysModel::where('name', 'model_has_fields')->value('id'));

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
        $obj_related_model_serv = new ModelServ(SysModel::where('name', 'model_has_actions')->value('id'));

        return [
            'name' => $obj_related_model_serv->model->label,
            'model_table_headers' => $obj_related_model_serv->index_table_headers(),
            "model_table_rows" => app($obj_related_model_serv->model->name_space)->get_rows($row->id),
            "model_fields" => $obj_related_model_serv->fields(),
            "model_actions" => $obj_related_model_serv->actions(),
        ];
    }
}
