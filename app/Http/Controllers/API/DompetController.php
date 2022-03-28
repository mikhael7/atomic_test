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
            'message' => 'Updated',
        ]);
    }

    public function adddompet(Request $request)
    {
        $dompetData = new Dompet();
        $dompetStatus = new DompetStatus();

        $dompetData->nama = $request->nama;
        $dompetData->referensi = $request->referensi;
        $dompetData->deskripsi = $request->deskripsi;
        $dompetData->save();

        $dompetStatus->nama = $request->nama;
        $dompetStatus->dompet_id = $dompetData->id;
        $dompetStatus->save();


        return response()->json([
            'status' => 200,
            'dompetData' => $dompetData,
            'dompetStatus' => $dompetStatus,
        ]);
    }

    public function editdompet(Request $request)
    {
        $dompetData = Dompet::find($request->id);
        $dompetDataStatus = DompetStatus::find($request->id);

        $dompetData->nama = $request->nama;
        $dompetData->referensi = $request->referensi;
        $dompetData->deskripsi = $request->deskripsi;

        $dompetDataStatus->nama = $request->nama;
        $dompetDataStatus->status = $request->status;

        $dompetData->save();
        $dompetDataStatus->save();


        return response()->json([
            'status' => 200,
            'message' => $dompetData,
            'msg2' => $dompetDataStatus,
            'msg' => $request->all(),
        ]);
    }
}