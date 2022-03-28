<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Dompet extends Model
{
    //
    protected $fillable = [
        'nama', 'referensi', 'deskripsi'
    ];
}