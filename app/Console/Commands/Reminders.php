<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Reminder;
use App\Setting;
class Reminders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sms:reminders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send Reminder to for appointment';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        //

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

        // $totalUsers = \DB::table('users')
        //           ->whereRaw('Date(created_at) = CURDATE()')
        //           ->count();
        // Mail::to('krunal@appdividend.com')->send(new SendMailable($totalUsers));
    }

    
}
