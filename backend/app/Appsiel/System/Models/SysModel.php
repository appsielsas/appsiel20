<?php

namespace App\Appsiel\System\Models;

use Illuminate\Database\Eloquent\Model;

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
}
