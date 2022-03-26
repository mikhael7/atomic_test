<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DompetStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('dompet_status')->insert([
            'nama' => 'Budi',
            'status' => '1'
        ]);
        DB::table('dompet_status')->insert([
            'nama' => 'Joko',
            'status' => '1'
        ]);
        DB::table('dompet_status')->insert([
            'nama' => 'Bambang',
            'status' => '1'
        ]);
        DB::table('dompet_status')->insert([
            'nama' => 'Susi',
            'status' => '0'
        ]);
    }
}