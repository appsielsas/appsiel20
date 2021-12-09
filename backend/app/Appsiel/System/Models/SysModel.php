<?php

namespace App\Appsiel\System\Models;

use Illuminate\Database\Eloquent\Model;

use App\Appsiel\System\Facades\CRUD;

class SysModel extends Model
{
    protected $fillable = ['label', 'name', 'name_space'];

    public function actions()
    {
        return $this->belongsToMany(Action::class, 'sys_model_has_actions', 'model_id', 'action_id');
    }

    public function fields()
    {
        return $this->belongsToMany(Field::class, 'sys_model_has_fields', 'model_id', 'field_id');
    }

    public function get_rows()
    {
        return User::paginate(10);
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
                'data' => [CRUD::get_model_index_data(13)]
            ],
            [
                'label' => 'Acciones',
                'data' => [CRUD::get_model_index_data(14)]
            ]
        ];
    }
}
