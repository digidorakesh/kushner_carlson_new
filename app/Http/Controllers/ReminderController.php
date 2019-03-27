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
        date_default_timezone_set('Asia/Calcutta'); 
        $nexmo = app('Nexmo\Client');
        $current_time = Carbon::now()->format('H:i');
        $cu_time = new \Carbon\Carbon($current_time);
        $nextHour_time = $cu_time->addHours(1)->format('H:i');
		
		$reminder = Reminder::where('reminder_date', Carbon::today())
                    ->where('reminder_time','>=',$current_time)
                    ->where('reminder_time','<=',$nextHour_time)
                    ->where('status',0)
                    ->get();
					
		//echo '<pre>';
		//print_r($reminder); echo '</pre>';

                //  die;
        $message = $this->getSMS();

        if(!empty($reminder)){
           foreach ($reminder as $key => $value) {
               # code...
             $phone = isset($value->phone)?$value->phone:'';
             $phone =  preg_replace("/[^0-9,.]/", "", $phone);
             $phone =  '91'.$phone;
             $appointment_date = isset($value->appointment_date)?$value->appointment_date:'';
			 $carbondate = new Carbon($appointment_date);
             $appointment_date = $carbondate->format('Y-m-d');
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
				
				//echo '<pre>'; print_r($message); echo '</pre>';
				
                if($message){
                    Reminder::where('id',$value->id)->update(['status'=> 1]);
                }
            

            }catch(Exception $e){
                return $e->getMessage();
            }
           
           }
       }
      
        //return view('home');
    }

    private function getSMS(){

        $setting = Setting::where(['key'=> 'sms_messgae'])->select(['value'])->get();
        return isset($setting[0]->value)?$setting[0]->value:'Kushner Carlson Appointment Reminder: You have an upcoming appointment scheduled for
        [appointment-date] at [appointment-time]. For any changes, please call our main line 949-555-
        1212 as we do NOT receive replies to these reminders. Thank you!';
    }
}
