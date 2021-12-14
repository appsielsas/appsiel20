<?php

namespace App\Appsiel\System\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    public $fillable = ['name', 'email', 'password', 'company_id'];

    public $index_table_headers = [
        ["Header" => "Nombre", "accessor" => "name"],
        ["Header" => "E-mail", "accessor" => "email"]
    ];

    public function get_rows()
    {
        return User::paginate(10);
    }

    public function validator_store($data)
    {
        return Validator::make($data, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);
    }

    public function validator_update($data, $user_id)
    {
        return Validator::make($data, [
            'name' => 'required|max:250',
            'email' => 'email|required|unique:users,email,' . $user_id,
        ]);
    }

    public function store($data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password'], []),
            'company_id' => $data['company_id']
        ]);
    }

    public function model_update($data, $id)
    {
        $record = User::where('id', $id)->get()->first();

        $record->fill($data);

        $record->update();

        return $record;
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

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
