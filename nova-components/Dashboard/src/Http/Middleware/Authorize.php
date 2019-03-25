<?php

namespace Digi\Dashboard\Http\Middleware;

use Digi\Dashboard\Dashboard;

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
        return resolve(Dashboard::class)->authorize($request) ? $next($request) : abort(403);
    }
}
