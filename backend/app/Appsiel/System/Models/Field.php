<?php

namespace App\Appsiel\System\Models;

use Illuminate\Database\Eloquent\Model;

class Field extends Model
{
    protected $table = 'sys_fields';

    protected $fillable = ['label', 'type', 'name', 'options', 'value', 'attributes', 'definition'];
}
