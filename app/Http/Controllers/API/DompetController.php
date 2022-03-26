<?php

namespace App\Http\Controllers\API;

use App\Dompet;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DompetController extends Controller
{
    //
    public function index()
    {
        $dataDompet = DB::table('dompets')->join('dompet_status', 'dompets.id', '=', 'dompet_status.id')->orderBy('dompet_status.status', 'DESC')->get();

        return response()->json([
            'status' => 200,
            'dompet' => $dataDompet
        ]);
    }
}