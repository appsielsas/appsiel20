<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return User::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $company_id = 1;

        $validator = Validator::make($request->all(), [
                                            'name' => 'required|max:250',
                                            'email' => 'email|required|unique:users',
                                            'password' => [ 'required', 'confirmed', Password::min(8) ],
                                        ]);

        if ( $validator->fails() )
        {
            $arr = json_decode( $validator->errors(), TRUE);
            array_unshift( $arr, 'errors'  );
            $json = json_encode($arr);
            return $json;
        }

        $user = User::create( array_merge( $request->all(), ['company_id' => 1 ]  ) );

        return $user;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //$user = 
        //return $user->response()->tojson();
        return User::findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
                                            'name' => 'required|max:250',
                                            'email' => 'email|required|unique:users',
                                        ]);

        if ( $validator->fails() )
        {
            $arr = json_decode( $validator->errors(), TRUE);
            array_unshift( $arr, 'errors'  );
            $json = json_encode($arr);
            return $json;
        }

        return User::where( 'id', $id )->update( $request->all() );

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $user = array(
            "id" => $id
        );
        return $user;
    }
}
