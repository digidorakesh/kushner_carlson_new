<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Setting;
class Reminder extends Model
{
    //
	protected $casts = [
    'reminder_date' => 'date',
    'appointment_date' => 'date'
];

    public static function boot()
    {
        parent::boot();

        self::creating(function($model){
            // ... code here
           // die('1');
        });

        self::created(function($model){
            // ... code here
           //  die('2');
        });

        self::updating(function($model){
            // ... code here
            // die('3');
        });

        self::updated(function($model){
            // ... code here
            // die('4');
        });

        self::deleting(function($model){
            // ... code here
             //die('5');
        });

        self::deleted(function($model){
            // ... code here
             //die('6');
        });

        self::saving(function($model){
        	// echo '<pre>';
        	// print_r($model->appointment_date);
        	 		$ap_date = ($model->appointment_date->format('Y-m-d'));
                    $ap_time = $model->appointment_time;
                    $ap_date = $ap_date.' '.$ap_time;
 					$setting = Setting::where(['key'=> 'before_hours'])->select(['value'])->get();
                    $before_hours = isset($setting[0]->value)?$setting[0]->value:24;
                    $ap_date = new \Carbon\Carbon($ap_date);
                   // $reminder_date = $ap_date->subHours($before_hours);
                    $reminder_date = $ap_date->subHours($before_hours)->Format('Y-m-d');
                    $reminder_time = $ap_date->subHours($before_hours)->Format('H:i:s');
                    $model->reminder_date = $reminder_date;
                    //$reminder_time = $ap_time;
                    $model->reminder_time = $reminder_time;
                    
        });

        self::saved(function($model){
        	//die('8');
        });
    }

    // private function getReminderHours(){
    // 	$setting = Setting::where(['key'=> 'before_hours'])->select(['value'])->get();
    //         return isset($setting[0]->value)?$setting[0]->value:24;
    // } 
}
