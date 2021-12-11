<?php

namespace App\Appsiel\Core\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;

class Contact extends Model
{
    protected $table = 'core_contacts';

    public $fillable = ['name', 'tradename', 'identity_number', 'address', 'phone', 'email', 'url_image', 'state'];

    public $index_table_headers = [
        ["Header" => "Nombre", "accessor" => "name"],
        ["Header" => "Número identificación", "accessor" => "identity_number"],
        ["Header" => "Dirección", "accessor" => "address"],
        ["Header" => "Teléfono", "accessor" => "phone"],
        ["Header" => "E-mail", "accessor" => "email"]
    ];

    public function get_rows()
    {
        return Contact::paginate(10);
    }

    public function validator_store($data)
    {
        return Validator::make($data, [
            'name' => 'required|string|max:255'
        ]);
    }

    public function validator_update($data, $id)
    {
        return Validator::make($data, [
            'name' => 'required|max:250'
        ]);
    }

    public function store($data)
    {
        return Contact::create($data);
    }

    public function model_update($data, $id)
    {
        return Contact::where('id', $id)->update($data);
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
