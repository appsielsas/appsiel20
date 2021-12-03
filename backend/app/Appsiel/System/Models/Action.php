<?php

namespace App\Appsiel\System\Models;

use Illuminate\Database\Eloquent\Model;

class Action extends Model
{
    protected $table = 'sys_actions';

    protected $fillable = ['label', 'type', 'method', 'prefix', 'icon'];
}
