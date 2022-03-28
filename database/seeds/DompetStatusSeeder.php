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
        DB::table('dompet_statuses')->insert([
            'nama' => 'Budi',
            'status' => '1', 'dompet_id' => '1'
        ]);
        DB::table('dompet_statuses')->insert([
            'nama' => 'Joko',
            'status' => '1', 'dompet_id' => '2'
        ]);
        DB::table('dompet_statuses')->insert([
            'nama' => 'Bambang',
            'status' => '1', 'dompet_id' => '3'
        ]);
        DB::table('dompet_statuses')->insert([
            'nama' => 'Susi',
            'status' => '0', 'dompet_id' => '4'
        ]);
    }
}