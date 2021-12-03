<?php

namespace App\Appsiel\Sales\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $table = 'sales_customers';

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
        return Customer::paginate(10);
    }
}
