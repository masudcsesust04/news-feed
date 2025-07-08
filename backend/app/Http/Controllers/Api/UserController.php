<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Http\Resources\SettingResource;
use App\Models\User;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    /**
     * Display the authenticated user's profile.
     */
    public function show(Request $request)
    {
        $user = $request->user()->load(['settings', 'preferences']);

        return new UserResource($user);
    }

    /**
     * Update the authenticated user's profile.
     */
    public function update(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user->update($request->except('password'));

        if ($request->has('password')) {
            $user->password = Hash::make($request->password);
            $user->save();
        }

        return new UserResource($user);
    }

    /**
     * Update the authenticated user's settings.
     */
    public function settings(Request $request)
    {
        Log::info('PATCH Params:', $request->all());

        $validator = Validator::make($request->all(), [
            'theme' => 'sometimes|required|string|in:light,dark',
            'language' => 'sometimes|required|string|max:10',
            'notifications_enabled' => 'sometimes|required|boolean',
            'timezone' => 'sometimes|required|string|max:50',
            'articles_per_page' => 'sometimes|required|integer|min:1|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // dd($validator->validated());

        $settings = Setting::updateOrCreate(
            ['user_id' => $request->user()->id],
            $validator->validated()
        );

        return new SettingResource($settings);
    }
}
