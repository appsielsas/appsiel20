<?php

namespace App\Appsiel\System\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;

class Action extends Model
{
    protected $table = 'sys_actions';

    protected $fillable = ['label', 'type', 'method', 'prefix', 'icon'];

    public $index_table_headers = [
        ["Header" => "Nombre", "accessor" => "label"],
        ["Header" => "Tipo", "accessor" => "type"],
        ["Header" => "Método", "accessor" => "method"],
        ["Header" => "Prefijo URL", "accessor" => "prefix"],
        ["Header" => "Ícono", "accessor" => "icon"]
    ];

    public function get_rows()
    {
        return Action::paginate(10);
    }

    public function validator_store($data)
    {
        return Validator::make($data, [
            'label' => 'required|string|max:255'
        ]);
    }

    public function validator_update($data, $id)
    {
        return Validator::make($data, [
            'label' => 'required|max:255'
        ]);
    }

    public function store($data)
    {
        return Action::create($data);
    }

    public function model_update($data, $id)
    {
        return Action::where('id', $id)->update($data);
    }

    public function show($id)
    {
        //
    }

    public function model_delete()
    {
        //
    }

    public function get_tabs($row)
    {
        return [];
    }
}
