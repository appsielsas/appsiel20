<?php

namespace App\Appsiel\System\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;

use App\Appsiel\System\Models\SysModel;
use App\Appsiel\System\Models\Action;

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

    public function model()
    {
        return $this->belongsTo(SysModel::class, 'model_id');
    }

    public function action()
    {
        return $this->belongsTo(Action::class, 'action_id');
    }

    public function get_rows($model_id)
    {
        $items = ModelHasAction::where('model_id', $model_id)
            ->orderBy('position')
            ->paginate(10);

        $updatedItems = $items->getCollection();

        foreach ($updatedItems as $item) {
            $item->label = $item->action->label;
            $item->type = $item->action->type;
            $item->method = $item->action->method;
            $item->prefix = $item->action->prefix;
            $item->icon = $item->action->icon;
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
        return ModelHasAction::create($data);
    }

    public function model_update($data, $id)
    {
        $record = ModelHasAction::where('id', $id)->get()->first();

        $record->fill($data);

        $record->update();

        return $record;
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
