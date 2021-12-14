<?php

namespace App\Http\Controllers\System;

use App\Appsiel\System\Models\Field;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

use App\Appsiel\System\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Request as Input;


class UserController extends Controller
{


    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');
        //return $request;
        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Correo o Contraseña incorrectas'], 400);
            }
        } catch (JWTException $e) {
            //no se pudo crear el token - error de servidor
            return response()->json(['error' => 'Error de servidor'], 500);
        }
        return response()->json(compact('token'));
    }

    public function getAuthenticatedUser()
    {
        try {
            if (!$user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['token_expired'], $e->getCode());
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['token_invalid'], $e->getCode());
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['token_absent'], $e->getCode());
        }
        return response()->json(compact('user'));
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
