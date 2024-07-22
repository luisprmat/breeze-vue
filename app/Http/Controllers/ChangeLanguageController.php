<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ChangeLanguageController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, string $locale)
    {
        if (! in_array($locale, config('app.available_locales'))) {
            return redirect()->back();
        }

        $request->session()->put('locale', $locale);

        return redirect()->back();
    }
}
