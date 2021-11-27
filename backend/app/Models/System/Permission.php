<?php

namespace App\Models\System;

use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    protected $table = 'sys_permissions';

    protected $fillable = [ 'application_id', 'model_id', 'name', 'label', 'url', 'parent', 'position', 'visible', 'fa_icon' ];
}
