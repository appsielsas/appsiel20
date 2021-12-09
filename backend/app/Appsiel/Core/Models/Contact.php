<?php

namespace App\Appsiel\Core\Models;

use Illuminate\Database\Eloquent\Model;

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

    public function show($id)
    {
        //
    }
}
