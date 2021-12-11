<?php

namespace App\Appsiel\System\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;

use App\Appsiel\System\Models\SysModel;
use App\Appsiel\System\Models\Field;

class ModelHasField extends Model
{
    protected $table = 'sys_model_has_fields';

    protected $fillable = ['model_id', 'field_id', 'position', 'required', 'editable', 'unique'];

    public $index_table_headers = [
        ["Header" => "Campo", "accessor" => "label"],
        ["Header" => "Nombre (BD)", "accessor" => "name"],
        ["Header" => "Tipo", "accessor" => "type"],
        ["Header" => "Opciones", "accessor" => "options"],
        ["Header" => "Posición", "accessor" => "position"],
        ["Header" => "Requerido", "accessor" => "required"],
        ["Header" => "Editable", "accessor" => "editable"],
        ["Header" => "Único", "accessor" => "unique"],

    ];

    public function model()
    {
        return $this->belongsTo(SysModel::class, 'model_id');
    }

    public function field()
    {
        return $this->belongsTo(Field::class, 'field_id');
    }

    public function get_rows($model_id)
    {
        $items = ModelHasField::where('model_id', $model_id)
            ->orderBy('position')
            ->paginate(10);

        $updatedItems = $items->getCollection();

        foreach ($updatedItems as $item) {
            $item->label = $item->field->label;
            $item->name = $item->field->name;
            $item->type = $item->field->type;
            $item->options = $item->field->options;
            $item->position = $item->position;
            $item->required = ($item->required) ? 'Si' : 'No';
            $item->editable = ($item->editable) ? 'Si' : 'No';
            $item->unique = ($item->unique) ? 'Si' : 'No';
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
        $record = ModelHasField::where('id', $id)->get()->first();

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
