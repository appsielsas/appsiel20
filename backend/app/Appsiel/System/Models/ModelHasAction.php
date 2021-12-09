<?php

namespace App\Appsiel\System\Models;

use Illuminate\Database\Eloquent\Model;

class ModelHasAction extends Model
{
    protected $table = 'sys_model_has_actions';

    protected $fillable = ['model_id', 'action', 'position'];

    public $index_table_headers = [
        ["Header" => "Modelo", "accessor" => "model_id"],
        ["Header" => "Campo", "accessor" => "campo_id"],
        ["Header" => "Posición", "accessor" => "position"]
    ];

    public function get_rows()
    {
        return ModelHasAction::paginate(10);
    }

    public function show()
    {
    }

    public function model_delete()
    {
    }

    public function get_tabs($row)
    {
        return [];
    }
}
