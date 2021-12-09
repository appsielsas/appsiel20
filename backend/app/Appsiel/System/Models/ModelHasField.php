<?php

namespace App\Appsiel\System\Models;

use Illuminate\Database\Eloquent\Model;

class ModelHasField extends Model
{
    protected $table = 'sys_model_has_fields';

    protected $fillable = ['model_id', 'field_id', 'position', 'required', 'editable', 'unique'];

    public $index_table_headers = [
        ["Header" => "Modelo", "accessor" => "model_id"],
        ["Header" => "Campo", "accessor" => "campo_id"],
        ["Header" => "Posición", "accessor" => "position"]
    ];

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
}
