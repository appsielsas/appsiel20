<?php

namespace App\Models\System;

use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    protected $table = 'sys_applications';

    protected $fillable = [
                                'label',
                                'name',
                                'scope',
                                'definition',
                                'position',
                                'url_image',
                                'state'
                            ];
}
