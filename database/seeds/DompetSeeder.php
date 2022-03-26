<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DompetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('dompets')->insert([
            'nama' => 'Budi',
            'referensi' => '93573759',
            'deskripsi' => 'Bank BCA',
        ]);
        DB::table('dompets')->insert([
            'nama' => 'Joko',
            'referensi' => '74845253',
            'deskripsi' => 'Bank BCA',
        ]);
        DB::table('dompets')->insert([
            'nama' => 'Bambang',
            'referensi' => '65445323',
            'deskripsi' => 'Bank Permata',
        ]);
        DB::table('dompets')->insert([
            'nama' => 'Susi',
            'referensi' => '47822345',
            'deskripsi' => 'Bank BNI',
        ]);
    }
}