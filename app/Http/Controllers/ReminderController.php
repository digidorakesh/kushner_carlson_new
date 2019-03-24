<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Reminder;
use App\Setting;
use Carbon\Carbon;
class ReminderController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('auth');

        // $this->middleware('subscribed');
    }

    /**
     * Show the application dashboard.
     *
     * @return Response
     */
    public function send_sms()
    {
        
        $nexmo = app('Nexmo\Client');
        $reminder = Reminder::whereDate('reminder_date', Carbon::today())->get();
        $message = $this->getSMS();

        if(!empty($reminder)){
           foreach ($reminder as $key => $value) {
               # code...
             $phone = isset($value->phone)?$value->phone:'';
             $appointment_date = isset($value->appointment_date)?$value->appointment_date:'';
             $appointment_time = isset($value->appointment_time)?$value->appointment_time:'';
             $carbon = new Carbon($appointment_time);
             $appointment_time = $carbon->format('g:i A'); //Convert 24 Hours to 12 Hours Format 
             $message = str_replace(['[appointment-date]','[appointment-time]'], [$appointment_date,$appointment_time], $message);
            try{

                $message =  $nexmo->message()->send([
                    'to'   => $phone,
                    'from' => 'Nexmo',
                    'text' => $message
                ]);

            }catch(Exception $e){
                return $e->getMessage();
            }
           
           }
       }
      
        //return view('home');
    }

    private function getSMS(){

        $setting = Setting::where(['key'=> 'sms_message'])->select(['value'])->get();
        return isset($setting[0]->value)?$setting[0]->value:'Kushner Carlson Appointment Reminder: You have an upcoming appointment scheduled for
[appointment-date] at [appointment-time]. For any changes, please call our main line 949-555-
1212 as we do NOT receive replies to these reminders. Thank you!';
    }
}
