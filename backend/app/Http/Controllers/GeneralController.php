<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GeneralController extends Controller
{
    public function CheckServerStatus(){
          return response()->json([
    'success'=>true
  ],200);
 }
}