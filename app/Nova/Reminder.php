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
                ->hideWhenCreating()->hideWhenUpdating(),
            PhoneNumber::make('Phone Number','phone')->hideFromIndex()
            ->format('(###)-###-####'),
            PhoneNumber::make('Phone','phone')->hideWhenCreating()->hideWhenUpdating()
            ->format('(###)-###-####'),
            Date::make('Appointment Date')
                ->sortable(),
            TimeField::make('Appointment Time')->withTwelveHourTime()
                ->sortable(),
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
}
