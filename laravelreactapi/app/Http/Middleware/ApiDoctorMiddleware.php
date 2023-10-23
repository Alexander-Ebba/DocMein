<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Http\Request;
use Illuminate\Notifications\Notifiable;
use Symfony\Component\HttpFoundation\Response;
use illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;

class ApiDoctorMiddleware
{
    use HasApiTokens, HasFactory,Notifiable ;
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(Auth::check())
        {
            if(auth()->user()->tokenCan('server:doctor'))
            {
                return $next($request);
            }
            elseif (auth()->user()->tokenCan('server:assisstant')) {
                // User has doctor access, deny access to admin
                return response()->json([
                    'message' => 'Access Denied! You are not an Doctor.',
                ], 403);
            }
            else
            {
                return response()->json([
                    'message'=>'Access Denied! You are not a Doctor.',
                ], 403);
            }
        }
        else
        {
            return response()->json([
                'status'=>401,
                'message'=>'Please login First'
            ]);
        }
    }
}
