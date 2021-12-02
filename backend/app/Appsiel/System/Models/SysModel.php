<?php

namespace App\Appsiel\System\Models;

use Illuminate\Database\Eloquent\Model;

class SysModel extends Model
{
    protected $fillable = [ 'label', 'name', 'name_space'  ];
    
    public function actions()
    {
        return $this->belongsToMany(Action::class);
    }
}
