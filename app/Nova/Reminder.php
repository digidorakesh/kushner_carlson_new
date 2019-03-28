<?php

namespace App\Nova;

use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Date;
use Laravel\Nova\Fields\Number;
use Laraning\NovaTimeField\TimeField;
use Michielfb\Time;
use Dniccum\PhoneNumber\PhoneNumber;
use Illuminate\Http\Request;
use Laravel\Nova\Http\Requests\NovaRequest;
//use Digi\TimeField\TimeField;
class Reminder extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var string
     */
    public static $model = 'App\Reminder';

    /**
     * The single value that should be used to represent the resource when being displayed.
     *
     * @var string
     */
    public static $title = 'id';

    /**
     * The columns that should be searched.
     *
     * @var array
     */
    public static $search = [
        'phone','reminder_date','appointment_date'
    ];

    public static $advancedPagination = true;
public static $authorizedToView = false;
     public static $displayInNavigation = false;
    /**
     * Get the fields displayed by the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function fields(Request $request)
    {

        return [
            ID::make()->sortable(),
            Date::make('Reminder Date')->hideWhenCreating()->hideWhenUpdating(),
            TimeField::make('Reminder Time')->withTwelveHourTime()
                ->hideWhenCreating()->hideWhenUpdating()->resolveUsing(function ($value) {
                    $ap_date = new \Carbon\Carbon($value);
                    $value = $ap_date->subHours(0)->Format('H:i A');
                    return $value;
                }),
            PhoneNumber::make('Phone Number','phone')->hideFromIndex()->disableValidation()
            //->format('(###)-###-####')
            ->countries(['US','IN'])
            ->rules('required'),
            PhoneNumber::make('Phone','phone')->hideWhenCreating()->hideWhenUpdating()->hideFromDetail()
            ->format('(###)-###-####')
			->disableValidation()
            //->format('(###)-###-####')
            ->countries(['US','IN']),
            Date::make('Date of Appointment','appointment_date')
                ->sortable()
                ->rules('required'),
            TimeField::make('Time of Appointment','appointment_time')->withTwelveHourTime()
            ->resolveUsing(function ($value) {
                    $re_date = new \Carbon\Carbon($value);
                    $value = $re_date->subHours(0)->Format('H:i A');
                    return $value;
                })
                ->sortable()
                ->rules('required'),
        ];
    }

    /**
     * Get the cards available for the request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function cards(Request $request)
    {
        return [];
    }

    /**
     * Get the filters available for the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function filters(Request $request)
    {
        return [];
    }

    /**
     * Get the lenses available for the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function lenses(Request $request)
    {
        return [];
    }

    /**
     * Get the actions available for the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function actions(Request $request)
    {
        return [];
    }




    // public static function uriKey(){


    // }

//     public static function label() {
//     return 'Your own label';
// }

/**
 * Determine if the current user can delete the given resource.
 *
 * @param  \Illuminate\Http\Request  $request
 * @return bool
 */
public function authorizedToView(Request $request)
{
    
        return false; // or do custom checks.. also maybe check that the route matches nova-api/orders/action
    

  //  return parent::authorizedTo($request, 'view');
}
 
}
