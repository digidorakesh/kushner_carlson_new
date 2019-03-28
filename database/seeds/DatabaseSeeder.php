<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
		
		  $settings = [
            ['id' => 1, 'key' => 'name', 'value' => 'Kushner', 'panel' => 'app', 'status' => 1,'created_at'=>date('Y-m-d H:i:s'),'updated_at'=>date('Y-m-d H:i:s')],
            ['id' => 2, 'key' => 'copyright_year', 'value' => '2019', 'panel' => 'app', 'status' => 1,'created_at'=>date('Y-m-d H:i:s'),'updated_at'=>date('Y-m-d H:i:s')],
            ['id' => 3, 'key' => 'copyright_owner', 'value' => 'Kushner', 'panel' => 'app', 'status' => 1,'created_at'=>date('Y-m-d H:i:s'),'updated_at'=>date('Y-m-d H:i:s')],
            ['id' => 4, 'key' => 'logo', 'value' => '1553408848.jpg', 'panel' => 'app', 'status' => 1,'created_at'=>date('Y-m-d H:i:s'),'updated_at'=>date('Y-m-d H:i:s')],
            ['id' => 5, 'key' => 'version', 'value' => '1.0', 'panel' => 'app', 'status' => 1,'created_at'=>date('Y-m-d H:i:s'),'updated_at'=>date('Y-m-d H:i:s')],
            ['id' => 6, 'key' => 'sms_message', 'value' => 'Kushner Carlson Appointment Reminder: You appointment scheduled for\n[appointment-date] at [appointment-time].', 'panel' => 'app', 'status' => 1,'created_at'=>date('Y-m-d H:i:s'),'updated_at'=>date('Y-m-d H:i:s')],
            ['id' => 7, 'key' => 'before_hours', 'value' => '24', 'panel' => 'app', 'status' => 1,'created_at'=>date('Y-m-d H:i:s'),'updated_at'=>date('Y-m-d H:i:s')],
            ['id' => 8, 'key' => 'sms_messgae', 'value' => 'Kushner Carlson Appointment Reminder: You have an upcoming appointment scheduled for\n[appointment-date] at [appointment-time]. For any changes, please call our main line 949-555-1212 as we do NOT receive replies to these reminders. Thank you!', 'panel' => 'app', 'status' => 1,'created_at'=>date('Y-m-d H:i:s'),'updated_at'=>date('Y-m-d H:i:s')],
        ];
		
		DB::table('settings')->insert($settings);
		
		
		DB::table('users')->insert([
	            'name' => 'admin',
	            'email' => 'admin@admin.com',
	            'password' => bcrypt('123456')
	        ]);
		
    }
}
