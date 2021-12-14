<?php

namespace App\Appsiel\Core\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $table = 'core_companies';

    public $fillable = ['tradename', 'url_image', 'state'];

    public $index_table_headers = [
        ["Header" => "Nombre", "accessor" => "name"],
        ["Header" => "Estado", "accessor" => "state"]
    ];

    public function get_rows()
    {
        return Company::paginate(10);
    }

    public function show($id)
    {
        //
    }

    public function model_delete()
    {
        //
    }

    public function get_value_to_show()
    {
        return $this->tradename;
    }

    public function suggestions_autocomplete($search)
    {
        $records = Company::where('tradename', 'like', '%' . $search . '%')
            ->select('id', 'tradename AS label')
            ->limit(10)
            ->get();

        if ($search == null) {
            $records = Company::select('id', 'tradename AS label')
                ->limit(10)
                ->get();
        }

        return $records;
    }
}
