<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Appsiel\System\Facades\CRUD;

use Illuminate\Support\Facades\Request as Input;

class CrudController extends Controller
{
    public function index()
    {
        return CRUD::get_model_index_data(Input::get('model_id'));
    }

    public function store(Request $request)
    {
        $validator = CRUD::ModelValidator(Input::get('model_id'), $request->all(), 'store');

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $result = CRUD::store(Input::get('model_id'), $request->all());

        return response($result, 201);
    }

    public function show($id)
    {
        return CRUD::show(Input::get('model_id'), $id);
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
        $validator = CRUD::ModelValidator(Input::get('model_id'), $request->all(), 'update', $id);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $result = CRUD::update(Input::get('model_id'), $request->all(), $id);

        return response($result, 201);
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
