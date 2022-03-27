<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DompetStatus extends Model
{
    //
    protected $fillable = [
        'nama', 'status', 'dompet_id'
    ];
}