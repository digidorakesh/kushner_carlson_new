<?php

namespace Digi\TimeField;

use Laravel\Nova\Fields\Field;
use Laravel\Nova\Http\Requests\NovaRequest;

class TimeField extends Field
{
    /**
     * The field's component.
     *
     * @var string
     */
    public $component = 'time-field';

       /**
     * Set the hues that may be selected by the color picker.
     *
     * @param  array  $hues
     * @return $this
     */
    public function hues(array $hues)
    {
        return $this->withMeta(['hues' => $hues]);
    }
    
    /**
     * Hydrate the given attribute on the model based on the incoming request.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @param  string  $requestAttribute
     * @param  object  $model
     * @param  string  $attribute
     * @return void
     */
    protected function fillAttributeFromRequest(NovaRequest $request,
                                                $requestAttribute,
                                                $model,
                                                $attribute)
    {
        if ($request->exists($requestAttribute)) {
            $model->{$attribute} = $request[$requestAttribute];
        }
    }
}
