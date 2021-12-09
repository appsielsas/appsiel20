<?php

namespace App\Appsiel\System\Models;

use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    protected $table = 'sys_permissions';

    protected $fillable = ['application_id', 'model_id', 'name', 'label', 'url', 'parent', 'position', 'visible', 'fa_icon'];

    public function get_rows()
    {
        return Field::paginate(10);
    }

    public function show($id)
    {
        //
    }

    public function model_delete()
    {
        //
    }
}
