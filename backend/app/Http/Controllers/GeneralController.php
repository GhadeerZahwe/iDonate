<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GeneralController extends Controller
{
    public function checkServerStatus(){
          return response()->json([
    'success'=>true
  ],200);
 }
}