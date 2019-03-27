<?php

namespace Digi\Setting\Http\Middleware;

use Digi\Setting\Setting;

class Authorize
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return \Illuminate\Http\Response
     */
    public function handle($request, $next)
    {
        return resolve(Setting::class)->authorize($request) ? $next($request) : abort(403);
    }
}
