<?php

namespace App\Http\Controllers\API;

use App\Dompet;
use App\DompetStatus;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DompetController extends Controller
{
    //
    public function index()
    {
        $dataDompet = DB::table('dompets')->join('dompet_statuses', 'dompets.id', '=', 'dompet_statuses.dompet_id')->orderBy('dompet_statuses.status', 'DESC')->get();

        return response()->json([
            'status' => 200,
            'dompet' => $dataDompet
        ]);
    }

    public function changeStatus(Request $request)
    {
        $dompetData = DompetStatus::find($request->id);
        // return response()->json([
        //     'status' => 200,
        //     'message' => $dompetData,
        // ]);

        $dompetData->status = $request->status;
        $dompetData->save();
        return response()->json([
            'status' => 200,
            'message' => 'Student Updated Successfully',
        ]);
    }
}