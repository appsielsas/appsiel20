<?php

namespace App\Appsiel\System\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;

class ModelHasAction extends Model
{
    protected $table = 'sys_model_has_actions';

    protected $fillable = ['model_id', 'action_id', 'position'];

    public $index_table_headers = [
        ["Header" => "Nombre", "accessor" => "label"],
        ["Header" => "Tipo", "accessor" => "type"],
        ["Header" => "Método", "accessor" => "method"],
        ["Header" => "Prefijo URL", "accessor" => "prefix"],
        ["Header" => "Ícono", "accessor" => "icon"],
        ["Header" => "Posición", "accessor" => "position"]
    ];

    public function get_rows($model_id)
    {
        $items = ModelHasAction::where('model_id', $model_id)
            ->orderBy('position')
            ->paginate(10);

        $updatedItems = $items->getCollection();

        foreach ($updatedItems as $item) {
            $item->position = $item->position;
        }
        $items->setCollection($updatedItems);

        return $items;
    }

    public function validator_store($data)
    {
        return Validator::make($data, [
            'model_id' => 'required'
        ]);
    }

    public function validator_update($data, $id)
    {
        return Validator::make($data, [
            'model_id' => 'required'
        ]);
    }

    public function store($data)
    {
        return ModelHasField::create($data);
    }

    public function model_update($data, $id)
    {
        return ModelHasField::where('id', $id)->update($data);
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
