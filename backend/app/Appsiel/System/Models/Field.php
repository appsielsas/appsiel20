<?php

namespace App\Appsiel\System\Models;

use Illuminate\Database\Eloquent\Model;

class Field extends Model
{
    protected $table = 'sys_fields';

    protected $fillable = ['label', 'type', 'name', 'options', 'value', 'attributes', 'definition'];

    public $index_table_headers = [
        ["Header" => "Etiqueta", "accessor" => "label"],
        ["Header" => "Nombre", "accessor" => "name"],
        ["Header" => "Tipo", "accessor" => "type"],
        ["Header" => "Opciones", "accessor" => "options"],
        ["Header" => "Valor", "accessor" => "value"],
        ["Header" => "Atributos", "accessor" => "attributes"],
        ["Header" => "Definicion", "accessor" => "definition"],

    ];

    public function get_value_to_show($model_row)
    {
        $field_name = $this->name;
        switch ($this->type) {
            case 'select':
                $options = explode('_', $this->options);
                if (isset($options[1])) {
                    if ($options[0] == 'model') {
                        $options_model = SysModel::where('name', $options[1])->get()->first();
                        if ($options_model != null) {
                            $row_options_model = app($options_model->name_space)::find($model_row->$field_name);
                            return $row_options_model->get_value_to_show();
                        }
                    }
                }
                break;

            default:
                return $model_row->$field_name;
                break;
        }
    }

    public function get_rows()
    {
        return Field::paginate(10);
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
